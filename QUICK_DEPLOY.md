# ⚡ Quick Deployment Steps

## 🎯 Fastest Way to Deploy (5 minutes)

### 1. MongoDB Atlas Setup (2 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up → Create FREE cluster
3. Database Access → Add user (save password!)
4. Network Access → Allow from anywhere (0.0.0.0/0)
5. Database → Connect → Copy connection string
6. Replace `<password>` in connection string

### 2. Deploy Backend - Render (2 min)
1. Go to https://render.com → Sign up with GitHub
2. New + → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build:** `cd server && npm install`
   - **Start:** `cd server && node index.js`
   - **Plan:** Free
5. Environment Variables:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=any-random-string-here
   FRONTEND_URL=https://your-frontend.vercel.app
   PORT=10000
   NODE_ENV=production
   ```
6. Deploy → Copy URL (e.g., `https://portfolio-backend.onrender.com`)

### 3. Deploy Frontend - Vercel (1 min)
1. Go to https://vercel.com → Sign up with GitHub
2. New Project → Import repo
3. Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
4. Deploy!

### 4. Update Backend CORS
- Go back to Render
- Update `FRONTEND_URL` with your Vercel URL
- Redeploy backend

## ✅ Done! Your portfolio is live!

---

## 🔧 Alternative Platforms

**Frontend:**
- Netlify (similar to Vercel)
- GitHub Pages (static only)

**Backend:**
- Railway (similar to Render)
- Fly.io (good free tier)

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

