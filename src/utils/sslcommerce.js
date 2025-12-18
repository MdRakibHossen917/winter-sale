// SSL Commerce (SSLCommerz) Configuration
// Get your credentials from: https://developer.sslcommerz.com/

export const SSL_COMMERCE_CONFIG = {
  // Test credentials (replace with your actual credentials)
  storeId: 'YOUR_STORE_ID',
  storePassword: 'YOUR_STORE_PASSWORD',
  
  // For production, use:
  // apiUrl: 'https://securepay.sslcommerz.com'
  // For sandbox/testing, use:
  apiUrl: 'https://sandbox.sslcommerz.com',
  
  // Success and failure URLs (will be handled by your backend)
  successUrl: `${window.location.origin}/payment/success`,
  failUrl: `${window.location.origin}/payment/fail`,
  cancelUrl: `${window.location.origin}/payment/cancel`,
  ipnUrl: `${window.location.origin}/payment/ipn`, // Instant Payment Notification
};

// Generate transaction ID
export const generateTransactionId = () => {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// Prepare payment data
export const preparePaymentData = (orderData) => {
  const {
    totalAmount,
    currency = 'BDT',
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    city = 'Dhaka',
    country = 'Bangladesh',
    postalCode = '1200',
    productName,
    productCategory,
    productProfile = 'general',
  } = orderData;

  return {
    store_id: SSL_COMMERCE_CONFIG.storeId,
    store_passwd: SSL_COMMERCE_CONFIG.storePassword,
    total_amount: totalAmount,
    currency: currency,
    tran_id: generateTransactionId(),
    success_url: SSL_COMMERCE_CONFIG.successUrl,
    fail_url: SSL_COMMERCE_CONFIG.failUrl,
    cancel_url: SSL_COMMERCE_CONFIG.cancelUrl,
    ipn_url: SSL_COMMERCE_CONFIG.ipnUrl,
    cus_name: customerName,
    cus_email: customerEmail,
    cus_add1: customerAddress,
    cus_city: city,
    cus_postcode: postalCode,
    cus_country: country,
    cus_phone: customerPhone,
    shipping_method: 'NO',
    product_name: productName,
    product_category: productCategory,
    product_profile: productProfile,
    multi_card_name: 'all',
    value_a: 'ref001',
    value_b: 'ref002',
    value_c: 'ref003',
    value_d: 'ref004',
  };
};

