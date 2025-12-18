# PureTasteBD - Backend API

Node.js backend with MongoDB for PureTasteBD e-commerce platform.

## ✅ সম্পন্ন হয়েছে / Completed

1. ✅ Node.js backend server তৈরি
2. ✅ MongoDB database connection
3. ✅ User authentication (Register, Login)
4. ✅ JWT token-based authentication
5. ✅ Products API
6. ✅ Orders API
7. ✅ Frontend integration

## 🚀 শুরু করার জন্য / Quick Start

### 1. Backend Server চালু করুন

```bash
cd server
npm install
```

### 2. `.env` file তৈরি করুন

`server/.env` file তৈরি করুন:

```env
PORT=5000
MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=puretastebd
JWT_SECRET=your_super_secret_jwt_key_change_this
FRONTEND_URL=http://localhost:5173
```

### 3. Server চালু করুন

```bash
cd server
npm run dev
```

Server চলবে: `http://localhost:5000`

### 4. Frontend চালু করুন

নতুন terminal-এ:

```bash
npm run dev
```

Frontend চলবে: `http://localhost:5173`

## 📡 API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "phone": "01300981501"
  }
  ```

- **Login**: `POST /api/auth/login`
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Get Current User**: `GET /api/auth/me` (requires token)

### Products

- **Get All Products**: `GET /api/products`
- **Get Product by ID**: `GET /api/products/:id`

### Orders

- **Create Order**: `POST /api/orders` (requires token)
- **Get My Orders**: `GET /api/orders/my-orders` (requires token)

## 🔒 Authentication

Login/Register করার পর JWT token পাবেন। API request-এ token পাঠাতে হবে:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📦 Database

MongoDB-তে সব data store হবে:
- **Users**: Email, password (hashed), name, phone, address
- **Products**: সব product information
- **Orders**: Order details, customer info, status

## ✅ Testing

1. Backend চালু করুন: `cd server && npm run dev`
2. Frontend চালু করুন: `npm run dev`
3. Browser-এ যান: `http://localhost:5173`
4. Register করুন নতুন account
5. Login করুন আপনার credentials দিয়ে

## 🎯 এখন কি করতে হবে?

1. ✅ Backend ready
2. ✅ Frontend connected
3. ⏳ SSL Commerce payment integration
4. ⏳ Email notifications
5. ⏳ Admin dashboard

## 📝 Notes

- Backend port: `5000`
- Frontend port: `5173`
- MongoDB Atlas connection string already configured
- JWT token expires in 7 days

