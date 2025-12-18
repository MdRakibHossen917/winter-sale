// Firebase Configuration
// IMPORTANT: Replace these with your actual Firebase config values
// Get your config from: https://console.firebase.google.com/
// Project Settings > General > Your apps > Web app

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Option 1: Use environment variables (Recommended for production)
// Create a .env file in the root directory with:
// VITE_FIREBASE_API_KEY=your_api_key
// VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
// etc.

// Option 2: Direct configuration (For development)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Validate configuration
const isConfigValid = firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_API_KEY" && 
  firebaseConfig.apiKey.length > 20 &&
  firebaseConfig.apiKey.startsWith('AIza') &&
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== "YOUR_PROJECT_ID";

if (!isConfigValid) {
  console.error('❌ ============================================');
  console.error('❌ FIREBASE API KEY NOT CONFIGURED!');
  console.error('❌ ============================================');
  console.error('');
  console.error('📝 To fix this error:');
  console.error('');
  console.error('1. Go to: https://console.firebase.google.com/');
  console.error('2. Select your project (or create one)');
  console.error('3. Click Web icon (</>) to register app');
  console.error('4. Copy the config values');
  console.error('');
  console.error('Then either:');
  console.error('   Option A: Create .env file in project root with:');
  console.error('     VITE_FIREBASE_API_KEY=your_actual_key');
  console.error('     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com');
  console.error('     VITE_FIREBASE_PROJECT_ID=your-project-id');
  console.error('     ... (see FIREBASE_QUICK_SETUP.md for all)');
  console.error('');
  console.error('   Option B: Update firebaseConfig object below with actual values');
  console.error('');
  console.error('📖 See FIREBASE_QUICK_SETUP.md for detailed instructions');
  console.error('');
  console.error('Current API Key:', firebaseConfig.apiKey ? `"${firebaseConfig.apiKey.substring(0, 10)}..." (may be invalid)` : 'NOT SET');
  console.error('Current Project ID:', firebaseConfig.projectId || 'NOT SET');
  console.error('');
  console.error('❌ ============================================');
}

// Initialize Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
  
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app);
  
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app);
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  console.error('Please check your Firebase configuration.');
  
  // Create a mock auth object to prevent app crash
  // This allows the app to load but authentication won't work
  auth = null;
  db = null;
  
  // Show error in console but don't crash the app
  console.warn('⚠️ App will load but authentication features will not work until Firebase is configured.');
}

// Export auth and db (will be null if Firebase not configured)
export { auth, db };

export default app;

