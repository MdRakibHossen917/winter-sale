# 🔥 Firebase Setup - Do This Now!

## ⚠️ Error: "auth/api-key-not-valid"

এই error ঠিক করতে Firebase credentials add করতে হবে।

---

## 🎯 Copy-Paste Steps:

### Step 1: Firebase Console
👉 **https://console.firebase.google.com/**

### Step 2: Get Config (2 minutes)

1. **"Add project"** → Name: `PureTasteBD` → Create
2. Web icon (`</>`) click করুন
3. **"Register app"** click করুন
4. এই config দেখবেন:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

**এই 6টি value copy করুন!**

### Step 3: Create .env File

**Project root folder-এ** (package.json-এর same folder) `.env` file তৈরি করুন:

**File name**: `.env`

**Content** (আপনার values দিয়ে replace করুন):

```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**⚠️ Important:**
- `AIzaSyC...` এর জায়গায় আপনার actual API key
- কোন space বা quote নেই
- সব values Firebase Console থেকে exact copy

### Step 4: Enable Authentication

Firebase Console-এ:
1. **Authentication** → **Sign-in method**
2. **Email/Password** → Enable → Save
3. **Google** → Enable → Email add → Save

### Step 5: Restart Server

```bash
# Terminal-এ Ctrl+C press করুন
# তারপর:
npm run dev
```

### Step 6: Test

1. Browser: `http://localhost:5173/register`
2. Email/password দিয়ে register করুন
3. ✅ Success!

---

## ✅ Done!

Firebase configure করার পর login কাজ করবে!

---

## 🆘 Still Error?

Browser console (F12) check করুন:
- Exact error message কি?
- "✅ Firebase initialized successfully" দেখাচ্ছে?

