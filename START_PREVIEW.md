# 🚀 Preview দেখুন - Quick Start

## ⚡ এখনই করুন

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

**Browser-এ এই URL open করুন:**

```
http://localhost:5173
```

**অথবা Vite terminal-এ দেখানো exact URL copy করুন**

## ✅ আপনি কি দেখবেন

### Home Page:
- ✅ **Hero Section:** "Pure Products & Imported Drinks"
- ✅ **Featured Products:** 4 products in cards
- ✅ **Why Choose Us:** 3 feature cards
- ✅ **Navbar:** Gradient navbar with menu
- ✅ **Footer:** Contact information

### Pages:
1. **Home** (`/`) - Main page
2. **Products** (`/products`) - All products
3. **Login** (`/login`) - Login form
4. **Register** (`/register`) - Registration form
5. **Cart** (`/cart`) - Shopping cart

## 🔍 যদি Preview না দেখেন

### Issue 1: Frontend Not Running

**সমাধান:**
```bash
cd E:\Cursor\wintersale
npm install
npm run dev
```

### Issue 2: Port 5173 in Use

**সমাধান:**

`vite.config.js` file-এ port change করুন:

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

তারপর browser-এ যান: `http://localhost:5174`

### Issue 3: White Screen

**সমাধান:**
1. Browser console check করুন (F12)
2. Errors দেখুন
3. `npm install` run করুন
4. Server restart করুন

### Issue 4: "Cannot GET /"

**সমাধান:**
- Frontend running আছে কিনা check করুন
- Exact URL use করুন: `http://localhost:5173`
- Browser cache clear করুন

## 📝 Quick Checklist

- [ ] Terminal খুলেছি
- [ ] `cd E:\Cursor\wintersale` করেছি
- [ ] `npm run dev` run করেছি
- [ ] Terminal-এ "Local: http://localhost:5173" দেখেছি
- [ ] Browser-এ `http://localhost:5173` open করেছি
- [ ] Home page দেখছি

## 🎯 Test Commands

```bash
# Start frontend
npm run dev

# Browser
http://localhost:5173
```

## ✅ Success Indicators

- ✅ Terminal-এ "ready in xxx ms" দেখবেন
- ✅ "Local: http://localhost:5173" দেখবেন
- ✅ Browser-এ PureTasteBD website দেখবেন
- ✅ Navbar, products, footer সব দেখবেন

## 🆘 Still Not Working?

1. **Terminal-এ error message check করুন**
2. **Browser console check করুন** (F12)
3. **Dependencies install করুন:** `npm install`
4. **Different browser try করুন**

