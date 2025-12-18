# 🔧 MongoDB Connection Fix

## ⚠️ সমস্যা
"MongoDB connection required. Server is running but MongoDB needs to be configured."

## ✅ সমাধান (2টি Options)

### Option 1: MongoDB Configure করুন (Full Features)

#### Step 1: MongoDB Atlas Setup

1. **Browser-এ যান:** https://cloud.mongodb.com/
2. **Login করুন** (Google account দিয়ে)
3. **Project select করুন** (বা নতুন project তৈরি করুন)

#### Step 2: Network Access Allow করুন

1. **Network Access** tab-এ যান (বাম sidebar)
2. **"Add IP Address"** button click করুন
3. **"Allow Access from Anywhere"** select করুন
4. **IP Address:** `0.0.0.0/0` type করুন
5. **"Confirm"** click করুন

#### Step 3: Database User তৈরি করুন (যদি না থাকে)

1. **Database Access** tab-এ যান
2. **"Add New Database User"** click করুন
3. **Username:** `wintersaleDB` (বা আপনার username)
4. **Password:** `iVkts7UoZ8q7lsMD` (বা আপনার password)
5. **Database User Privileges:** "Read and write to any database"
6. **"Add User"** click করুন

#### Step 4: Connection String পান

1. **Database** tab-এ যান
2. **"Connect"** button click করুন
3. **"Connect your application"** select করুন
4. **Connection string copy করুন**

Format হবে:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
```

#### Step 5: .env File Update করুন

`server/.env` file-এ:

```env
PORT=5000
MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=puretastebd
JWT_SECRET=puretastebd_super_secret_jwt_key_2024
FRONTEND_URL=http://localhost:5173
```

**Important:** আপনার actual connection string use করুন!

#### Step 6: Server Restart করুন

```bash
cd E:\Cursor\wintersale\server
npm run dev
```

**Success হলে দেখবেন:**
```
✅ Connected to MongoDB successfully
✅ Database indexes created
✅ Initialized 6 products
🚀 Server running on port 5000
```

### Option 2: Quick Server Use করুন (MongoDB ছাড়া)

**যদি MongoDB setup করতে না চান:**

```bash
cd E:\Cursor\wintersale\server
npm run quick
```

**এটি server চালু করবে কিন্তু:**
- ⚠️ Auth features কাজ করবে না
- ⚠️ Database operations কাজ করবে না
- ✅ Server running থাকবে
- ✅ Health check কাজ করবে

## 🔍 Troubleshooting

### Error 1: "MongoServerError: bad auth"

**সমাধান:**
- Username/password check করুন
- Database user তৈরি করুন
- Connection string-এ correct credentials use করুন

### Error 2: "MongoServerError: IP not whitelisted"

**সমাধান:**
1. MongoDB Atlas → Network Access
2. "Add IP Address"
3. "Allow Access from Anywhere" (0.0.0.0/0)
4. Server restart করুন

### Error 3: "Connection timeout"

**সমাধান:**
- Internet connection check করুন
- MongoDB Atlas service status check করুন
- Connection string check করুন

### Error 4: "Database name not found"

**সমাধান:**
- `.env` file-এ `MONGODB_DB_NAME=puretastebd` check করুন
- Database name correct আছে কিনা verify করুন

## 📝 Quick Checklist

- [ ] MongoDB Atlas account আছে
- [ ] Network Access allow করেছি (0.0.0.0/0)
- [ ] Database user তৈরি করেছি
- [ ] Connection string copy করেছি
- [ ] `.env` file-এ `MONGODB_URI` update করেছি
- [ ] Server restart করেছি
- [ ] "Connected to MongoDB successfully" দেখেছি

## 🎯 Recommended: MongoDB Setup করুন

**Full features-এর জন্য MongoDB setup করুন:**

1. ✅ Network Access allow করুন
2. ✅ Connection string update করুন
3. ✅ Server restart করুন

**তাহলে:**
- ✅ User registration কাজ করবে
- ✅ User login কাজ করবে
- ✅ Products database-এ store হবে
- ✅ Orders save হবে

## 🆘 Still Having Issues?

1. **MongoDB Atlas Dashboard check করুন**
2. **Network Access tab check করুন**
3. **Connection string verify করুন**
4. **Server terminal-এ exact error message দেখুন**

## ✅ Success!

MongoDB connected হলে দেখবেন:
```
✅ Connected to MongoDB successfully
✅ Database indexes created
✅ Initialized 6 products
```

