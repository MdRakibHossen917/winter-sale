# 🌐 Website View দেখুন / View Website

## 🚀 Frontend চালু করুন

### Step 1: Backend Server চালু করুন (যদি না থাকে)

**Terminal 1:**
```bash
cd E:\Cursor\wintersale\server
npm run quick
```

**Success হলে দেখবেন:**
```
🚀 Server running on port 5000
```

### Step 2: Frontend চালু করুন

**Terminal 2 (নতুন terminal):**
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

### Step 3: Browser-এ যান

**Browser-এ open করুন:**
```
http://localhost:5173
```

## 📱 আপনি কি দেখবেন

### Home Page:
- ✅ Hero section with "PureTasteBD" heading
- ✅ Featured products (6 products)
- ✅ "Why Choose Us" section
- ✅ Modern gradient design

### Pages Available:
1. **Home** (`/`) - Main landing page
2. **Products** (`/products`) - All products
3. **Product Details** (`/product/:id`) - Single product
4. **Cart** (`/cart`) - Shopping cart
5. **Login** (`/login`) - User login
6. **Register** (`/register`) - User registration
7. **Checkout** (`/checkout`) - Checkout page (protected)

## 🎨 UI Features

- ✅ Modern gradient navbar
- ✅ Responsive design (mobile-friendly)
- ✅ Product cards with images
- ✅ Shopping cart functionality
- ✅ User authentication
- ✅ Beautiful footer

## 🔍 Test করুন

### 1. Home Page
- Browser: `http://localhost:5173`
- দেখবেন: Hero section, featured products

### 2. Products Page
- Browser: `http://localhost:5173/products`
- দেখবেন: All 6 products in grid

### 3. Login Page
- Browser: `http://localhost:5173/login`
- দেখবেন: Login form

### 4. Register Page
- Browser: `http://localhost:5173/register`
- দেখবেন: Registration form

## ⚠️ Important Notes

1. **দুইটি terminal প্রয়োজন:**
   - Terminal 1: Backend server (port 5000)
   - Terminal 2: Frontend (port 5173)

2. **Backend running না থাকলে:**
   - Top-এ red warning দেখবেন
   - Login/Registration কাজ করবে না

3. **Browser Console Check:**
   - F12 press করুন
   - Console tab-এ errors check করুন

## 🎯 Quick Start Commands

```bash
# Terminal 1: Backend
cd E:\Cursor\wintersale\server
npm run quick

# Terminal 2: Frontend
cd E:\Cursor\wintersale
npm run dev

# Browser
http://localhost:5173
```

## ✅ Success Checklist

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] Browser-এ `http://localhost:5173` open করেছি
- [ ] Home page দেখছি
- [ ] No red warning at top
- [ ] Products load হচ্ছে

## 🆘 যদি View না দেখেন

1. **Check backend:** `http://localhost:5000/health`
2. **Check frontend:** `http://localhost:5173`
3. **Browser console check করুন** (F12)
4. **Terminal-এ errors check করুন**

