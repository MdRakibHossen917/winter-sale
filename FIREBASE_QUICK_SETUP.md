# Firebase Quick Setup - API Key Error Fix

## ⚠️ Error: "auth/api-key-not-valid"

এই error Firebase credentials configure না করলে হয়। নিচের steps follow করুন:

## 🚀 Quick Fix (5 Minutes)

### Step 1: Firebase Project তৈরি করুন

1. **Firebase Console-এ যান**: https://console.firebase.google.com/
2. **"Add project"** বা existing project select করুন
3. Project name দিন (যেমন: "PureTasteBD")
4. **"Create project"** click করুন

### Step 2: Web App Register করুন

1. Project-এ যাওয়ার পর, **Web icon** (`</>`) click করুন
2. App nickname দিন: "PureTasteBD Web"
3. **"Register app"** click করুন

### Step 3: Config Values Copy করুন

আপনি এই config দেখবেন (এই format-এ):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnop",
  authDomain: "puretastebd.firebaseapp.com",
  projectId: "puretastebd",
  storageBucket: "puretastebd.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**এই values copy করুন!**

### Step 4: Config File Update করুন

**Option 1: .env File ব্যবহার করুন (Best)**

1. Project root-এ `.env` file তৈরি করুন (package.json-এর same folder)
2. এই content add করুন:

```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=puretastebd.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=puretastebd
VITE_FIREBASE_STORAGE_BUCKET=puretastebd.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**⚠️ Important**: 
- `AIzaSyC...` এর জায়গায় আপনার actual API key দিন
- সব values আপনার Firebase Console থেকে copy করুন
- কোন space বা quote দেবেন না

3. File save করুন

**Option 2: Direct Config (Quick Test)**

1. `src/utils/firebase.js` file open করুন
2. Line 17-23 এ actual values দিন:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnop", // আপনার actual key
  authDomain: "puretastebd.firebaseapp.com",
  projectId: "puretastebd",
  storageBucket: "puretastebd.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Step 5: Authentication Enable করুন

1. Firebase Console > **Authentication** menu
2. **"Get started"** click করুন (প্রথমবার)
3. **Sign-in method** tab
4. **Email/Password** enable করুন:
   - Toggle on করুন
   - **Save** করুন
5. **Google** enable করুন:
   - Click করুন
   - Toggle on করুন
   - Support email add করুন
   - **Save** করুন

### Step 6: Authorized Domains Check করুন

1. Authentication > **Settings** tab
2. **Authorized domains** section
3. নিশ্চিত করুন `localhost` আছে
4. না থাকলে **"Add domain"** > `localhost` add করুন

### Step 7: Dev Server Restart করুন

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 8: Test করুন

1. Browser-এ `/login` page-এ যান
2. **"Continue with Google"** button click করুন
3. Google account select করুন
4. ✅ Login successful!

## 📋 Example .env File

Create `.env` file in project root:

```env
# Firebase Configuration
# Get these from: https://console.firebase.google.com/
# Project Settings > General > Your apps > Web app

VITE_FIREBASE_API_KEY=AIzaSyC_YOUR_ACTUAL_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Config values copied from Firebase Console
- [ ] `.env` file created OR `firebase.js` updated
- [ ] Email/Password authentication enabled
- [ ] Google Sign-In enabled
- [ ] `localhost` in authorized domains
- [ ] Dev server restarted
- [ ] Tested login

## 🔍 Still Getting Error?

### Check 1: API Key Format
- API key `AIzaSyC` দিয়ে শুরু হওয়া উচিত
- Minimum 39 characters
- No spaces or quotes

### Check 2: .env File Location
- `.env` file project root-এ থাকতে হবে
- `package.json` এর same folder
- File name exactly `.env` (no extension)

### Check 3: Environment Variables
- Variable names `VITE_` দিয়ে শুরু হতে হবে
- No spaces around `=`
- Restart dev server after creating/editing `.env`

### Check 4: Browser Console
- F12 press করুন
- Console tab-এ errors দেখুন
- Network tab-এ Firebase requests check করুন

### Check 5: Firebase Console
- Authentication > Users - check if users are being created
- Project Settings - verify config values match

## 🆘 Need More Help?

1. **Browser Console**: F12 > Console tab - exact error দেখুন
2. **Firebase Console**: https://console.firebase.google.com/
3. **Firebase Docs**: https://firebase.google.com/docs/auth/web/start

## Quick Test

After setup, check browser console (F12):
- ✅ Should see: "✅ Firebase initialized successfully"
- ❌ Should NOT see: "⚠️ Firebase API Key not configured!"

If you see the warning, your config is not loaded properly.

