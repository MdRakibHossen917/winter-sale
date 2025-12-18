# 🔥 Firebase Environment Variables Setup

## 📝 .env File Configuration

Project root-এ (package.json-এর same folder) `.env` file তৈরি করুন:

```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key_here
VITE_authDomain=your-project.firebaseapp.com
VITE_projectId=your-project-id
VITE_storageBucket=your-project.appspot.com
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
```

## 🔍 Firebase Config পাওয়ার জন্য

1. **Browser-এ যান:** https://console.firebase.google.com/
2. **আপনার project select করুন** (বা নতুন project তৈরি করুন)
3. **Project Settings** (gear icon) click করুন
4. **General tab**-এ scroll down করুন
5. **"Your apps"** section-এ **Web icon (`</>`)** click করুন
6. **"Register app"** click করুন
7. **App nickname** দিন (optional)
8. **"Register app"** click করুন
9. **Config values copy করুন**

## 📋 Example .env File

```env
# Firebase Configuration
VITE_apiKey=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_authDomain=your-project.firebaseapp.com
VITE_projectId=your-project-id
VITE_storageBucket=your-project.appspot.com
VITE_messagingSenderId=123456789012
VITE_appId=1:123456789012:web:abcdef1234567890
```

## ⚠️ Important Notes

1. **`.env` file project root-এ থাকতে হবে** (package.json-এর same folder)
2. **Variable names exact match করতে হবে:**
   - `VITE_apiKey` (not `VITE_FIREBASE_API_KEY`)
   - `VITE_authDomain` (not `VITE_FIREBASE_AUTH_DOMAIN`)
   - etc.
3. **No spaces around `=` sign**
4. **No quotes needed** (unless value has spaces)

## 🔒 Security

- ✅ `.env` file `.gitignore`-এ আছে (commit হবে না)
- ✅ Never commit Firebase credentials to Git
- ✅ Production-এ use environment variables

## 🧪 Test করুন

`.env` file তৈরি করার পর:

1. **Server restart করুন:**
   ```bash
   npm run dev
   ```

2. **Browser console check করুন:**
   - F12 press করুন
   - Console tab-এ errors check করুন
   - "Firebase initialized successfully" দেখবেন

3. **Firebase warning check করুন:**
   - Top-এ red warning দেখবেন না (যদি config correct হয়)

## ✅ Success Indicators

- ✅ No Firebase warning at top
- ✅ Console-এ "Firebase initialized successfully"
- ✅ Login/Register page কাজ করে
- ✅ Google login button কাজ করে

## 🆘 Troubleshooting

### Error: "VITE_apiKey is not defined"

**সমাধান:**
- `.env` file project root-এ আছে কিনা check করুন
- Variable name exact match আছে কিনা check করুন
- Server restart করুন

### Error: "Firebase: Error (auth/api-key-not-valid)"

**সমাধান:**
- API key correct আছে কিনা verify করুন
- Firebase Console-এ project check করুন
- `.env` file-এ correct values আছে কিনা check করুন

### Warning: "Firebase Configuration Required"

**সমাধান:**
- `.env` file তৈরি করুন
- Correct variable names use করুন
- Server restart করুন

## 📝 Quick Checklist

- [ ] `.env` file project root-এ তৈরি করেছি
- [ ] Firebase Console-এ config values copy করেছি
- [ ] `.env` file-এ correct variable names use করেছি
- [ ] Server restart করেছি
- [ ] Browser console-এ no errors দেখছি
- [ ] Firebase warning দেখছি না

