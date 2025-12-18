// bKash Sandbox Configuration
// Get your credentials from: https://developer.bka.sh/

export const BKASH_CONFIG = {
  // Sandbox credentials (replace with your actual credentials)
  appKey: 'YOUR_BKASH_APP_KEY',
  appSecret: 'YOUR_BKASH_APP_SECRET',
  
  // Sandbox URLs
  sandboxBaseUrl: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta',
  productionBaseUrl: 'https://tokenized.pay.bka.sh/v1.2.0-beta',
  
  // Use sandbox for testing
  useSandbox: true,
  
  // Callback URLs
  successUrl: `${window.location.origin}/payment/success`,
  failUrl: `${window.location.origin}/payment/fail`,
  cancelUrl: `${window.location.origin}/payment/cancel`,
};

// Get base URL based on environment
export const getBkashBaseUrl = () => {
  return BKASH_CONFIG.useSandbox 
    ? BKASH_CONFIG.sandboxBaseUrl 
    : BKASH_CONFIG.productionBaseUrl;
};

// Generate payment ID
export const generatePaymentId = () => {
  return `PAY${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// Prepare bKash payment data
export const prepareBkashPaymentData = (orderData) => {
  const {
    totalAmount,
    currency = 'BDT',
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    invoiceNumber,
    productName,
  } = orderData;

  return {
    mode: '0011', // Checkout mode
    payerReference: customerPhone || 'N/A',
    callbackURL: BKASH_CONFIG.successUrl,
    amount: totalAmount.toString(),
    currency: currency,
    intent: 'sale',
    merchantInvoiceNumber: invoiceNumber || generatePaymentId(),
    productName: productName || 'Products',
    productCategory: 'General',
    customerName: customerName,
    customerEmail: customerEmail,
    customerPhone: customerPhone,
    customerAddress: customerAddress,
  };
};

// Initialize bKash payment
export const initBkashPayment = async (paymentData) => {
  try {
    // In production, this should be done through your backend
    // Your backend will:
    // 1. Get access token from bKash
    // 2. Create payment
    // 3. Return payment URL
    
    // For demo purposes, we'll simulate the flow
    console.log('🔵 bKash Payment Data:', paymentData);
    
    // Example backend call (commented out):
    /*
    const response = await fetch('/api/bkash/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      throw new Error('bKash payment initialization failed');
    }
    
    const data = await response.json();
    
    if (data.paymentID && data.bkashURL) {
      // Redirect to bKash payment page
      window.location.href = data.bkashURL;
      return data;
    } else {
      throw new Error(data.errorMessage || 'Payment initialization failed');
    }
    */
    
    // Demo: Return mock payment data
    return {
      paymentID: generatePaymentId(),
      bkashURL: '#', // In production, this would be the actual bKash payment URL
      status: 'SUCCESS',
    };
  } catch (error) {
    console.error('❌ bKash payment error:', error);
    throw error;
  }
};

// Verify bKash payment (should be done on backend)
export const verifyBkashPayment = async (paymentID) => {
  try {
    // This should be done on your backend
    // Example:
    /*
    const response = await fetch(`/api/bkash/execute-payment/${paymentID}`, {
      method: 'POST',
    });
    
    const data = await response.json();
    return data;
    */
    
    // Demo: Return mock verification
    return {
      status: 'SUCCESS',
      paymentID: paymentID,
      transactionStatus: 'Completed',
    };
  } catch (error) {
    console.error('❌ bKash payment verification error:', error);
    throw error;
  }
};

