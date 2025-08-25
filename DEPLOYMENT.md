# 🚀 Deployment Guide for Token of Thanks

This guide will help you deploy your Token of Thanks application to Vercel (Frontend) and Railway (Backend).

## 📋 Prerequisites

- [Git](https://git-scm.com/) installed
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Vercel CLI](https://vercel.com/cli) (for frontend)
- [Railway account](https://railway.app/) (for backend)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (for database)

## 🎯 Step 1: Backend Deployment (Railway)

### 1.1 Prepare Backend
```bash
cd backend
npm install
```

### 1.2 Deploy to Railway

1. **Go to [Railway.app](https://railway.app/)**
2. **Sign up/Login** with your GitHub account
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select your repository** and the `backend` folder
5. **Add Environment Variables** (copy from `env.production`):
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong secret (use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
   - `FRONTEND_URL`: Your Vercel frontend URL (add after frontend deployment)
   - Email configuration (choose one option)

### 1.3 MongoDB Atlas Setup
1. **Create Cluster** in MongoDB Atlas
2. **Create Database User** with read/write permissions
3. **Get Connection String** and replace in `MONGODB_URI`
4. **Whitelist IP** (use `0.0.0.0/0` for Railway)

### 1.4 Get Railway URL
After deployment, copy your Railway app URL (e.g., `https://your-app.railway.app`)

## 🎨 Step 2: Frontend Deployment (Vercel)

### 2.1 Prepare Frontend
```bash
cd frontend
npm install
```

### 2.2 Update API URL
Edit `env.production` and replace:
```
REACT_APP_API_URL=https://your-railway-backend-url.railway.app
```

### 2.3 Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Vercel Dashboard
1. **Go to [Vercel.com](https://vercel.com/)**
2. **Sign up/Login** with your GitHub account
3. **Import Project** → Select your repository
4. **Configure Project**:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
5. **Add Environment Variables**:
   - `REACT_APP_API_URL`: Your Railway backend URL
6. **Deploy**

### 2.4 Update Backend CORS
After getting your Vercel URL, update the `FRONTEND_URL` in Railway environment variables and redeploy.

## 🔧 Step 3: Final Configuration

### 3.1 Test Your Deployment
1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test health endpoint: `https://your-backend.railway.app/api/health`
3. **Create Account**: Test user registration and login
4. **Send Tokens**: Test token sending functionality

### 3.2 Environment Variables Summary

#### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend.railway.app
```

#### Backend (Railway)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
FRONTEND_URL=https://your-frontend.vercel.app
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` in backend matches exactly
   - Check for trailing slashes

2. **MongoDB Connection Issues**
   - Verify connection string format
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Email Not Working**
   - For Gmail: Enable 2FA and use App Password
   - Check email credentials in Railway environment

4. **Build Failures**
   - Ensure all dependencies are in `package.json`
   - Check Node.js version compatibility

### Performance Optimization

1. **Frontend**:
   - Vercel automatically optimizes with CDN
   - Static assets are cached globally
   - Automatic HTTPS and compression

2. **Backend**:
   - Railway provides auto-scaling
   - Health checks ensure reliability
   - Automatic restarts on failures

## 📊 Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Real user metrics
- Error tracking

### Railway Monitoring
- Resource usage
- Response times
- Error logs

## 🔒 Security Checklist

- [ ] Strong JWT secret
- [ ] MongoDB Atlas with proper authentication
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] HTTPS enabled (automatic on both platforms)

## 🎉 Success!

Your Token of Thanks application is now deployed and accessible worldwide!

**Frontend**: `https://your-app.vercel.app`
**Backend**: `https://your-app.railway.app`
**Database**: MongoDB Atlas (managed)

## 📞 Support

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Railway**: [railway.app/docs](https://railway.app/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com/)
