import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Get environment variables with fallback to empty string
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey || '',
  authDomain: import.meta.env.VITE_authDomain || '',
  projectId: import.meta.env.VITE_projectId || '',
  storageBucket: import.meta.env.VITE_storageBucket || '',
  messagingSenderId: import.meta.env.VITE_messagingSenderId || '',
  appId: import.meta.env.VITE_appId || ''
};

// Debug: Log what we're getting (first few chars only for security)
console.log('🔍 Firebase Config Check:');
console.log('  apiKey:', firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : '❌ NOT SET');
console.log('  projectId:', firebaseConfig.projectId || '❌ NOT SET');
console.log('  authDomain:', firebaseConfig.authDomain || '❌ NOT SET');

// Validate configuration - strict check
const isConfigValid = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey.trim() !== '' &&
  firebaseConfig.apiKey !== 'undefined' &&
  firebaseConfig.apiKey.length > 20 &&
  firebaseConfig.apiKey.startsWith('AIza') &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId.trim() !== '' &&
  firebaseConfig.projectId !== 'undefined' &&
  firebaseConfig.projectId.length > 0 &&
  firebaseConfig.authDomain &&
  firebaseConfig.authDomain.trim() !== '' &&
  firebaseConfig.appId &&
  firebaseConfig.appId.trim() !== '';

if (!isConfigValid) {
  console.error('');
  console.error('❌ ============================================');
  console.error('❌ FIREBASE CONFIGURATION INCOMPLETE!');
  console.error('❌ ============================================');
  console.error('');
  console.error('📝 SOLUTION: Create .env.local file in project root');
  console.error('');
  console.error('File location: E:\\Cursor\\wintersale\\.env.local');
  console.error('');
  console.error('Required content:');
  console.error('  VITE_apiKey=AIzaSyDz8Ctn2UcZhoDTztIFmnxT5hBW-QjPolM');
  console.error('  VITE_authDomain=parcel-delivery-c48d0.firebaseapp.com');
  console.error('  VITE_projectId=parcel-delivery-c48d0');
  console.error('  VITE_storageBucket=parcel-delivery-c48d0.firebasestorage.app');
  console.error('  VITE_messagingSenderId=542379277221');
  console.error('  VITE_appId=1:542379277221:web:5d087b41d3687a79d8864c');
  console.error('');
  console.error('Current values detected:');
  console.error('  apiKey:', firebaseConfig.apiKey ? `"${firebaseConfig.apiKey.substring(0, 15)}..." (${firebaseConfig.apiKey.length} chars)` : '❌ NOT SET or EMPTY');
  console.error('  projectId:', firebaseConfig.projectId || '❌ NOT SET or EMPTY');
  console.error('  authDomain:', firebaseConfig.authDomain || '❌ NOT SET or EMPTY');
  console.error('');
  console.error('⚠️ IMPORTANT: After creating .env.local, RESTART the dev server!');
  console.error('   Command: npm run dev');
  console.error('');
  console.error('❌ ============================================');
  console.error('');
}

// Initialize Firebase
let app;
let auth;

try {
  if (!isConfigValid) {
    throw new Error('Firebase configuration is incomplete');
  }
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log('✅ Firebase initialized successfully');
  console.log('✅ Auth service ready');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  console.error('❌ Please check your Firebase configuration in .env.local file');
  console.error('❌ Authentication features will NOT work until Firebase is configured');
  // Create a mock auth object to prevent app crash
  auth = null;
  app = null;
}

// Export auth and app
export { auth };
export default app;

