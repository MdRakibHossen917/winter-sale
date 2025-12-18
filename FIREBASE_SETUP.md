# Firebase Setup Guide - Fix API Key Error

## 🔴 Error: "auth/api-key-not-valid"

This error occurs because Firebase credentials are not configured. Follow these steps to fix it:

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Follow the setup wizard:
   - Enter project name (e.g., "PureTasteBD")
   - Enable/disable Google Analytics (optional)
   - Click **"Create project"**

## Step 2: Register Web App

1. In your Firebase project, click the **Web icon** (`</>`)
2. Register your app:
   - App nickname: "PureTasteBD Web"
   - Check "Also set up Firebase Hosting" (optional)
   - Click **"Register app"**

## Step 3: Get Firebase Configuration

After registering, you'll see your Firebase config. It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**Copy all these values!**

## Step 4: Configure Firebase in Your Project

### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in the project root:

```bash
# Copy from .env.example
cp .env.example .env
```

2. Open `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. Restart your dev server:
```bash
npm run dev
```

### Option B: Direct Configuration (Quick Setup)

1. Open `src/utils/firebase.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Your actual API key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 5: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Email/Password**: Click "Enable" toggle
   - **Google**: 
     - Click "Enable" toggle
     - Add your domain to authorized domains (for production)
     - Add support email

3. Click **"Save"**

## Step 6: Set Up Authorized Domains (For Google Sign-In)

1. In Authentication > Settings > Authorized domains
2. Add your domains:
   - `localhost` (already added for development)
   - Your production domain (e.g., `puretastebd.com`)

## Step 7: Verify Setup

1. Restart your development server:
```bash
npm run dev
```

2. Try to register/login:
   - Go to `/register` or `/login`
   - The Firebase error should be gone
   - You should be able to create an account

## Common Issues & Solutions

### Issue 1: "Invalid API Key"
- **Solution**: Make sure you copied the complete API key (starts with `AIza`)
- Check for extra spaces or quotes in `.env` file
- Restart dev server after changing `.env`

### Issue 2: "Auth domain not authorized"
- **Solution**: Add your domain in Firebase Console > Authentication > Settings > Authorized domains

### Issue 3: "Project not found"
- **Solution**: Verify your `projectId` matches exactly (case-sensitive)

### Issue 4: Environment variables not loading
- **Solution**: 
  - Make sure `.env` file is in the project root (same level as `package.json`)
  - Variable names must start with `VITE_`
  - Restart dev server after creating/editing `.env`

## Security Notes

⚠️ **Important**:
- Never commit `.env` file to Git (already in `.gitignore`)
- Never share your Firebase credentials publicly
- For production, use environment variables
- API keys in frontend are safe (they're meant to be public)

## Testing

After setup, test:
1. ✅ Register with email/password
2. ✅ Login with email/password
3. ✅ Login with Google
4. ✅ Logout
5. ✅ Protected routes (checkout page)

## Need Help?

- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/
- Check browser console for detailed error messages

## Quick Checklist

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Config values copied
- [ ] `.env` file created with credentials
- [ ] `firebase.js` updated (if using direct config)
- [ ] Authentication enabled (Email/Password & Google)
- [ ] Dev server restarted
- [ ] Tested registration/login

