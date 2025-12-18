// MongoDB Database Connection
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 
  'mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0';

const DB_NAME = process.env.MONGODB_DB_NAME || 'winter-sale';

let client;
let db;

// Connect to MongoDB
export const connectToMongoDB = async () => {
  try {
    if (!client) {
      console.log('🔄 Attempting to connect to MongoDB...');
      console.log('📍 MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials
      
      client = new MongoClient(MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000, // Increased timeout
        socketTimeoutMS: 45000,
      });
      
      await client.connect();
      console.log('✅ Connected to MongoDB successfully');
      
      db = client.db(DB_NAME);
      console.log(`📦 Using database: ${DB_NAME}`);
      
      // Create indexes for better performance
      await createIndexes();
    }
    
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check MongoDB Atlas Network Access (allow 0.0.0.0/0)');
    console.error('   2. Verify connection string in .env file');
    console.error('   3. Check database user credentials');
    console.error('   4. Ensure internet connection is active');
    throw error;
  }
};

// Create database indexes
const createIndexes = async () => {
  try {
    // Users collection indexes
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    
    // Orders collection indexes
    const ordersCollection = db.collection('orders');
    await ordersCollection.createIndex({ userId: 1 });
    await ordersCollection.createIndex({ transactionId: 1 }, { unique: true, sparse: true });
    await ordersCollection.createIndex({ createdAt: -1 });
    
    // Products collection indexes
    const productsCollection = db.collection('products');
    await productsCollection.createIndex({ id: 1 }, { unique: true });
    
    console.log('✅ Database indexes created');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

// Get database instance
export const getDB = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectToMongoDB() first.');
  }
  return db;
};

// Close MongoDB connection
export const closeMongoDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
    client = null;
    db = null;
  }
};

export default { connectToMongoDB, getDB, closeMongoDB };

