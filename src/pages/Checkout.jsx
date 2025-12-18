import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/products';
import { preparePaymentData } from '../utils/sslcommerce';
import { prepareBkashPaymentData, initBkashPayment } from '../utils/bkash';
import { ordersAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, currentUser } = useAuth();
  // Support both Firebase (user) and backend (currentUser)
  const authenticatedUser = user || currentUser;
  const navigate = useNavigate();
  const total = getTotalPrice();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    postalCode: '1200',
    specialNote: '',
  });
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('sslcommerce'); // 'sslcommerce' or 'bkash'

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Pre-fill form with user data if available
  useEffect(() => {
    if (authenticatedUser) {
      setFormData(prev => ({
        ...prev,
        name: authenticatedUser.displayName || authenticatedUser.email?.split('@')[0] || '',
      }));
    }
  }, [authenticatedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.name.trim()) {
      toast.error('নাম দিন / Please enter your name');
      return false;
    }
    
    if (formData.name.trim().length < 2) {
      toast.error('নাম কমপক্ষে ২ অক্ষর হতে হবে / Name must be at least 2 characters');
      return false;
    }
    
    if (!formData.phone || !formData.phone.trim()) {
      toast.error('ফোন নম্বর দিন / Please enter your phone number');
      return false;
    }
    
    // Validate phone number format (Bangladeshi format)
    const phoneRegex = /^(?:\+88|01[3-9])\d{8}$/;
    const cleanPhone = formData.phone.trim().replace(/[\s-]/g, '');
    if (!phoneRegex.test(cleanPhone) && cleanPhone.length < 10) {
      toast.error('সঠিক ফোন নম্বর দিন (01XXXXXXXXX) / Please enter a valid phone number');
      return false;
    }
    
    if (!formData.address || !formData.address.trim()) {
      toast.error('ঠিকানা দিন / Please enter your address');
      return false;
    }
    
    if (formData.address.trim().length < 5) {
      toast.error('বিস্তারিত ঠিকানা দিন / Please enter a detailed address');
      return false;
    }
    
    if (!formData.city || !formData.city.trim()) {
      toast.error('শহর দিন / Please enter your city');
      return false;
    }
    
    // Check if user is logged in
    if (!authenticatedUser || !authenticatedUser.email) {
      toast.error('লগইন করুন / Please login first');
      return false;
    }
    
    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Additional validation
    if (!authenticatedUser?.email) {
      toast.error('Email is required. Please login first.');
      return;
    }

    if (total <= 0) {
      toast.error('Invalid order total. Please add items to cart.');
      return;
    }

    setProcessing(true);

    try {
      // Prepare order data
      const productNames = cartItems.map(item => item.name).join(', ');
      const productCategory = cartItems.map(item => item.category).join(',');

      // Validate all required data
      if (!formData.name || !formData.phone || !formData.address || !formData.city) {
        throw new Error('Please fill in all required fields');
      }

      // Show processing message
      toast.loading('Processing payment...', { duration: 2000 });

      // Handle payment based on selected method
      if (paymentMethod === 'bkash') {
        // bKash Payment
        const bkashPaymentData = prepareBkashPaymentData({
          totalAmount: total,
          currency: 'BDT',
          customerName: formData.name.trim(),
          customerEmail: authenticatedUser.email,
          customerPhone: formData.phone.trim(),
          customerAddress: formData.address.trim(),
          productName: productNames || 'Products',
        });

        console.log('🔵 bKash Payment Data:', bkashPaymentData);

        // In production, this should call your backend
        // Your backend will initialize bKash payment and return payment URL
        /*
        const response = await fetch('/api/bkash/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bkashPaymentData),
        });
        
        const data = await response.json();
        
        if (data.bkashURL) {
          window.location.href = data.bkashURL;
          return;
        } else {
          throw new Error(data.errorMessage || 'bKash payment initialization failed');
        }
        */

        // Save order to database first
        const orderData = {
          items: cartItems.map(item => ({
            productId: item.id,
            name: item.name,
            nameBn: item.nameBn,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category,
          })),
          totalAmount: total,
          customerName: formData.name.trim(),
          customerEmail: authenticatedUser.email,
          customerPhone: formData.phone.trim(),
          customerAddress: formData.address.trim(),
          city: formData.city.trim(),
          postalCode: formData.postalCode.trim() || '1200',
          specialNote: formData.specialNote.trim() || '',
          paymentMethod: 'bkash',
          transactionId: bkashPaymentData.merchantInvoiceNumber,
          status: 'paid',
        };

        // Save order to database
        try {
          console.log('💾 Saving bKash order to database...');
          console.log('📦 Order data:', {
            customerEmail: orderData.customerEmail,
            totalAmount: orderData.totalAmount,
            itemsCount: orderData.items.length,
            paymentMethod: orderData.paymentMethod
          });
          
          const orderResponse = await ordersAPI.create(orderData);
          
          if (orderResponse && orderResponse.success) {
            console.log('✅ bKash order saved to database successfully!');
            console.log('📋 Order ID:', orderResponse.order?._id || orderResponse.order?.id);
            toast.success('Order saved to database!', { duration: 3000 });
          } else {
            console.warn('⚠️ Order save response:', orderResponse);
            toast.error('Order save response unclear', { duration: 3000 });
          }
        } catch (orderError) {
          console.error('❌ Failed to save bKash order to database:', orderError);
          console.error('Error details:', {
            message: orderError.message,
            stack: orderError.stack
          });
          
          // Show specific error message
          const errorMsg = orderError.message || 'Unknown error';
          if (errorMsg.includes('Server is not running')) {
            toast.error('Backend server is not running. Please start the server.', { duration: 5000 });
          } else if (errorMsg.includes('Database not connected')) {
            toast.error('MongoDB not connected. Please check server connection.', { duration: 5000 });
          } else {
            toast.error(`Order save failed: ${errorMsg}`, { duration: 5000 });
          }
          
          // Continue with payment even if order save fails
          console.warn('⚠️ Continuing with payment despite order save failure');
        }

        // Demo: Simulate bKash payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('✅ bKash Payment successful!');
        toast.success('bKash payment successful! Order placed.', { duration: 3000 });
        
        clearCart();
        navigate(`/payment/success?payment_id=${bkashPaymentData.merchantInvoiceNumber}&method=bkash&status=SUCCESS`);

      } else {
        // SSL Commerce Payment
        const paymentData = preparePaymentData({
          totalAmount: total,
          currency: 'BDT',
          customerName: formData.name.trim(),
          customerEmail: authenticatedUser.email,
          customerPhone: formData.phone.trim(),
          customerAddress: formData.address.trim(),
          city: formData.city.trim(),
          postalCode: formData.postalCode.trim() || '1200',
          productName: productNames || 'Products',
          productCategory: productCategory || 'General',
        });

        console.log('✅ SSL Commerce Payment Data:', {
          totalAmount: paymentData.total_amount,
          customerName: paymentData.cus_name,
          customerEmail: paymentData.cus_email,
          transactionId: paymentData.tran_id,
        });
        
        // In production, you should send this to your backend
        // Your backend will create the payment session with SSL Commerce
        // and return the payment URL to redirect to
        /*
        const response = await fetch('/api/sslcommerce/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });
        
        if (!response.ok) {
          throw new Error('Payment initialization failed');
        }
        
        const data = await response.json();
        
        if (data.status === 'SUCCESS' && data.GatewayPageURL) {
          // Redirect to SSL Commerce payment page
          window.location.href = data.GatewayPageURL;
          return;
        } else {
          throw new Error(data.failedreason || 'Payment initialization failed');
        }
        */

        // Save order to database first
        const orderData = {
          items: cartItems.map(item => ({
            productId: item.id,
            name: item.name,
            nameBn: item.nameBn,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category,
          })),
          totalAmount: total,
          customerName: formData.name.trim(),
          customerEmail: authenticatedUser.email,
          customerPhone: formData.phone.trim(),
          customerAddress: formData.address.trim(),
          city: formData.city.trim(),
          postalCode: formData.postalCode.trim() || '1200',
          specialNote: formData.specialNote.trim() || '',
          paymentMethod: 'sslcommerce',
          transactionId: paymentData.tran_id,
          status: 'paid',
        };

        // Save order to database
        try {
          console.log('💾 Saving order to database...');
          console.log('📦 Order data:', {
            customerEmail: orderData.customerEmail,
            totalAmount: orderData.totalAmount,
            itemsCount: orderData.items.length,
            paymentMethod: orderData.paymentMethod
          });
          
          const orderResponse = await ordersAPI.create(orderData);
          
          if (orderResponse && orderResponse.success) {
            console.log('✅ Order saved to database successfully!');
            console.log('📋 Order ID:', orderResponse.order?._id || orderResponse.order?.id);
            toast.success('Order saved to database!', { duration: 3000 });
          } else {
            console.warn('⚠️ Order save response:', orderResponse);
            toast.error('Order save response unclear', { duration: 3000 });
          }
        } catch (orderError) {
          console.error('❌ Failed to save order to database:', orderError);
          console.error('Error details:', {
            message: orderError.message,
            stack: orderError.stack
          });
          
          // Show specific error message
          const errorMsg = orderError.message || 'Unknown error';
          if (errorMsg.includes('Server is not running')) {
            toast.error('Backend server is not running. Please start the server.', { duration: 5000 });
          } else if (errorMsg.includes('Database not connected')) {
            toast.error('MongoDB not connected. Please check server connection.', { duration: 5000 });
          } else {
            toast.error(`Order save failed: ${errorMsg}`, { duration: 5000 });
          }
          
          // Continue with payment even if order save fails
          console.warn('⚠️ Continuing with payment despite order save failure');
        }

        // Demo: Simulate successful payment after 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('✅ SSL Commerce Payment successful!');
        toast.success('Payment successful! Order placed.', { duration: 3000 });
        
        clearCart();
        navigate(`/payment/success?tran_id=${paymentData.tran_id}&method=sslcommerce&status=SUCCESS`);
      }

    } catch (error) {
      console.error('❌ Payment error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
      
      let errorMessage = 'Payment failed. Please try again.';
      
      if (error.message) {
        if (error.message.includes('required fields')) {
          errorMessage = 'সব ফিল্ড পূরণ করুন / Please fill in all required fields';
        } else if (error.message.includes('Email')) {
          errorMessage = 'ইমেইল প্রয়োজন / Email is required';
        } else if (error.message.includes('total')) {
          errorMessage = 'অর্ডার টোটাল ভুল / Invalid order total';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage, { duration: 5000 });
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Checkout - PureTasteBD</title>
        <meta name="description" content="Complete your order. Enter your delivery details and payment information to proceed." />
        <meta name="keywords" content="checkout, payment, order, PureTasteBD" />
      </Helmet>
      <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.nameBn}</p>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary-600">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-700">Subtotal:</span>
                <span className="text-lg font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Payment Details</h2>
            
            <form onSubmit={handlePayment} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={authenticatedUser?.email || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your delivery address"
                />
              </div>

              {/* City and Postal Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Dhaka"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="1200"
                  />
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Special Note / Instructions (Optional)
                </label>
                <textarea
                  name="specialNote"
                  value={formData.specialNote}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any special instructions or notes for your order (e.g., delivery time preference, gift message, etc.)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add any special instructions or notes for your order
                </p>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sslcommerce')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'sslcommerce'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === 'sslcommerce'}
                        onChange={() => setPaymentMethod('sslcommerce')}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="font-medium text-gray-700">SSL Commerce</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'bkash'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="w-4 h-4 text-primary-600"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-[#E2136E]">bKash</span>
                        <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-0.5 rounded">Sandbox</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pay {formatPrice(total)} with {paymentMethod === 'bkash' ? 'bKash' : 'SSL Commerce'}
                  </>
                )}
              </button>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                🔒 Secure payment powered by {paymentMethod === 'bkash' ? 'bKash Sandbox' : 'SSL Commerce'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
