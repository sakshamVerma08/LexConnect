import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

console.log('DocumentScanner Route - Environment variables:', {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Set' : 'Not set'
});
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PDFParser from 'pdf2json';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Configure multer for file upload
// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, and PNG are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Initialize Gemini AI
const initializeGeminiAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

let genAI;
try {
  genAI = initializeGeminiAI();
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error);
}

// Stub PDF extraction for now
const extractTextFromPDF = async (pdfPath) => {
  console.log('Stub PDF extraction for path:', pdfPath);
  return 'This is sentence one. This is sentence two. This is sentence three. This is sentence four.';
};
// NOTE: Replace with real PDF extraction once integration is fixed

// Process document with Gemini AI - STUB for now
const processWithGemini = async (text) => {
  console.log('Returning stub summary');
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, 3).join(' ');
};

// NOTE: Replace stub above with actual API call once integration is fixed.

// @route   POST api/document-scanner/analyze
// @desc    Analyze document using Gemini AI
// @access  Public
router.post('/analyze', upload.single('document'), async (req, res) => {
  console.log('Starting document analysis...');
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  let text = '';
  console.log('Received file:', req.file);
  console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);
  try {
    if (!req.file || !req.file.path) {
      console.error('No file uploaded or file path missing');
      fs.writeFileSync('debug.log', `Request: ${JSON.stringify({ body: req.body, file: req.file }, null, 2)}`);
      return res.status(400).json({ message: 'No file uploaded or invalid file' });
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Processing file:', req.file);
    if (req.file.mimetype === 'application/pdf') {
      text = await extractTextFromPDF(req.file.path);
    } else {
      // For images, we'll need to use OCR (you can integrate Tesseract or cloud OCR)
      // For now, we'll return an error for images
      return res.status(400).json({ message: 'Image processing not implemented yet' });
    }

    console.log('Extracted text:', { length: text.length, preview: text.substring(0, 100) });
    const analysis = await processWithGemini(text);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ analysis });
  } catch (err) {
    console.error('Document analysis error:', err);
    console.error('Stack trace:', err.stack);
    fs.writeFileSync('error.log', `Error: ${err.message}\nStack: ${err.stack}\nRequest: ${JSON.stringify({ body: req.body, file: req.file }, null, 2)}`);
    res.status(500).json({
      message: 'Error processing document',
      error: err.message,
      details: err.stack
    });
  }
});

export default router;
