# 🔧 Login Fix Guide

## ❌ Problem: Login Not Working

## ✅ Solutions

### Step 1: Check .env.local File

**Location:** Project root (`E:\Cursor\wintersale\.env.local`)

**Required content:**
```env
VITE_apiKey=AIzaSyDz8Ctn2UcZhoDTztIFmnxT5hBW-QjPolM
VITE_authDomain=parcel-delivery-c48d0.firebaseapp.com
VITE_projectId=parcel-delivery-c48d0
VITE_storageBucket=parcel-delivery-c48d0.firebasestorage.app
VITE_messagingSenderId=542379277221
VITE_appId=1:542379277221:web:5d087b41d3687a79d8864c
```

### Step 2: Restart Development Server

**Important:** After creating/updating `.env.local`, you MUST restart the dev server!

```bash
# Stop current server (Ctrl+C)
# Then restart:
cd E:\Cursor\wintersale
npm run dev
```

### Step 3: Check Browser Console

1. **Open Browser:** `http://localhost:5173`
2. **Press F12** to open Developer Tools
3. **Go to Console tab**
4. **Look for:**
   - ✅ `Firebase initialized successfully` - Good!
   - ❌ `Firebase configuration is incomplete` - Bad! Check .env.local
   - ❌ `Firebase auth not initialized` - Bad! Check .env.local

### Step 4: Test Login

1. **Go to:** `http://localhost:5173/login`
2. **Enter email and password**
3. **Click Login**
4. **Check console for errors**

## 🔍 Common Issues

### Issue 1: "Firebase auth not initialized"

**Solution:**
- Check `.env.local` file exists
- Check all `VITE_` variables are set
- Restart dev server after creating/updating `.env.local`

### Issue 2: "auth/not-initialized" error

**Solution:**
- `.env.local` file missing or incomplete
- Environment variables not loaded
- Restart dev server

### Issue 3: "auth/invalid-credential"

**Solution:**
- Wrong email/password
- User doesn't exist (need to register first)
- Try registering a new account

### Issue 4: Login button does nothing

**Solution:**
- Check browser console for errors
- Check Firebase initialization in console
- Verify `.env.local` file

## ✅ Quick Fix Checklist

- [ ] `.env.local` file exists in project root
- [ ] All `VITE_` variables are set correctly
- [ ] Dev server restarted after creating/updating `.env.local`
- [ ] Browser console shows "Firebase initialized successfully"
- [ ] No errors in browser console
- [ ] Try registering first, then login

## 🚀 Test Steps

1. **Create .env.local** (if not exists):
   ```bash
   cd E:\Cursor\wintersale
   # Create .env.local file with Firebase config
   ```

2. **Restart server:**
   ```bash
   npm run dev
   ```

3. **Test Register:**
   - Go to `/register`
   - Create new account
   - Should auto-login

4. **Test Login:**
   - Go to `/login`
   - Use registered email/password
   - Should login successfully

## 📋 Debug Commands

```bash
# Check if .env.local exists
cd E:\Cursor\wintersale
if (Test-Path .env.local) { Write-Host "✅ .env.local exists" } else { Write-Host "❌ .env.local NOT found" }

# View .env.local content (first few lines)
Get-Content .env.local | Select-Object -First 10
```

## 🆘 Still Not Working?

1. **Check browser console** (F12) for specific errors
2. **Check terminal** for server errors
3. **Verify Firebase Console:**
   - Go to: https://console.firebase.google.com/
   - Select project: `parcel-delivery-c48d0`
   - Check Authentication → Sign-in method
   - Email/Password should be enabled

4. **Try Google Login:**
   - If email/password doesn't work, try Google login
   - This will help identify if it's a Firebase config issue

## ✅ Success Indicators

- ✅ Browser console: "Firebase initialized successfully"
- ✅ Browser console: "Auth service ready"
- ✅ Login page loads without errors
- ✅ Can register new account
- ✅ Can login with registered account
- ✅ User email shows in Navbar after login
