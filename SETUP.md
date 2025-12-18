# Quick Setup Guide

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure Firebase**
   - Open `src/utils/firebase.js`
   - Replace the placeholder values with your Firebase config:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

3. **Configure Stripe**
   - Open `src/utils/stripe.js`
   - Replace with your Stripe publishable key:
     ```javascript
     export const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');
     ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📋 Firebase Setup Steps

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Navigate to **Authentication** > **Sign-in method**
   - Enable **Email/Password**
   - Enable **Google** (add your domain to authorized domains)
4. Get your config:
   - Go to **Project Settings** > **General**
   - Scroll down to "Your apps" section
   - Copy the config values

## 💳 Stripe Setup Steps

1. Sign up at [Stripe](https://stripe.com/)
2. Get your API keys:
   - Go to **Dashboard** > **Developers** > **API keys**
   - Copy your **Publishable key** (starts with `pk_test_` for test mode)
3. For production payments, you'll need to:
   - Set up a backend server
   - Create payment intents on your backend
   - Update the checkout flow in `src/pages/Checkout.jsx`

## ✅ Verify Installation

After setup, you should be able to:
- ✅ View the home page
- ✅ Browse products
- ✅ Add items to cart
- ✅ Register/Login (after Firebase setup)
- ✅ View checkout page (after login)
- ⚠️ Complete payments (requires backend setup for production)

## 🐛 Troubleshooting

### Firebase Errors
- Make sure you've enabled Email/Password and Google authentication
- Check that your API keys are correct
- Verify your domain is authorized for Google sign-in

### Stripe Errors
- Ensure you're using the correct publishable key (test vs live)
- For production, payment intents must be created on your backend
- The current implementation is a demo - update `Checkout.jsx` for production

### Build Errors
- Run `npm install --legacy-peer-deps` if you see peer dependency warnings
- Clear `node_modules` and reinstall if issues persist

## 📝 Next Steps

1. Customize product images and descriptions
2. Set up your backend for Stripe payment intents
3. Configure production Firebase and Stripe keys
4. Deploy to Vercel, Netlify, or your preferred hosting

