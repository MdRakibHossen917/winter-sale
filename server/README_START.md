# 🚀 Server Start - Quick Guide

## ⚡ Fast Start

```bash
npm run dev
```

## 📋 Full Steps

1. Open Terminal/PowerShell
2. Navigate: `cd E:\Cursor\wintersale\server`
3. Start: `npm run dev`
4. Wait for: "🚀 Server running on port 5000"
5. **Don't close this terminal!**

## ✅ Success Message

You should see:
```
✅ Connected to MongoDB successfully
🚀 Server running on port 5000
```

## 🔍 Troubleshooting

### MongoDB Error?
- Go to: https://cloud.mongodb.com/
- Network Access → Add IP Address
- Allow: 0.0.0.0/0 (Anywhere)

### Port Error?
- Change PORT in `.env` file
- Or kill process using port 5000

## 🧪 Test

Browser: `http://localhost:5000/health`

Expected: `{"success":true,"message":"Server is running"}`

