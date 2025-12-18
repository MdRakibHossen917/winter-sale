# 🚀 Login/Registration Fix - Complete Guide

## ⚠️ সমস্যা
Login বা Registration হচ্ছে না।

## ✅ সমাধান (Step by Step)

### Step 1: Backend Server চালু করুন

**Terminal 1 খুলুন:**

```bash
cd server
```

**`.env` file তৈরি করুন** (যদি না থাকে):

`server/.env` file তৈরি করুন:

```env
PORT=5000
MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=puretastebd
JWT_SECRET=puretastebd_super_secret_jwt_key_2024
FRONTEND_URL=http://localhost:5173
```

**Server start করুন:**

```bash
npm run dev
```

**✅ Success হলে দেখবেন:**

```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB successfully
✅ Database indexes created
🔄 Initializing products...
✅ Initialized 6 products
===========================================
🚀 Server running on port 5000
📡 API: http://localhost:5000/api
💚 Health: http://localhost:5000/health
===========================================
```

**⚠️ এই terminal বন্ধ করবেন না!**

### Step 2: Frontend চালু করুন

**Terminal 2 খুলুন** (নতুন terminal):

```bash
npm run dev
```

**✅ Success হলে দেখবেন:**

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3: Test করুন

1. **Browser-এ যান:** `http://localhost:5173`

2. **Server Status Check:**
   - যদি top-এ red warning দেখেন = Server offline ❌
   - যদি warning না দেখেন = Server online ✅

3. **Register Test:**
   - Register page-এ যান
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - Register করুন

4. **Login Test:**
   - Login page-এ যান
   - Same email/password দিন
   - Login করুন

## 🔍 Troubleshooting

### 1. "সার্ভার চালু নেই" Error:

**সমাধান:**
```bash
cd server
npm run dev
```

### 2. MongoDB Connection Error:

**সমাধান:**
1. MongoDB Atlas-এ যান: https://cloud.mongodb.com/
2. **Network Access** → **Add IP Address**
3. **"Allow Access from Anywhere"** (0.0.0.0/0) add করুন
4. Server restart করুন

### 3. Port 5000 Already in Use:

**সমাধান:**
`.env` file-এ:
```env
PORT=5001
```

`src/utils/api.js` file-এ:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

### 4. "Invalid email or password":

**সমাধান:**
- সঠিক email/password দিন
- বা নতুন account register করুন

## ✅ Success Checklist

- [ ] Backend server running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] No red warning at top
- [ ] Can register new account
- [ ] Can login with credentials

## 📝 Important Notes

1. **দুইটি terminal প্রয়োজন:**
   - Terminal 1: Backend server (port 5000)
   - Terminal 2: Frontend (port 5173)

2. **Server চালু না থাকলে login/registration কাজ করবে না**

3. **Browser console check করুন** (F12 press করুন) error দেখার জন্য

4. **Server status warning** top-এ দেখাবে যদি server offline থাকে

## 🎯 Quick Test Commands

**Server check:**
```bash
# Browser-এ
http://localhost:5000/health
```

**Expected response:**
```json
{"success":true,"message":"Server is running"}
```

## 🆘 Still Not Working?

1. Check browser console (F12)
2. Check server terminal for errors
3. Check MongoDB connection
4. Restart both servers

