# Login Test Guide - বাংলা

## 🚀 Server Running

Development server চালু হয়েছে! Browser-এ এই URL-এ যান:

**http://localhost:5173** (বা terminal-এ দেখানো port)

## ✅ Login Test Steps:

### Step 1: Register করুন (প্রথমবার)

1. Browser-এ `/register` page-এ যান
2. Email দিন (যেমন: `test@example.com`)
3. Password দিন (minimum 6 characters)
4. Confirm password দিন
5. **"Register"** button click করুন

**Expected Result:**
- ✅ "রেজিস্ট্রেশন সফল!" message দেখাবে
- ✅ Home page-এ redirect হবে
- ✅ Navbar-এ আপনার email দেখাবে

### Step 2: Login করুন

1. **Logout** করুন (যদি login করা থাকে)
2. `/login` page-এ যান
3. Same email/password দিন
4. **"Login"** button click করুন

**Expected Result:**
- ✅ "লগইন সফল!" message দেখাবে
- ✅ Home page-এ redirect হবে
- ✅ Navbar-এ email দেখাবে

### Step 3: Google Login Test করুন

1. `/login` page-এ যান
2. **"Continue with Google"** button click করুন
3. Google account select করুন
4. Permission দিন

**Expected Result:**
- ✅ "গুগল লগইন সফল!" message দেখাবে
- ✅ Login হবে

## ⚠️ যদি Error দেখায়:

### Error: "Firebase API Key not configured"

**Solution:**
1. Firebase Console-এ যান: https://console.firebase.google.com/
2. Project তৈরি করুন
3. Web app register করুন
4. Config values copy করুন
5. `.env` file তৈরি করুন project root-এ:

```env
VITE_FIREBASE_API_KEY=AIzaSyC...your_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

6. Server restart করুন (Ctrl+C, তারপর `npm run dev`)

### Error: "Google Sign-In not enabled"

**Solution:**
1. Firebase Console > Authentication > Sign-in method
2. Google enable করুন
3. Support email add করুন
4. Save করুন

### Error: "Domain not authorized"

**Solution:**
1. Firebase Console > Authentication > Settings
2. Authorized domains-এ `localhost` আছে কিনা check করুন
3. না থাকলে add করুন

## 🔍 Debug Tips:

1. **Browser Console** (F12):
   - Console tab-এ errors দেখুন
   - Network tab-এ Firebase requests check করুন

2. **Check Firebase Config**:
   - Browser console-এ "✅ Firebase initialized successfully" দেখতে হবে
   - যদি "❌ FIREBASE API KEY NOT CONFIGURED!" দেখায়, config করতে হবে

3. **Test Flow**:
   - Register → Login → Logout → Login again
   - Google login test করুন

## 📝 Quick Test Checklist:

- [ ] Server running (http://localhost:5173)
- [ ] Register page loads
- [ ] Can register with email/password
- [ ] Login page loads
- [ ] Can login with email/password
- [ ] Can logout
- [ ] Google login button works (if Firebase configured)
- [ ] Protected routes (checkout) require login

## 🎯 Expected Behavior:

### Without Firebase Config:
- ✅ App loads
- ✅ Pages work
- ⚠️ Warning banner shows at top
- ❌ Login/Register won't work (will show error)

### With Firebase Config:
- ✅ App loads
- ✅ All pages work
- ✅ Register works
- ✅ Login works (Email & Google)
- ✅ Logout works
- ✅ Protected routes work

## Need Help?

1. Check browser console (F12) for errors
2. See `FIREBASE_QUICK_SETUP.md` for Firebase setup
3. See `GOOGLE_LOGIN_FIX.md` for Google login issues

