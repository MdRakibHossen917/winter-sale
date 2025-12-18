// Order Routes
import express from 'express';
import { body, validationResult } from 'express-validator';
import { OrderModel } from '../models/Order.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create new order (works with or without authentication for Firebase users)
router.post('/', [
  body('items').isArray().notEmpty(),
  body('totalAmount').isNumeric(),
  body('customerName').notEmpty(),
  body('customerEmail').isEmail(),
  body('customerPhone').notEmpty(),
  body('customerAddress').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Try to get user from token, otherwise use email as userId (for Firebase users)
    let userId = null;
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      
      if (token) {
        // Try to verify JWT token (for backend users)
        const jwt = await import('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this';
        try {
          const decoded = jwt.default.verify(token, JWT_SECRET);
          userId = decoded.userId;
        } catch (jwtError) {
          // If JWT verification fails, use email as userId (Firebase users)
          userId = req.body.customerEmail;
        }
      } else {
        // No token, use email as userId (Firebase users)
        userId = req.body.customerEmail;
      }
    } catch (authError) {
      // If auth fails, use email as userId (for Firebase users)
      userId = req.body.customerEmail;
    }

    const orderData = {
      userId: userId,
      userEmail: req.body.customerEmail, // Store email separately for Firebase users
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhone: req.body.customerPhone,
      customerAddress: req.body.customerAddress,
      city: req.body.city || 'Dhaka',
      postalCode: req.body.postalCode || '',
      paymentMethod: req.body.paymentMethod || 'sslcommerce',
      transactionId: req.body.transactionId || null,
      status: req.body.status || 'paid'
    };

    console.log('💾 Creating order in database:', {
      userId: orderData.userId,
      customerEmail: orderData.customerEmail,
      totalAmount: orderData.totalAmount,
      itemsCount: orderData.items.length,
      paymentMethod: orderData.paymentMethod,
    });

    const order = await OrderModel.createOrder(orderData);

    console.log('✅ Order created successfully:', order._id);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Get user orders (protected)
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const orders = await OrderModel.getOrdersByUserId(req.user.userId);
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get orders',
      error: error.message
    });
  }
});

// Get orders by email (for Firebase users) - MUST be before /:id route
router.get('/by-email/:email', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    console.log('📧 Fetching orders for email:', email);

    // Get orders by email (userId or userEmail or customerEmail)
    const { getDB } = await import('../config/database.js');
    const db = getDB();
    const ordersCollection = db.collection('orders');
    
    const orders = await ordersCollection
      .find({
        $or: [
          { userId: email },
          { userEmail: email },
          { customerEmail: email }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`✅ Found ${orders.length} orders for ${email}`);
    console.log('📦 Sample order (first):', orders[0] ? {
      _id: orders[0]._id,
      customerEmail: orders[0].customerEmail,
      userId: orders[0].userId,
      userEmail: orders[0].userEmail
    } : 'No orders');

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('❌ Get orders by email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get orders',
      error: error.message
    });
  }
});

// Get order by ID (protected) - MUST be after /by-email route
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await OrderModel.getOrderById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get order',
      error: error.message
    });
  }
});

// Update order status (for payment callbacks)
router.put('/:id/status', [
  body('status').isIn(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']),
  body('transactionId').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, transactionId } = req.body;
    const updateData = { status };
    
    if (transactionId) {
      updateData.transactionId = transactionId;
    }

    const result = await OrderModel.updateOrderStatus(req.params.id, status, updateData);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

export default router;

