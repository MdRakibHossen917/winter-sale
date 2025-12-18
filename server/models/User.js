// User Model and Operations
import { getDB } from '../config/database.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this';

export const UserModel = {
  // Create new user
  createUser: async (userData) => {
    try {
      const db = getDB();
      const usersCollection = db.collection('users');
      
      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user document
      const newUser = {
        email: userData.email,
        password: hashedPassword,
        name: userData.name || '',
        phone: userData.phone || '',
        address: userData.address || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'customer'
      };
      
      const result = await usersCollection.insertOne(newUser);
      
      // Return user without password
      const user = await usersCollection.findOne({ _id: result.insertedId });
      delete user.password;
      
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Find user by email
  findByEmail: async (email) => {
    try {
      const db = getDB();
      const usersCollection = db.collection('users');
      return await usersCollection.findOne({ email });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  },

  // Find user by ID
  findById: async (userId) => {
    try {
      const db = getDB();
      const usersCollection = db.collection('users');
      
      // Try to find by ObjectId
      let user;
      try {
        user = await usersCollection.findOne({ _id: new ObjectId(userId) });
      } catch (error) {
        // If ObjectId conversion fails, try as string
        user = await usersCollection.findOne({ _id: userId });
      }
      
      if (user) {
        delete user.password;
      }
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  },

  // Verify password
  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // Generate JWT token
  generateToken: (user) => {
    return jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  },

  // Update user
  updateUser: async (userId, updateData) => {
    try {
      const db = getDB();
      const usersCollection = db.collection('users');
      
      updateData.updatedAt = new Date();
      
      const result = await usersCollection.updateOne(
        { _id: userId },
        { $set: updateData }
      );
      
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

