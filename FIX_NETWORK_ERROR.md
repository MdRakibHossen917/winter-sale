# 🔧 Network Error Fix - সার্ভার চালু করুন

## ⚠️ সমস্যা
"নেটওয়ার্ক সমস্যা, সার্ভার চেক করুন" - এই error আসছে কারণ **backend server চালু নেই**।

## ✅ সমাধান (3টি সহজ উপায়)

### 🚀 Method 1: PowerShell Script (সবচেয়ে সহজ)

1. `server` folder-এ যান
2. PowerShell-এ run করুন:
   ```powershell
   .\start.ps1
   ```

### 🚀 Method 2: Batch File

1. `server` folder-এ যান
2. `start.bat` file double-click করুন

### 🚀 Method 3: Manual (Terminal)

**Terminal খুলুন:**

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

## ✅ Success Indicators

আপনি দেখবেন:

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

## 🧪 Test করুন

1. Browser-এ যান: `http://localhost:5000/health`
2. আপনি দেখবেন:
   ```json
   {
     "success": true,
     "message": "Server is running",
     "timestamp": "..."
   }
   ```

3. Frontend-এ login/register করুন - এখন কাজ করবে!

## 🔍 Troubleshooting

### MongoDB Connection Error:

1. MongoDB Atlas-এ যান: https://cloud.mongodb.com/
2. **Network Access** tab-এ যান
3. **"Add IP Address"** click করুন
4. **"Allow Access from Anywhere"** (0.0.0.0/0) add করুন
5. Server restart করুন

### Port 5000 Already in Use:

`.env` file-এ port change করুন:
```env
PORT=5001
```

এবং `src/utils/api.js` file-এ:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

### nodemon not found:

```bash
cd server
npm install
```

## 📝 Important Notes

- ✅ Server port: **5000**
- ✅ Frontend port: **5173**
- ✅ MongoDB connection string already configured
- ✅ Server auto-creates products on first run

## ✅ এখন কি করবেন?

1. ✅ Server চালু করুন (উপরে দেখুন)
2. ✅ নতুন terminal-এ frontend চালু করুন: `npm run dev`
3. ✅ Browser-এ যান: `http://localhost:5173`
4. ✅ Register/Login করুন

**সব ঠিক হলে network error চলে যাবে!** 🎉

