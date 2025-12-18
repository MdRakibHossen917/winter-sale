# 🔧 Localhost Run হচ্ছে না - সমাধান

## ⚡ দ্রুত সমাধান

### Method 1: Quick Start (MongoDB ছাড়া)

```bash
cd E:\Cursor\wintersale\server
npm run quick
```

**এটি server চালু করবে localhost:5000-এ**

### Method 2: Test Server

```bash
cd E:\Cursor\wintersale\server
node test-server.js
```

Browser-এ যান: `http://localhost:5000/health`

### Method 3: Full Server (MongoDB সহ)

```bash
cd E:\Cursor\wintersale\server
npm run dev
```

## 🔍 সমস্যা Check করুন

### 1. Port 5000 Check

```powershell
netstat -ano | findstr :5000
```

**যদি output দেখেন** = Port already in use
**সমাধান:** `.env` file-এ `PORT=5001` করুন

### 2. Node Process Check

```powershell
Get-Process -Name node
```

**যদি অনেক process দেখেন** = Kill করুন:
```powershell
taskkill /F /IM node.exe
```

### 3. Dependencies Check

```bash
cd E:\Cursor\wintersale\server
npm install
```

## ✅ Step-by-Step Fix

### Step 1: Clean Start

```powershell
# Kill all node processes
taskkill /F /IM node.exe

# Go to server folder
cd E:\Cursor\wintersale\server

# Install dependencies
npm install
```

### Step 2: Quick Test

```bash
npm run quick
```

**Browser-এ যান:** `http://localhost:5000/health`

**Expected:** `{"success":true,"message":"Server is running"}`

### Step 3: Full Server

```bash
npm run dev
```

## 🚨 Common Issues

### Issue 1: "Cannot GET /health"

**সমাধান:**
- Server running আছে কিনা check করুন
- Port 5000 check করুন
- Browser-এ `http://localhost:5000/health` যান

### Issue 2: "Connection refused"

**সমাধান:**
- Server start করুন: `npm run quick`
- Port check করুন: `netstat -ano | findstr :5000`

### Issue 3: "Port already in use"

**সমাধান:**

**Option A:** Port change করুন
```env
# .env file
PORT=5001
```

**Option B:** Port free করুন
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue 4: MongoDB Connection Error

**সমাধান:**
- Quick server use করুন: `npm run quick`
- অথবা MongoDB fix করুন (Network Access)

## 🧪 Test Commands

### Test 1: Basic Server
```bash
node test-server.js
```
Browser: `http://localhost:5000/health`

### Test 2: Quick Server
```bash
npm run quick
```
Browser: `http://localhost:5000/health`

### Test 3: Full Server
```bash
npm run dev
```
Browser: `http://localhost:5000/health`

## 📝 Checklist

- [ ] `cd E:\Cursor\wintersale\server` করেছি
- [ ] `npm install` run করেছি
- [ ] Port 5000 free আছে
- [ ] `npm run quick` run করেছি
- [ ] Browser-এ `http://localhost:5000/health` test করেছি
- [ ] Response দেখেছি: `{"success":true}`

## 🎯 Quick Commands

```bash
# Quick start (no MongoDB)
npm run quick

# Test server
npm run test

# Full server
npm run dev
```

## ✅ Success Indicators

- ✅ Terminal-এ দেখবেন: "Server running on port 5000"
- ✅ Browser-এ `http://localhost:5000/health` কাজ করে
- ✅ Response: `{"success":true}`
- ✅ Frontend-এ red warning দেখবেন না

## 🆘 Still Not Working?

1. **Terminal-এ exact error message copy করুন**
2. **Port check করুন:** `netstat -ano | findstr :5000`
3. **Node processes kill করুন:** `taskkill /F /IM node.exe`
4. **Fresh start করুন:** `npm run quick`

