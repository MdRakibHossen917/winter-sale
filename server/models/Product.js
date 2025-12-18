// Product Model and Operations
import { getDB } from '../config/database.js';
import { ObjectId } from 'mongodb';

export const ProductModel = {
  // Get all products
  getAllProducts: async () => {
    try {
      const db = getDB();
      const productsCollection = db.collection('products');
      return await productsCollection.find({}).toArray();
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const db = getDB();
      const productsCollection = db.collection('products');
      
      // Try to find by MongoDB _id first
      let product = await productsCollection.findOne({ _id: new ObjectId(productId) });
      
      // If not found, try to find by numeric id
      if (!product) {
        product = await productsCollection.findOne({ id: parseInt(productId) });
      }
      
      return product;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  },

  // Create product
  createProduct: async (productData) => {
    try {
      const db = getDB();
      const productsCollection = db.collection('products');
      
      const newProduct = {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await productsCollection.insertOne(newProduct);
      return await productsCollection.findOne({ _id: result.insertedId });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productId, updateData) => {
    try {
      const db = getDB();
      const productsCollection = db.collection('products');
      
      updateData.updatedAt = new Date();
      
      const result = await productsCollection.updateOne(
        { id: parseInt(productId) },
        { $set: updateData }
      );
      
      return result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      const db = getDB();
      const productsCollection = db.collection('products');
      
      const result = await productsCollection.deleteOne({ id: parseInt(productId) });
      return result;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Initialize products (seed data)
  initializeProducts: async () => {
    try {
      const db = getDB();
      const productsCollection = db.collection('products');
      
      // Check if products already exist
      const count = await productsCollection.countDocuments();
      if (count > 0) {
        console.log('Products already exist, skipping initialization');
        return;
      }
      
      // Default products
      const defaultProducts = [
        {
          id: 1,
          name: 'Shorisher Tel',
          nameBn: 'সরিষার তেল',
          description: 'Pure, cold-pressed mustard oil directly from farmers. Rich in omega-3 fatty acids and antioxidants.',
          descriptionBn: 'কৃষকের কাছ থেকে সরাসরি আসা খাঁটি, কোল্ড প্রেস সরিষার তেল।',
          price: 450,
          image: 'https://i.ibb.co.com/cck7s5yQ/close-up-overhead-view-two-oil-bottles-cutting-board.jpg',
          category: 'oil',
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Ghee',
          nameBn: 'ঘি',
          description: 'Pure Desi Ghee made from fresh cow milk. Traditional method, no preservatives.',
          descriptionBn: 'তাজা গরুর দুধ থেকে তৈরি খাঁটি দেশি ঘি।',
          price: 1200,
          image: 'https://i.ibb.co.com/HDQNsbmG/ghee-clarified-butter-jar-wooden-table-ai-generative.jpg',
          category: 'ghee',
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Butter',
          nameBn: 'মাখন',
          description: 'Fresh, creamy butter made from pure cow milk.',
          descriptionBn: 'খাঁটি গরুর দুধ থেকে তৈরি তাজা, ক্রিমি মাখন।',
          price: 350,
          image: 'https://i.ibb.co.com/Myv2dbzZ/side-view-butter-with-white-bread-almond-walnut-board.jpg',
          category: 'dairy',
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Milk',
          nameBn: 'দুধ',
          description: 'Fresh, pure cow milk directly from local farms.',
          descriptionBn: 'স্থানীয় খামার থেকে সরাসরি আসা তাজা, খাঁটি গরুর দুধ।',
          price: 80,
          image: 'https://i.ibb.co.com/FkPXgBNR/fresh-milk-mug-jug-wooden-table.jpg',
          category: 'dairy',
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Pure Honey',
          nameBn: 'খাঁটি মধু',
          description: '100% pure, raw honey collected from natural beehives.',
          descriptionBn: 'প্রাকৃতিক মৌচাক থেকে সংগ্রহ করা ১০০% খাঁটি, কাঁচা মধু।',
          price: 600,
          image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop',
          category: 'honey',
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'Imported Drinks',
          nameBn: 'আমদানি করা পানীয়',
          description: 'Premium imported beverages from international brands.',
          descriptionBn: 'আন্তর্জাতিক ব্র্যান্ড থেকে প্রিমিয়াম আমদানি করা পানীয়।',
          price: 150,
          image: 'https://i.ibb.co.com/bgkDsHYw/supermarket-banner-with-various-items.jpg',
          category: 'beverages',
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      const result = await productsCollection.insertMany(defaultProducts);
      console.log(`✅ Initialized ${result.insertedCount} products`);
      
      return result;
    } catch (error) {
      console.error('Error initializing products:', error);
      throw error;
    }
  }
};

