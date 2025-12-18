# 🔧 Server Run হচ্ছে না - সমাধান

## ⚠️ সমস্যা
Server run হচ্ছে না / `npm run dev` কাজ করছে না

## ✅ সমাধান (Step by Step)

### Step 1: Dependencies Check করুন

```bash
cd E:\Cursor\wintersale\server
npm install
```

### Step 2: Test Server চালু করুন (MongoDB ছাড়া)

```bash
node test-server.js
```

**যদি এটি কাজ করে** = Express OK ✅
**যদি error আসে** = Dependencies issue ❌

### Step 3: Full Server চালু করুন

```bash
npm run dev
```

## 🔍 Common Errors & Solutions

### Error 1: "Cannot find module 'nodemon'"

**সমাধান:**
```bash
npm install
```

### Error 2: "MongoServerError" বা MongoDB connection failed

**Option A: MongoDB Fix করুন**

1. Browser-এ যান: https://cloud.mongodb.com/
2. Network Access → Add IP Address
3. "Allow Access from Anywhere" (0.0.0.0/0)
4. Server restart করুন

**Option B: MongoDB ছাড়া Test করুন**

```bash
node start-simple.js
```

এটি server চালু করবে কিন্তু MongoDB ছাড়া (auth কাজ করবে না)

### Error 3: "Port 5000 already in use"

**সমাধান:**

**Option A:** Port change করুন

`.env` file-এ:
```env
PORT=5001
```

`src/utils/api.js` file-এ:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

**Option B:** Port 5000 free করুন

```powershell
# Find process
netstat -ano | findstr :5000

# Kill process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

### Error 4: "SyntaxError" বা "Unexpected token"

**সমাধান:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

Windows PowerShell-এ:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

## 🧪 Step-by-Step Test

### Test 1: Basic Server (No MongoDB)

```bash
node test-server.js
```

Browser-এ যান: `http://localhost:5000/health`

**Expected:** `{"success":true,"message":"Test server is running"}`

### Test 2: Simple Server (No MongoDB)

```bash
node start-simple.js
```

Browser-এ যান: `http://localhost:5000/health`

**Expected:** `{"success":true,"message":"Server is running (without MongoDB)"}`

### Test 3: Full Server (With MongoDB)

```bash
npm run dev
```

Browser-এ যান: `http://localhost:5000/health`

**Expected:** `{"success":true,"message":"Server is running"}`

## 📝 Debug Checklist

- [ ] `cd E:\Cursor\wintersale\server` করেছি
- [ ] `npm install` run করেছি
- [ ] `.env` file আছে
- [ ] `node test-server.js` কাজ করে
- [ ] MongoDB connection check করেছি
- [ ] Port 5000 free আছে
- [ ] `npm run dev` run করেছি

## 🆘 Still Not Working?

1. **Terminal-এ exact error message copy করুন**
2. **Browser console check করুন** (F12)
3. **MongoDB Atlas Network Access check করুন**
4. **Internet connection check করুন**

## 💡 Quick Fix Commands

```bash
# Full reset
cd E:\Cursor\wintersale\server
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

## ✅ Success Indicators

Server running হলে দেখবেন:
- ✅ "Server running on port 5000"
- ✅ Browser-এ `http://localhost:5000/health` কাজ করে
- ✅ Frontend-এ red warning দেখবেন না

