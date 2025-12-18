# ⚡ Quick Fix: Server Run হচ্ছে না

## 🚨 এখনই করুন

### Method 1: Test Server (সবচেয়ে সহজ)

```bash
cd E:\Cursor\wintersale\server
node test-server.js
```

**যদি এটি কাজ করে** = Server code OK ✅
**তারপর full server চালু করুন:**

```bash
npm run dev
```

### Method 2: Dependencies Reinstall

```bash
cd E:\Cursor\wintersale\server
npm install
npm run dev
```

### Method 3: Simple Server (MongoDB ছাড়া)

```bash
cd E:\Cursor\wintersale\server
node start-simple.js
```

## 🔍 Error Messages

### "nodemon not found"
```bash
npm install
```

### "MongoDB connection failed"
- MongoDB Atlas → Network Access → Allow 0.0.0.0/0

### "Port 5000 in use"
- `.env` file-এ `PORT=5001` করুন

## ✅ Test

Browser: `http://localhost:5000/health`

Expected: `{"success":true}`

