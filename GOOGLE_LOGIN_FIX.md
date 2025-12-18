# 🔧 Google Login Fix Guide

## ❌ Problem: "গুগল লগইন ব্যর্থ / Google login failed"

## ✅ Solutions

### Step 1: Enable Google Sign-In in Firebase Console

1. **Go to Firebase Console:**
   - https://console.firebase.google.com/
   - Select project: `parcel-delivery-c48d0`

2. **Enable Google Provider:**
   - Click **Authentication** (left sidebar)
   - Click **Sign-in method** tab
   - Find **Google** in the list
   - Click on **Google**
   - Toggle **Enable** to ON
   - Select **Project support email** (your email)
   - Click **Save**

### Step 2: Check Authorized Domains

1. **In Firebase Console:**
   - Go to **Authentication** → **Settings** tab
   - Scroll to **Authorized domains** section
   - Make sure these domains are listed:
     - ✅ `localhost` (should be there by default)
     - ✅ Your production domain (when deploying)

2. **If `localhost` is missing:**
   - Click **Add domain**
   - Enter: `localhost`
   - Click **Add**

### Step 3: Check Browser Console

1. **Open Browser:** `http://localhost:5173/login`
2. **Press F12** to open Developer Tools
3. **Go to Console tab**
4. **Click "Login with Google" button**
5. **Check for specific error codes:**
   - `auth/popup-blocked` - Popup blocked by browser
   - `auth/popup-closed-by-user` - User closed popup
   - `auth/unauthorized-domain` - Domain not authorized
   - `auth/operation-not-allowed` - Google provider not enabled

### Step 4: Allow Popups

**If you see "auth/popup-blocked":**

1. **Chrome:**
   - Click the popup blocked icon in address bar
   - Click "Always allow popups from this site"
   - Reload page

2. **Firefox:**
   - Settings → Privacy & Security
   - Permissions → Pop-ups and redirects
   - Add exception for `localhost:5173`

3. **Edge:**
   - Settings → Cookies and site permissions
   - Pop-ups and redirects → Allow
   - Add `localhost:5173`

## 🔍 Common Issues & Fixes

### Issue 1: "auth/operation-not-allowed"

**Error:** Google provider not enabled in Firebase

**Fix:**
1. Firebase Console → Authentication → Sign-in method
2. Enable Google provider
3. Save

### Issue 2: "auth/unauthorized-domain"

**Error:** Domain not authorized

**Fix:**
1. Firebase Console → Authentication → Settings
2. Authorized domains → Add `localhost`
3. Save

### Issue 3: "auth/popup-blocked"

**Error:** Browser blocking popup

**Fix:**
1. Allow popups for `localhost:5173`
2. Check browser settings
3. Try different browser

### Issue 4: "auth/popup-closed-by-user"

**Error:** User closed popup window

**Fix:**
- This is normal if user closes popup
- Just try again and don't close the popup

## ✅ Quick Checklist

- [ ] Google Sign-In enabled in Firebase Console
- [ ] Project support email selected
- [ ] `localhost` in authorized domains
- [ ] Browser popups allowed
- [ ] No console errors
- [ ] Firebase initialized successfully

## 🧪 Test Steps

1. **Check Firebase Console:**
   - Authentication → Sign-in method
   - Google → Enabled ✅

2. **Test Google Login:**
   - Go to `/login`
   - Click "Login with Google"
   - Popup should open
   - Select Google account
   - Should login successfully

3. **Check Browser Console:**
   - F12 → Console
   - Should see: "✅ Google login successful"

## 🆘 Still Not Working?

1. **Clear browser cache:**
   - Ctrl+Shift+Delete
   - Clear cache and cookies
   - Reload page

2. **Try incognito/private mode:**
   - This eliminates extension conflicts

3. **Check Firebase project:**
   - Make sure you're using correct project
   - Project ID: `parcel-delivery-c48d0`

4. **Verify .env.local:**
   - Check all Firebase config values
   - Restart dev server after changes

## 📋 Firebase Console Checklist

- [ ] Project: `parcel-delivery-c48d0`
- [ ] Authentication → Sign-in method → Google → **Enabled**
- [ ] Project support email selected
- [ ] Authentication → Settings → Authorized domains → `localhost` present
- [ ] Web app registered in Firebase project

## ✅ Success Indicators

- ✅ Google login button works
- ✅ Popup opens
- ✅ Can select Google account
- ✅ Login successful
- ✅ User email shows in Navbar
- ✅ No console errors
