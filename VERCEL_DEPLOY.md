# Vercel Deployment Guide

## Step 1: Push to GitHub
Make sure all your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "Add New Project"
4. Import your GitHub repository (`winter-sale`)
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`

### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

### Frontend Environment Variables:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_MONGODB_URI=your-mongodb-connection-string
VITE_MONGODB_DB_NAME=puretastebd
```

### Important Notes:
- Replace `your-backend-url` with your actual backend API URL
- If your backend is also on Vercel, use that URL
- If backend is on a different server, use that server's URL
- All environment variables must start with `VITE_` to be accessible in the frontend

## Step 4: Backend Deployment (Separate)

Your backend (`server/` folder) needs to be deployed separately:

### Option 1: Deploy Backend to Vercel (Serverless Functions)
- Create a separate Vercel project for the backend
- Or use Vercel Serverless Functions

### Option 2: Deploy Backend to Railway/Render/Heroku
- These platforms are better suited for Node.js backends
- Set up environment variables there:
  - `PORT=5000`
  - `MONGODB_URI=your-mongodb-uri`
  - `MONGODB_DB_NAME=puretastebd`
  - `JWT_SECRET=your-jwt-secret`
  - `FRONTEND_URL=https://your-frontend.vercel.app`

## Step 5: Update API URL

After deploying backend, update `VITE_API_URL` in Vercel environment variables to point to your backend URL.

## Step 6: Redeploy

After setting environment variables, redeploy your project:
- Vercel Dashboard → Deployments → Click "Redeploy"
- Or push a new commit to trigger automatic deployment

## Troubleshooting

### Build Fails:
- Check that `npm install --legacy-peer-deps` is used
- Verify all dependencies are in `package.json`

### API Calls Fail:
- Check `VITE_API_URL` is set correctly
- Verify CORS is enabled on backend
- Check backend is running and accessible

### Routing Issues:
- The `vercel.json` file includes rewrites for React Router
- All routes should redirect to `index.html`

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

