// Simple server startup without MongoDB (for testing)
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

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running (without MongoDB)',
    timestamp: new Date().toISOString()
  });
});

// Mock auth routes (for testing)
app.post('/api/auth/register', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'MongoDB connection required. Please check MongoDB connection.'
  });
});

app.post('/api/auth/login', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'MongoDB connection required. Please check MongoDB connection.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('===========================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log('===========================================');
  console.log('\n⚠️  WARNING: Running without MongoDB');
  console.log('   Auth features will not work');
  console.log('   To enable full features, fix MongoDB connection\n');
});

