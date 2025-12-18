# 🚀 সার্ভার এখনই চালু করুন / Start Server Now

## ⚡ Quick Start

### Method 1: PowerShell Script (সবচেয়ে সহজ)

```powershell
cd server
.\start.ps1
```

### Method 2: Manual Start

**Step 1:** Terminal খুলুন

**Step 2:** Server folder-এ যান:
```bash
cd server
```

**Step 3:** `.env` file check করুন:
- যদি `.env` file না থাকে, এটি তৈরি করুন:

```env
PORT=5000
MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=puretastebd
JWT_SECRET=puretastebd_super_secret_jwt_key_2024
FRONTEND_URL=http://localhost:5173
```

**Step 4:** Dependencies install করুন (যদি না থাকে):
```bash
npm install
```

**Step 5:** Server start করুন:
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

## 🔍 Troubleshooting

### যদি MongoDB Connection Error আসে:

1. **MongoDB Atlas-এ যান:** https://cloud.mongodb.com/
2. **Network Access** tab-এ যান
3. **"Add IP Address"** click করুন
4. **"Allow Access from Anywhere"** (0.0.0.0/0) add করুন
5. **Save** করুন
6. Server restart করুন

### যদি Port Already in Use Error আসে:

**Option 1:** Port change করুন

`.env` file-এ:
```env
PORT=5001
```

`src/utils/api.js` file-এ:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

**Option 2:** Port 5000 ব্যবহার করা process kill করুন

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### যদি nodemon not found Error আসে:

```bash
cd server
npm install
```

## 🧪 Test Server

Browser-এ যান: `http://localhost:5000/health`

আপনি দেখবেন:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

## 📝 Important

- ✅ Server চালু থাকলে frontend-এ red warning দেখবেন না
- ✅ Server চালু থাকলে login/registration কাজ করবে
- ⚠️ Server terminal বন্ধ করবেন না (background-এ চলতে দিন)

## 🎯 Next Steps

1. ✅ Server চালু করুন (উপরে দেখুন)
2. ✅ Frontend চালু করুন (নতুন terminal-এ: `npm run dev`)
3. ✅ Browser-এ test করুন

