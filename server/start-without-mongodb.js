// Server startup without MongoDB dependency (for testing)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running (MongoDB connection will be added)',
    timestamp: new Date().toISOString(),
    mode: 'development'
  });
});

// Mock API routes (for testing)
app.post('/api/auth/register', (req, res) => {
  res.status(200).json({
    success: false,
    message: 'MongoDB connection required. Server is running but MongoDB needs to be configured.'
  });
});

app.post('/api/auth/login', (req, res) => {
  res.status(200).json({
    success: false,
    message: 'MongoDB connection required. Server is running but MongoDB needs to be configured.'
  });
});

app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running. Products will load after MongoDB connection.',
    products: []
  });
});

// Start server immediately (no MongoDB wait)
app.listen(PORT, '0.0.0.0', () => {
  console.log('===========================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log('===========================================');
  console.log('\n⚠️  Running without MongoDB');
  console.log('   To enable full features:');
  console.log('   1. Fix MongoDB connection');
  console.log('   2. Use: npm run dev\n');
});

// Handle errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

