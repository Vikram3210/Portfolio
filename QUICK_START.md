# Quick Start Guide - Multi-User Portfolio

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
JWT_SECRET=your-secret-key-change-in-production
```

### 3. Start MongoDB
- **Local**: Make sure MongoDB is running
- **Atlas**: Update MONGODB_URI with your connection string

### 4. Start Application
```bash
npm run dev:all
```

### 5. Create Your Account
1. Go to http://localhost:5173/register
2. Fill in your details
3. Click "Register"
4. Start adding your portfolio content!

## 📝 What's New

### Multi-User System
- ✅ User registration and login
- ✅ JWT authentication
- ✅ User-specific portfolios
- ✅ Protected dashboard
- ✅ MongoDB integration

### Features
- ✅ Each user has their own:
  - Projects
  - Skills
  - Certifications
  - Profile information

### Security
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens
- ✅ Protected API routes
- ✅ User data isolation

## 🔧 Troubleshooting

### Server Won't Start
1. Check if port 5000 is in use
2. Kill existing processes: `taskkill /F /IM node.exe` (Windows)
3. Restart: `npm run dev:server`

### MongoDB Connection Failed
1. Check if MongoDB is running
2. Verify MONGODB_URI in `.env`
3. For Atlas: Check network access and credentials

### Packages Not Found
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- **Full Setup**: See `MULTI_USER_SETUP.md`
- **MongoDB Setup**: See `MONGODB_SETUP.md`
- **API Documentation**: See `README.md`

## 🎯 Next Steps

1. ✅ Register your account
2. ✅ Add your projects
3. ✅ Add your skills
4. ✅ Add certifications
5. ✅ Customize your profile
6. ✅ Share your portfolio!

Happy building! 🎉



