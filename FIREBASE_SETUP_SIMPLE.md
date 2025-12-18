# 🔥 Firebase Setup - Simple Steps (5 মিনিট)

## ⚠️ Error: "auth/api-key-not-valid"

এই error Firebase credentials না থাকলে হয়। নিচের steps follow করুন:

---

## 📋 Step-by-Step (সহজ):

### Step 1: Firebase Console-এ যান
👉 https://console.firebase.google.com/

### Step 2: Project তৈরি করুন
1. **"Add project"** click করুন
2. Project name দিন: `PureTasteBD` (বা আপনার পছন্দের নাম)
3. **"Continue"** click করুন
4. Google Analytics enable/disable করুন (optional)
5. **"Create project"** click করুন
6. Wait করুন project তৈরি হতে (30 seconds)

### Step 3: Web App Register করুন
1. Project তৈরি হওয়ার পর, **Web icon** (`</>`) click করুন
2. App nickname: `PureTasteBD Web`
3. **"Register app"** click করুন

### Step 4: Config Copy করুন
এই page-এ আপনি এইরকম config দেখবেন:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnop",
  authDomain: "puretastebd-12345.firebaseapp.com",
  projectId: "puretastebd-12345",
  storageBucket: "puretastebd-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**এই values copy করুন!** (সব 6টি value)

### Step 5: .env File তৈরি করুন

1. Project root folder-এ (যেখানে `package.json` আছে) `.env` file তৈরি করুন
2. এই content add করুন (আপনার actual values দিয়ে replace করুন):

```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=puretastebd-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=puretastebd-12345
VITE_FIREBASE_STORAGE_BUCKET=puretastebd-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

**⚠️ Important:**
- `AIzaSyC...` এর জায়গায় আপনার actual API key দিন
- কোন space বা quote দেবেন না
- সব values Firebase Console থেকে exact copy করুন

### Step 6: Authentication Enable করুন

1. Firebase Console-এ **Authentication** menu click করুন
2. **"Get started"** click করুন (প্রথমবার)
3. **Sign-in method** tab-এ যান
4. **Email/Password** enable করুন:
   - Toggle on করুন
   - **Save** click করুন
5. **Google** enable করুন:
   - Click করুন
   - Toggle on করুন
   - Support email add করুন (যেমন: `mdrakibhossencse@gmail.com`)
   - **Save** click করুন

### Step 7: Server Restart করুন

1. Terminal-এ **Ctrl+C** press করুন (server stop করতে)
2. তারপর:
```bash
npm run dev
```

### Step 8: Test করুন

1. Browser-এ `/register` page-এ যান
2. Email/password দিয়ে register করুন
3. ✅ Success হলে Firebase properly configured!

---

## 🎯 Quick Method (Direct Config):

যদি `.env` file কাজ না করে, direct config করুন:

1. `src/utils/firebase.js` file open করুন
2. Line 17-23 এ actual values দিন:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // আপনার actual key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123"
};
```

3. File save করুন
4. Server restart করুন

---

## ✅ Verification:

Browser console (F12) খুলে check করুন:

- ✅ **"✅ Firebase initialized successfully"** = Working!
- ❌ **"❌ FIREBASE API KEY NOT CONFIGURED!"** = Need to configure

---

## 🆘 Still Not Working?

### Check 1: API Key Format
- `AIzaSyC` দিয়ে শুরু হতে হবে
- Minimum 39 characters
- No spaces

### Check 2: .env File
- File name exactly `.env` (no extension)
- Project root-এ (package.json-এর same folder)
- Restart server after creating

### Check 3: Firebase Console
- Authentication > Sign-in method
- Email/Password enabled?
- Google enabled?

---

## 📞 Quick Help:

1. **Browser Console**: F12 > Console - exact error দেখুন
2. **Firebase Console**: https://console.firebase.google.com/
3. **Check**: Authentication > Users - users create হচ্ছে?

---

## 🎉 Success!

Firebase configure করার পর:
- ✅ Register কাজ করবে
- ✅ Login কাজ করবে (Email & Google)
- ✅ Error message যাবে

**Test করুন**: `/register` page-এ যান এবং account তৈরি করুন!

