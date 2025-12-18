// Main Server File
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToMongoDB } from './config/database.js';
import { ProductModel } from './models/Product.js';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

// Load environment variables
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
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    // Connect to MongoDB
    await connectToMongoDB();
    
    console.log('🔄 Initializing products...');
    // Initialize products if database is empty
    await ProductModel.initializeProducts();
    
    // Start server
    app.listen(PORT, () => {
      console.log('===========================================');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API: http://localhost:${PORT}/api`);
      console.log(`💚 Health: http://localhost:${PORT}/health`);
      console.log('===========================================');
      console.log('\n✅ MongoDB connected - Full features enabled!');
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    console.error('\n💡 Options:');
    console.error('   1. Fix MongoDB connection (see MONGODB_FIX.md)');
    console.error('   2. Use quick server: npm run quick (MongoDB not required)');
    console.error('\n⚠️  Starting server without MongoDB...');
    console.error('   Auth features will not work');
    
    // Start server anyway (without MongoDB)
    app.listen(PORT, () => {
      console.log('===========================================');
      console.log(`🚀 Server running on port ${PORT} (without MongoDB)`);
      console.log(`📡 API: http://localhost:${PORT}/api`);
      console.log(`💚 Health: http://localhost:${PORT}/health`);
      console.log('===========================================');
      console.log('\n⚠️  MongoDB not connected');
      console.log('   To enable full features, configure MongoDB');
      console.log('   See: MONGODB_FIX.md for instructions');
    });
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

// Start the server
startServer();

export default app;

