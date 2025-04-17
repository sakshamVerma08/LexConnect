import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });
console.log('Environment variables loaded:', {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Set' : 'Not set',
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

import authRoutes from './routes/auth.js';
import lawyerRoutes from './routes/lawyers.js';
import caseRoutes from './routes/cases.js';
import documentScannerRoutes from './routes/documentScanner.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lexconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/document-scanner', documentScannerRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'LexConnect Backend API is running',
    endpoints: {
      auth: '/api/auth',
      lawyers: '/api/lawyers',
      cases: '/api/cases',
      documentScanner: '/api/document-scanner'
    }
  });
});

const PORT = process.env.PORT || 5000;

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
