/*
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PDFParser from 'pdf2json';
import fs from 'fs';
import Tesseract from 'tesseract.js'; // For OCR
import poppler from 'pdf-poppler'; // For PDF to image conversion

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
// dotenv.config({ path: join(__dirname, '../.env') });
dotenv.config();

// Check if the Gemini API key is set
console.log('Gemini API Key:', process.env.GEMINI_API_KEY ? 'Set' : 'Not Set');

const router = express.Router();

// Ensure 'uploads' directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF is supported.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Initialize Gemini AI
let genAI;
try {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log('Gemini AI initialized:', !!genAI);
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error.message);
}

// ✅ PDF text extraction (for text-based PDFs)
const extractTextFromPDF = async (pdfPath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataError', errData => {
      reject(errData.parserError);
    });

    pdfParser.on('pdfParser_dataReady', () => {
      const rawText = pdfParser.getRawTextContent();
      resolve(rawText);
    });

    pdfParser.loadPDF(pdfPath);
  });
};

// ✅ OCR text extraction (for image-based PDFs)
const extractTextWithOCR = async (pdfPath) => {
  try {
    console.log('Running OCR on PDF:', pdfPath);

    if (!fs.existsSync(pdfPath)) {
      throw new Error(`File not found at path: ${pdfPath}`);
    }

    // Convert PDF to images
    const imagePaths = await convertPDFToImages(pdfPath);

    let extractedText = '';
    for (const imagePath of imagePaths) {
      console.log('Running OCR on image:', imagePath);
      const { data } = await Tesseract.recognize(imagePath, 'eng', {
        logger: (m) => console.log('OCR Progress:', m),
      });
      extractedText += data.text + '\n';
    }

    console.log('OCR extracted text:', extractedText);
    return extractedText;
  } catch (error) {
    console.error('OCR error:', error.message);
    throw new Error('Failed to extract text using OCR');
  }
};

// ✅ Convert PDF to images
const convertPDFToImages = async (pdfPath) => {
  const outputDir = 'uploads/images';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const options = {
    format: 'jpeg',
    out_dir: outputDir,
    out_prefix: 'page',
    page: null, // Convert all pages
  };

  try {
    console.log('Converting PDF to images...');
    await poppler.convert(pdfPath, options);
    console.log('PDF converted to images in:', outputDir);
    return fs.readdirSync(outputDir).map((file) => `${outputDir}/${file}`);
  } catch (error) {
    console.error('Error converting PDF to images:', error.message);
    throw new Error('Failed to convert PDF to images');
  }
};

// ✅ Use Gemini AI to summarize PDF content
const processWithGemini = async (text) => {
  try {
    if (!genAI) throw new Error('Gemini AI not initialized');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Simple test prompt
    const prompt = `Summarize: ${text}`;

    console.log('Sending prompt to Gemini AI:', prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = await response.text();

    console.log('Gemini AI summary:', summary);

    return summary;
  } catch (error) {
    console.error('Gemini AI error:', error.message);
    console.error('Full error details:', error);
    throw new Error('Failed to process text with Gemini AI.');
  }
};

// @route   POST api/document-scanner/analyze
// @desc    Analyze uploaded PDF with Gemini AI
// @access  Public
router.post('/analyze', upload.single('document'), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded or file path missing' });
    }

    console.log('Uploaded file exists:', req.file.path);

    let text = await extractTextFromPDF(req.file.path);
    if (!text || text.trim().length === 0) {
      console.log('Text extraction failed, attempting OCR...');
      text = await extractTextWithOCR(req.file.path);
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Failed to extract text from the document.' });
    }

    const analysis = await processWithGemini(text);
    fs.unlinkSync(req.file.path);

    res.json({ analysis });
  } catch (error) {
    console.error('Analysis error:', error.message);
    res.status(500).json({ message: 'Error processing document', error: error.message });
  }
});

// @route   GET api/document-scanner/list-models
// @desc    List available Gemini AI models
// @access  Public
router.get('/list-models', async (req, res) => {
  try {
    if (!genAI) throw new Error('Gemini AI not initialized');
    const models = await genAI.listModels();
    res.json(models);
  } catch (error) {
    console.error('Error listing models:', error.message);
    res.status(500).json({ error: 'Failed to list models', message: error.message });
  }
});

// Test OCR functionality
const testOCR = async () => {
  try {
    const result = await Tesseract.recognize('path/to/sample.pdf', 'eng', {
      logger: (m) => console.log('OCR Progress:', m),
    });
    console.log('OCR Result:', result.data.text);
  } catch (error) {
    console.error('OCR Test Error:', error.message);
  }
};

testOCR();

const summary = await processWithGemini("This is a test document.");
*/
