# 🔧 সার্ভার Network Error Fix

## সমস্যা / Problem
"নেটওয়ার্ক সমস্যা, সার্ভার চেক করুন" - এই error আসছে কারণ backend server চালু নেই।

## ✅ সমাধান / Quick Fix

### Method 1: Batch File ব্যবহার করুন (সবচেয়ে সহজ)

1. `server` folder-এ যান
2. `start.bat` file double-click করুন
3. Server automatically start হবে

### Method 2: Manual Start

**Step 1:** Terminal খুলুন এবং `server` folder-এ যান:

```bash
cd server
```

**Step 2:** `.env` file তৈরি করুন (যদি না থাকে):

`server/.env` file তৈরি করুন এই content দিয়ে:

```env
PORT=5000
MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=puretastebd
JWT_SECRET=puretastebd_super_secret_jwt_key_2024
FRONTEND_URL=http://localhost:5173
```

**Step 3:** Server start করুন:

```bash
npm run dev
```

**Step 4:** আপনি দেখবেন:

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

**Step 5:** নতুন terminal-এ frontend start করুন:

```bash
npm run dev
```

## ✅ Test করুন

1. Browser-এ যান: `http://localhost:5000/health`
2. আপনি দেখবেন: `{"success":true,"message":"Server is running",...}`
3. Frontend-এ login/register করুন

## 🔍 যদি Error আসে

### MongoDB Connection Error:

1. MongoDB Atlas-এ যান: https://cloud.mongodb.com/
2. Network Access tab-এ যান
3. "Add IP Address" click করুন
4. "Allow Access from Anywhere" (0.0.0.0/0) add করুন
5. Server restart করুন

### Port Already in Use:

`.env` file-এ port change করুন:
```env
PORT=5001
```

এবং `src/utils/api.js` file-এ:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

## ✅ Success!

যদি সব ঠিক থাকে:
- ✅ Server running on port 5000
- ✅ Frontend can connect to backend
- ✅ Login/Register কাজ করবে
- ✅ Products load হবে

