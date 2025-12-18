# Backend Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Create `.env` File

Create a `.env` file in the `server/` folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=puretastebd
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
FRONTEND_URL=http://localhost:5173
```

### 3. Start Backend Server

**Development (with auto-reload):**
```bash
cd server
npm run dev
```

**Production:**
```bash
cd server
npm start
```

Server will run on: `http://localhost:5000`

### 4. Start Frontend

In a new terminal:
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "phone": "01300981501"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user (requires token)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders

- `POST /api/orders` - Create new order (requires token)
- `GET /api/orders/my-orders` - Get user orders (requires token)

## 🔒 Authentication

After login/register, you'll receive a JWT token. Include it in requests:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📦 Database

All data is stored in MongoDB:
- **Users**: Email, password (hashed), name, phone, address
- **Products**: All product information
- **Orders**: Order details, customer info, status

## ✅ Testing

1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm run dev`
3. Go to `http://localhost:5173`
4. Register a new account
5. Login with your credentials

## 🛠️ Troubleshooting

### MongoDB Connection Error
- Check your MongoDB URI in `.env`
- Ensure MongoDB Atlas allows connections from your IP

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using port 5000

### CORS Error
- Make sure `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://localhost:5173`

## 📝 Next Steps

1. ✅ Backend is ready
2. ✅ Frontend is connected
3. ⏳ Add SSL Commerce payment integration
4. ⏳ Add email notifications
5. ⏳ Add admin dashboard

