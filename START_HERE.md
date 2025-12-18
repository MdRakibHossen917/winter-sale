# 🚀 START HERE - Firebase Setup (2 মিনিট)

## ⚠️ Error দেখছেন? "auth/api-key-not-valid"

এই error Firebase configure না করলে হয়। খুব সহজে fix করুন:

---

## 🎯 3 Simple Steps:

### 1️⃣ Firebase Console-এ যান
👉 **https://console.firebase.google.com/**

### 2️⃣ Config Values নিন
1. Project তৈরি করুন (বা existing select করুন)
2. Web icon (`</>`) click করুন
3. App register করুন
4. **Config values copy করুন** (6টি value)

### 3️⃣ .env File তৈরি করুন

**Project root folder-এ** (যেখানে `package.json` আছে) `.env` file তৈরি করুন:

**File name**: `.env` (exactly এই নাম, কোন extension নেই)

**Content** (আপনার actual values দিয়ে replace করুন):

```
VITE_FIREBASE_API_KEY=আপনার_API_KEY_এখানে
VITE_FIREBASE_AUTH_DOMAIN=আপনার_AUTH_DOMAIN_এখানে
VITE_FIREBASE_PROJECT_ID=আপনার_PROJECT_ID_এখানে
VITE_FIREBASE_STORAGE_BUCKET=আপনার_STORAGE_BUCKET_এখানে
VITE_FIREBASE_MESSAGING_SENDER_ID=আপনার_MESSAGING_SENDER_ID_এখানে
VITE_FIREBASE_APP_ID=আপনার_APP_ID_এখানে
```

**Example** (আপনার values দিয়ে replace করুন):
```
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=myproject.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myproject-12345
VITE_FIREBASE_STORAGE_BUCKET=myproject-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### 4️⃣ Authentication Enable করুন
1. Firebase Console > **Authentication**
2. **Email/Password** enable করুন
3. **Google** enable করুন

### 5️⃣ Server Restart করুন
```bash
# Ctrl+C (stop server)
npm run dev
```

---

## ✅ Test করুন:

1. Browser: `http://localhost:5173/register`
2. Email/password দিয়ে register করুন
3. ✅ Success হলে Firebase working!

---

## 📖 Detailed Guide:

- `FIREBASE_SETUP_SIMPLE.md` - Step-by-step guide
- `FIREBASE_QUICK_SETUP.md` - Complete instructions

---

## 🆘 Help:

Browser console (F12) খুলে exact error দেখুন। সব instructions console-এও দেখবেন!

