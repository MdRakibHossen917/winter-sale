# 🚀 সার্ভার চালু করার সম্পূর্ণ গাইড

## ⚡ এখনই করুন / Do This Now

### Step 1: Terminal খুলুন

**PowerShell বা Command Prompt খুলুন**

### Step 2: Server Folder-এ যান

```bash
cd E:\Cursor\wintersale\server
```

### Step 3: Server Start করুন

```bash
npm run dev
```

**অথবা:**

```bash
node server.js
```

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

## ⚠️ যদি Error আসে:

### 1. MongoDB Connection Error:

**সমাধান:**
1. MongoDB Atlas-এ যান: https://cloud.mongodb.com/
2. **Network Access** → **Add IP Address**
3. **"Allow Access from Anywhere"** (0.0.0.0/0) add করুন
4. **Save** করুন
5. Server restart করুন

### 2. Port 5000 Already in Use:

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

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### 3. nodemon not found:

```bash
npm install
```

### 4. Dependencies Missing:

```bash
npm install
```

## 🧪 Server Test করুন

**Browser-এ যান:**
```
http://localhost:5000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

## 📝 Important Notes

1. **Server terminal বন্ধ করবেন না** - এটি background-এ চলতে থাকবে
2. **MongoDB connection 5-10 সেকেন্ড সময় নিতে পারে**
3. **দুইটি terminal প্রয়োজন:**
   - Terminal 1: Backend server (port 5000)
   - Terminal 2: Frontend (port 5173)

## 🎯 Quick Checklist

- [ ] `.env` file exists in `server/` folder
- [ ] Dependencies installed (`npm install`)
- [ ] Server started (`npm run dev`)
- [ ] MongoDB connection successful
- [ ] Server running on port 5000
- [ ] Health check works: `http://localhost:5000/health`

## 🆘 Still Not Working?

1. **Check server terminal** - error messages দেখুন
2. **Check MongoDB Atlas** - Network Access allow করুন
3. **Check port 5000** - অন্য process ব্যবহার করছে কিনা
4. **Restart computer** - সব process kill করে fresh start করুন

## ✅ Success!

যখন server running হবে:
- ✅ Frontend-এ red warning দেখবেন না
- ✅ Login/Registration কাজ করবে
- ✅ Products load হবে
- ✅ Orders create হবে

