# SSL Commerce (SSLCommerz) Payment Integration Guide

## Overview
This project uses SSL Commerce (SSLCommerz) as the payment gateway for processing payments in Bangladesh.

## Setup Instructions

### 1. Get SSL Commerce Credentials

1. Sign up at [SSL Commerce Developer Portal](https://developer.sslcommerz.com/)
2. Create a merchant account
3. Get your credentials:
   - **Store ID**
   - **Store Password**
   - **API URL** (Sandbox for testing, Production for live)

### 2. Configure SSL Commerce

Update `src/utils/sslcommerce.js` with your credentials:

```javascript
export const SSL_COMMERCE_CONFIG = {
  storeId: 'YOUR_STORE_ID',
  storePassword: 'YOUR_STORE_PASSWORD',
  apiUrl: 'https://sandbox.sslcommerz.com', // For testing
  // apiUrl: 'https://securepay.sslcommerz.com', // For production
  successUrl: `${window.location.origin}/payment/success`,
  failUrl: `${window.location.origin}/payment/fail`,
  cancelUrl: `${window.location.origin}/payment/cancel`,
  ipnUrl: `${window.location.origin}/payment/ipn`,
};
```

### 3. Backend Setup (Required)

**Important**: SSL Commerce requires backend integration for security. You cannot use SSL Commerce directly from the frontend.

#### Backend API Endpoint Needed:

Create a backend endpoint (Node.js/Express example):

```javascript
// POST /api/sslcommerce/init
app.post('/api/sslcommerce/init', async (req, res) => {
  const paymentData = req.body;
  
  // Initialize payment session with SSL Commerce
  const response = await fetch('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(paymentData),
  });
  
  const data = await response.json();
  
  if (data.status === 'SUCCESS') {
    res.json({
      status: 'SUCCESS',
      GatewayPageURL: data.GatewayPageURL,
      tran_id: data.tran_id,
    });
  } else {
    res.json({
      status: 'FAILED',
      failedreason: data.failedreason,
    });
  }
});
```

#### Update Frontend Checkout

In `src/pages/Checkout.jsx`, uncomment and update the backend API call:

```javascript
const response = await fetch('/api/sslcommerce/init', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(paymentData),
});

const data = await response.json();

if (data.status === 'SUCCESS' && data.GatewayPageURL) {
  // Redirect to SSL Commerce payment page
  window.location.href = data.GatewayPageURL;
} else {
  toast.error(data.failedreason || 'Payment initialization failed');
  setProcessing(false);
}
```

### 4. Payment Flow

1. **User clicks "Pay"** → Form data is collected
2. **Frontend sends data to backend** → `/api/sslcommerce/init`
3. **Backend creates payment session** → With SSL Commerce API
4. **Backend returns payment URL** → GatewayPageURL
5. **User redirected to SSL Commerce** → Payment page
6. **User completes payment** → On SSL Commerce
7. **SSL Commerce redirects back** → To success/fail URLs
8. **Backend verifies payment** → Using IPN (Instant Payment Notification)

### 5. Payment Callback URLs

- **Success URL**: `/payment/success` - Shows success message
- **Fail URL**: `/payment/fail` - Shows failure message
- **Cancel URL**: `/payment/cancel` - User cancels payment
- **IPN URL**: `/payment/ipn` - Backend endpoint for payment verification

### 6. IPN (Instant Payment Notification) Handler

Create a backend endpoint to verify payments:

```javascript
// POST /api/sslcommerce/ipn
app.post('/api/sslcommerce/ipn', async (req, res) => {
  const { tran_id, status, val_id } = req.body;
  
  // Verify payment with SSL Commerce
  const verifyResponse = await fetch(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`
  );
  
  const verifyData = await verifyResponse.json();
  
  if (verifyData.status === 'VALID' || verifyData.status === 'VALIDATED') {
    // Payment is valid - update order status in database
    // Save order details, send confirmation email, etc.
    res.status(200).send('SUCCESS');
  } else {
    res.status(400).send('FAILED');
  }
});
```

### 7. Testing

#### Sandbox Credentials
- Use sandbox URL: `https://sandbox.sslcommerz.com`
- Test cards available in SSL Commerce dashboard
- Test phone numbers: 01XXXXXXXXX format

#### Test Cards
- **Visa**: 4111111111111111
- **Mastercard**: 5555555555554444
- Use any future expiry date and any CVV

### 8. Production Deployment

1. Switch to production API URL:
   ```javascript
   apiUrl: 'https://securepay.sslcommerz.com'
   ```

2. Update store credentials with production values

3. Ensure HTTPS is enabled (required for production)

4. Test payment flow thoroughly

## Security Notes

- **Never expose Store Password in frontend code**
- Always use backend API for payment initialization
- Verify all payments using IPN
- Use HTTPS in production
- Validate all payment data on backend

## Support

- SSL Commerce Documentation: https://developer.sslcommerz.com/doc/
- SSL Commerce Support: support@sslcommerz.com

## Current Implementation Status

✅ Frontend payment form created
✅ SSL Commerce configuration file created
✅ Payment success/fail pages created
✅ Routing configured
⏳ Backend API integration required (see step 3)

**Next Steps**: Set up backend API endpoints as described above.

