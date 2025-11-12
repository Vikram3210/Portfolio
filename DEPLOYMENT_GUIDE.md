# 🚀 Portfolio Deployment Guide

This guide will help you deploy your portfolio application to free hosting platforms.

## 📋 Prerequisites

1. **GitHub Account** - For version control and deployment
2. **MongoDB Atlas Account** - Free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Git installed** on your computer

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/login
2. Create a new cluster (choose the FREE tier)
3. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Choose **Password** authentication
   - Save the username and password securely
4. Whitelist IP addresses:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (for free hosting) or add specific IPs
5. Get your connection string:
   - Go to **Database** → **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`

---

## 🎨 Step 2: Deploy Frontend (Vercel - Recommended)

### Option A: Vercel (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up with GitHub
   - Click **New Project**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `./` (leave as is)
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add Environment Variable:
     - **Name:** `VITE_API_URL`
     - **Value:** `https://your-backend-url.onrender.com/api` (update after backend deployment)
   - Click **Deploy**

3. **Update vercel.json** with your actual backend URL after deployment

### Option B: Netlify

1. **Push code to GitHub** (same as above)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up with GitHub
   - Click **New site from Git**
   - Select your repository
   - Configure:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Add Environment Variable:
     - **Key:** `VITE_API_URL`
     - **Value:** `https://your-backend-url.onrender.com/api`
   - Click **Deploy site**

3. **Update netlify.toml** with your actual backend URL

---

## ⚙️ Step 3: Deploy Backend (Render - Recommended)

### Option A: Render (Free Tier Available)

1. **Push server code to GitHub** (if not already done)

2. **Deploy to Render:**
   - Go to [render.com](https://render.com) and sign up with GitHub
   - Click **New +** → **Web Service**
   - Connect your repository
   - Configure:
     - **Name:** `portfolio-backend`
     - **Environment:** `Node`
     - **Root Directory:** `server` ⚠️ **IMPORTANT: Set this!**
     - **Build Command:** `npm install` (leave empty or use this)
     - **Start Command:** `npm start` (or `node index.js`)
     - **Plan:** Free
   - Add Environment Variables:
     - `NODE_ENV` = `production`
     - `PORT` = `10000` (Render uses this port)
     - `MONGODB_URI` = Your MongoDB Atlas connection string
     - `JWT_SECRET` = Generate a random string (e.g., use `openssl rand -base64 32`)
     - `FRONTEND_URL` = Your Vercel/Netlify frontend URL
   - Click **Create Web Service**

3. **Wait for deployment** (first deploy takes 5-10 minutes)

4. **Copy your backend URL** (e.g., `https://portfolio-backend.onrender.com`)

### Option B: Railway

1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Railway will auto-detect Node.js
5. Add Environment Variables (same as Render)
6. Deploy!

---

## 🔄 Step 4: Update Frontend with Backend URL

After backend is deployed:

1. **Vercel:**
   - Go to your project → **Settings** → **Environment Variables**
   - Update `VITE_API_URL` with your Render backend URL
   - Redeploy (Settings → Deployments → Redeploy)

2. **Netlify:**
   - Go to **Site settings** → **Environment variables**
   - Update `VITE_API_URL`
   - Trigger a new deployment

3. **Update configuration files:**
   - Update `vercel.json` or `netlify.toml` with your backend URL
   - Commit and push changes

---

## ✅ Step 5: Verify Deployment

1. **Test Frontend:**
   - Visit your Vercel/Netlify URL
   - Try to register/login

2. **Test Backend:**
   - Visit `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

3. **Test Full Flow:**
   - Register a new user
   - Login
   - Add projects/skills
   - View your portfolio

---

## 🔧 Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist (allow all IPs for free hosting)
- Verify connection string has correct password
- Check MongoDB Atlas cluster is running

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check backend CORS configuration in `server/index.js`

### Environment Variables Not Working
- Restart/redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)
- For Vite, variables must start with `VITE_`

### Build Failures
- Check build logs in hosting platform
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

---

## 📝 Quick Reference

### Environment Variables Summary

**Frontend (Vercel/Netlify):**
- `VITE_API_URL` = Your backend API URL

**Backend (Render/Railway):**
- `PORT` = 10000 (Render) or auto (Railway)
- `MONGODB_URI` = MongoDB Atlas connection string
- `JWT_SECRET` = Random secret string
- `FRONTEND_URL` = Your frontend URL
- `NODE_ENV` = production

---

## 🎉 You're Done!

Your portfolio is now live! Share your URL with the world.

**Next Steps:**
- Customize your portfolio content
- Add your projects and skills
- Update social links
- Share your portfolio URL!

---

## 💡 Tips

1. **Free Tier Limitations:**
   - Render: Services sleep after 15 minutes of inactivity (first request may be slow)
   - Railway: Limited hours per month on free tier
   - MongoDB Atlas: 512MB storage, shared cluster

2. **Performance:**
   - Consider upgrading to paid tiers for better performance
   - Use CDN for static assets (Vercel/Netlify provide this automatically)

3. **Security:**
   - Never commit `.env` files to GitHub
   - Use strong JWT secrets
   - Keep MongoDB credentials secure

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

