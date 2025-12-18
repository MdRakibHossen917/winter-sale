# 🚨 URGENT: সার্ভার চালু করুন / Start Server Now

## ⚡ এখনই করুন (3 Steps)

### Step 1: নতুন Terminal খুলুন
- Windows: `Win + R` → `powershell` → Enter
- অথবা: Start Menu → PowerShell

### Step 2: Server Folder-এ যান

Terminal-এ type করুন:
```
cd E:\Cursor\wintersale\server
```

Enter press করুন

### Step 3: Server Start করুন

Terminal-এ type করুন:
```
npm run dev
```

Enter press করুন

## ✅ Success হলে দেখবেন:

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

## ⚠️ IMPORTANT:

- ✅ **এই terminal বন্ধ করবেন না!**
- ✅ Server running থাকলে frontend-এ red warning দেখবেন না
- ✅ Login/Registration কাজ করবে

## 🔍 যদি Error আসে:

### Error 1: "MongoServerError" বা "MongoDB connection failed"

**সমাধান:**
1. Browser-এ যান: https://cloud.mongodb.com/
2. Login করুন
3. আপনার project select করুন
4. **Network Access** (বাম sidebar) click করুন
5. **"Add IP Address"** button click করুন
6. **"Allow Access from Anywhere"** select করুন (0.0.0.0/0)
7. **Confirm** করুন
8. Server terminal-এ `Ctrl+C` press করুন (stop করুন)
9. আবার `npm run dev` run করুন

### Error 2: "Port 5000 already in use"

**সমাধান:**

**Option A:** Port change করুন

1. `server/.env` file খুলুন
2. `PORT=5000` change করুন `PORT=5001` এ
3. Save করুন
4. `src/utils/api.js` file খুলুন
5. Line 3-এ change করুন:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
   ```
6. Server restart করুন

**Option B:** Port 5000 free করুন

Terminal-এ:
```powershell
netstat -ano | findstr :5000
```
Process ID (PID) note করুন, তারপর:
```powershell
taskkill /PID <PID> /F
```

### Error 3: "nodemon not found" বা "command not found"

**সমাধান:**
```bash
cd E:\Cursor\wintersale\server
npm install
npm run dev
```

## 🧪 Server Test করুন

Server running হলে:

1. Browser-এ যান: `http://localhost:5000/health`
2. আপনি দেখবেন:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

## 📝 Quick Checklist

- [ ] Terminal খুলেছি
- [ ] `cd E:\Cursor\wintersale\server` run করেছি
- [ ] `npm run dev` run করেছি
- [ ] "Server running on port 5000" দেখেছি
- [ ] Terminal বন্ধ করিনি
- [ ] Browser-এ `http://localhost:5000/health` test করেছি

## 🎯 Next Steps

1. ✅ Server running হলে
2. ✅ নতুন terminal খুলুন
3. ✅ `cd E:\Cursor\wintersale` run করুন
4. ✅ `npm run dev` run করুন (frontend)
5. ✅ Browser-এ `http://localhost:5173` যান
6. ✅ Login/Register করুন

## 🆘 Still Not Working?

1. **Server terminal-এ error messages দেখুন**
2. **Browser console check করুন** (F12 press করুন)
3. **MongoDB Atlas Network Access check করুন**
4. **Internet connection check করুন**

---

**💡 Tip:** Server running থাকলে frontend-এ top-এ red warning দেখবেন না!

