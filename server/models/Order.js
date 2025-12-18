// Order Model and Operations
import { getDB } from '../config/database.js';
import { ObjectId } from 'mongodb';

export const OrderModel = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const db = getDB();
      if (!db) {
        throw new Error('Database not connected. Please check MongoDB connection.');
      }
      
      const ordersCollection = db.collection('orders');
      
      // Use status from orderData if provided, otherwise default to 'paid'
      const newOrder = {
        ...orderData,
        status: orderData.status || 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      console.log('💾 Inserting order into MongoDB:', {
        customerEmail: newOrder.customerEmail,
        totalAmount: newOrder.totalAmount,
        itemsCount: newOrder.items?.length || 0,
        paymentMethod: newOrder.paymentMethod,
        status: newOrder.status
      });
      
      const result = await ordersCollection.insertOne(newOrder);
      
      console.log('✅ Order inserted successfully. ID:', result.insertedId);
      
      const savedOrder = await ordersCollection.findOne({ _id: result.insertedId });
      
      if (!savedOrder) {
        throw new Error('Order was inserted but could not be retrieved');
      }
      
      console.log('✅ Order retrieved from database:', savedOrder._id);
      
      return savedOrder;
    } catch (error) {
      console.error('❌ Error creating order:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        orderData: {
          customerEmail: orderData?.customerEmail,
          totalAmount: orderData?.totalAmount
        }
      });
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const db = getDB();
      const ordersCollection = db.collection('orders');
      return await ordersCollection.findOne({ _id: new ObjectId(orderId) });
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  },

  // Get orders by user ID
  getOrdersByUserId: async (userId) => {
    try {
      const db = getDB();
      const ordersCollection = db.collection('orders');
      return await ordersCollection
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw error;
    }
  },

  // Get order by transaction ID
  getOrderByTransactionId: async (transactionId) => {
    try {
      const db = getDB();
      const ordersCollection = db.collection('orders');
      return await ordersCollection.findOne({ transactionId });
    } catch (error) {
      console.error('Error getting order by transaction ID:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status, updateData = {}) => {
    try {
      const db = getDB();
      const ordersCollection = db.collection('orders');
      
      const update = {
        status,
        updatedAt: new Date(),
        ...updateData
      };
      
      const result = await ordersCollection.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: update }
      );
      
      return result;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get all orders (admin)
  getAllOrders: async (filters = {}) => {
    try {
      const db = getDB();
      const ordersCollection = db.collection('orders');
      return await ordersCollection
        .find(filters)
        .sort({ createdAt: -1 })
        .toArray();
    } catch (error) {
      console.error('Error getting all orders:', error);
      throw error;
    }
  }
};

