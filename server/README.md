# PureTasteBD Backend API

Node.js backend server for PureTasteBD e-commerce platform.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Create `.env` file in `server/` folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=puretastebd
JWT_SECRET=your_super_secret_jwt_key_change_this
FRONTEND_URL=http://localhost:5173
```

### 3. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on: `http://localhost:5000`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin, protected)
- `PUT /api/products/:id` - Update product (admin, protected)
- `DELETE /api/products/:id` - Delete product (admin, protected)

### Orders

- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/my-orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status

## 📝 Example API Calls

### Register User

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "01300981501"
}
```

### Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Products

```bash
GET http://localhost:5000/api/products
```

### Create Order

```bash
POST http://localhost:5000/api/orders
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "items": [
    {
      "id": 1,
      "name": "Shorisher Tel",
      "quantity": 2,
      "price": 450
    }
  ],
  "totalAmount": 900,
  "customerName": "John Doe",
  "customerEmail": "user@example.com",
  "customerPhone": "01300981501",
  "customerAddress": "123 Main St",
  "city": "Dhaka"
}
```

## 🔒 Authentication

Most endpoints require authentication. Include JWT token in header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📦 Database

- **Users**: Stored in `users` collection
- **Products**: Stored in `products` collection
- **Orders**: Stored in `orders` collection

## 🛠️ Development

- Uses ES6 modules
- MongoDB for database
- JWT for authentication
- Express.js for API

## 📖 Next Steps

1. Update frontend to use these API endpoints
2. Add SSL Commerce payment integration
3. Add email notifications
4. Add admin dashboard

