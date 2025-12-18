// MongoDB Connection
// IMPORTANT: Store credentials in .env file for security

import { MongoClient } from 'mongodb';

// MongoDB connection string from environment variables
// Add to .env file:
// VITE_MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 
  'mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0';

const DB_NAME = import.meta.env.VITE_MONGODB_DB_NAME || 'puretastebd';

let client;
let db;

// Connect to MongoDB
export const connectToMongoDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(MONGODB_URI, {
        // Connection options
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      
      await client.connect();
      console.log('✅ Connected to MongoDB successfully');
      
      db = client.db(DB_NAME);
    }
    
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// Get database instance
export const getDB = async () => {
  if (!db) {
    await connectToMongoDB();
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

// Database operations
export const dbOperations = {
  // Save order to database
  saveOrder: async (orderData) => {
    try {
      const database = await getDB();
      const ordersCollection = database.collection('orders');
      const result = await ordersCollection.insertOne({
        ...orderData,
        createdAt: new Date(),
        status: 'pending'
      });
      return result;
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  },

  // Get user orders
  getUserOrders: async (userId) => {
    try {
      const database = await getDB();
      const ordersCollection = database.collection('orders');
      const orders = await ordersCollection
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();
      return orders;
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const database = await getDB();
      const ordersCollection = database.collection('orders');
      const result = await ordersCollection.updateOne(
        { _id: orderId },
        { $set: { status, updatedAt: new Date() } }
      );
      return result;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

export default { connectToMongoDB, getDB, closeMongoDB, dbOperations };

