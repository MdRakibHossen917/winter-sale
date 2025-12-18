# 🔧 Preview দেখা যাচ্ছে না - সমাধান

## ⚡ দ্রুত সমাধান

### Step 1: Frontend চালু করুন

**Terminal খুলুন:**

```bash
cd E:\Cursor\wintersale
npm run dev
```

**Success হলে দেখবেন:**

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 2: Browser-এ যান

**Browser-এ open করুন:**

```
http://localhost:5173
```

**অথবা Vite terminal-এ দেখানো URL use করুন**

## 🔍 সমস্যা Check করুন

### 1. Frontend Running আছে কিনা

```powershell
Test-NetConnection -ComputerName localhost -Port 5173
```

**যদি False** = Frontend running নেই
**সমাধান:** `npm run dev` run করুন

### 2. Dependencies Installed আছে কিনা

```bash
cd E:\Cursor\wintersale
npm install
```

### 3. Port 5173 Already in Use

**সমাধান:**

**Option A:** Port change করুন

`vite.config.js` file-এ:
```javascript
export default {
  server: {
    port: 5174
  }
}
```

**Option B:** Port free করুন

```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## ✅ Step-by-Step Fix

### Step 1: Clean Start

```powershell
# Kill all node processes
taskkill /F /IM node.exe

# Go to project folder
cd E:\Cursor\wintersale

# Install dependencies (if needed)
npm install
```

### Step 2: Start Frontend

```bash
npm run dev
```

### Step 3: Browser-এ যান

**Vite terminal-এ দেখানো URL copy করুন:**

```
http://localhost:5173
```

**Browser-এ paste করুন**

## 🚨 Common Issues

### Issue 1: "Cannot GET /" বা Blank Page

**সমাধান:**
- Frontend running আছে কিনা check করুন
- Browser console check করুন (F12)
- `npm run dev` restart করুন

### Issue 2: "Port 5173 already in use"

**সমাধান:**

**Option A:** Port change করুন

`vite.config.js` file তৈরি করুন (যদি না থাকে):

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174
  }
})
```

**Option B:** Port free করুন

```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Issue 3: "Module not found" বা Import Errors

**সমাধান:**

```bash
npm install
npm run dev
```

### Issue 4: White Screen বা Nothing Loading

**সমাধান:**
1. Browser console check করুন (F12)
2. Errors দেখুন
3. `npm install` run করুন
4. Server restart করুন

## 🧪 Test Commands

### Test 1: Frontend Running

```bash
npm run dev
```

Browser: `http://localhost:5173`

**Expected:** Home page with PureTasteBD

### Test 2: Check Dependencies

```bash
npm list --depth=0
```

**Expected:** All packages listed

### Test 3: Build Test

```bash
npm run build
```

**Expected:** `dist/` folder created

## 📝 Checklist

- [ ] `cd E:\Cursor\wintersale` করেছি
- [ ] `npm install` run করেছি
- [ ] `npm run dev` run করেছি
- [ ] Terminal-এ "Local: http://localhost:5173" দেখেছি
- [ ] Browser-এ `http://localhost:5173` open করেছি
- [ ] Home page দেখছি

## 🎯 Quick Commands

```bash
# Start frontend
cd E:\Cursor\wintersale
npm run dev

# Browser
http://localhost:5173
```

## ✅ Success Indicators

- ✅ Terminal-এ "ready in xxx ms" দেখবেন
- ✅ "Local: http://localhost:5173" দেখবেন
- ✅ Browser-এ home page দেখবেন
- ✅ Navbar, products, footer সব দেখবেন

## 🆘 Still Not Working?

1. **Terminal-এ exact error message copy করুন**
2. **Browser console check করুন** (F12)
3. **Dependencies reinstall করুন:** `npm install`
4. **Port check করুন:** `netstat -ano | findstr :5173`

## 💡 Tips

- Vite terminal-এ দেখানো exact URL use করুন
- Browser cache clear করুন (Ctrl+Shift+Delete)
- Incognito mode-এ test করুন
- Different browser-এ test করুন

