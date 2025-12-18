# 🚀 Quick Start Backend Server

## ✅ Server Starting...

The backend server is being started in the background.

## 📋 Manual Start (If Needed):

### Option 1: Using PowerShell Script
```powershell
cd server
.\start.ps1
```

### Option 2: Using Batch File
```cmd
cd server
start.bat
```

### Option 3: Direct Command
```bash
cd server
npm run dev
```

## 🔍 Verify Server is Running:

1. **Wait 5-10 seconds** for server to start
2. **Open browser:** http://localhost:5000/health
3. **Should see:**
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

## 📊 Expected Server Output:

```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB successfully
📦 Using database: puretastebd
✅ Database indexes created
🚀 Server running on port 5000
📡 API: http://localhost:5000/api
💚 Health: http://localhost:5000/health
```

## 🆘 Troubleshooting:

### If server doesn't start:

1. **Check if port 5000 is free:**
   ```powershell
   netstat -ano | findstr :5000
   ```

2. **Check MongoDB connection:**
   - Server will start even if MongoDB fails
   - But orders won't save without MongoDB

3. **Check .env file:**
   - Should be in `server/.env`
   - Should have MONGODB_URI

4. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

## ✅ After Server Starts:

1. **Refresh My Orders page** in browser
2. **Orders should now load!**

## 🎉 Server Should Be Running!

Wait a few seconds, then try My Orders page again!

