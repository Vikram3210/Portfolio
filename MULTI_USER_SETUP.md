# Multi-User Portfolio System - Setup Guide

## Overview

This portfolio application now supports multiple users! Each user can:
- Create their own account
- Manage their own portfolio (projects, skills, certifications)
- View their personalized portfolio
- Access their admin dashboard to manage content

## Features

### ✅ Authentication System
- **User Registration**: Users can create accounts with name, email, and password
- **User Login**: Secure login with JWT tokens
- **Protected Routes**: Dashboard is protected and requires authentication
- **Password Security**: Passwords are hashed using bcrypt

### ✅ User-Specific Data
- Each user has their own:
  - Projects
  - Skills (with proficiency levels)
  - Certifications
  - Profile information (bio, title, avatar, social links)

### ✅ MongoDB Integration
- All data is stored in MongoDB
- User data is isolated per user
- Projects are linked to users
- Skills and certifications are stored in user profiles

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `mongoose` - MongoDB ODM
- `express` - Backend framework
- `react-router-dom` - Frontend routing
- And other dependencies

### 2. Set Up MongoDB

#### Option A: Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Update `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

### 3. Configure Environment Variables

Create/update `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important**: Change `JWT_SECRET` to a strong random string in production!

### 4. Start the Application

```bash
# Start both frontend and backend
npm run dev:all

# Or start separately:
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

## Usage Guide

### For Users

#### 1. Register a New Account
1. Go to http://localhost:5173/register
2. Fill in:
   - Name
   - Email
   - Password (min 6 characters)
   - Confirm Password
3. Click "Register"
4. You'll be automatically logged in and redirected to the homepage

#### 2. Login
1. Go to http://localhost:5173/login
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to your portfolio

#### 3. Access Dashboard
1. After logging in, click "Dashboard" in the navigation
2. Or go to http://localhost:5173/admin
3. Manage your:
   - **Projects**: Add, edit, delete projects
   - **Skills**: Add skills with proficiency levels
   - **Certifications**: Add certifications with details

#### 4. View Your Portfolio
- Homepage shows your featured projects and skills
- Gallery shows all your projects
- Your name appears in the navigation when logged in

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/user/:userId` - Get user by ID (public)

#### Users
- `GET /api/users/me` - Get current user profile (protected)
- `PUT /api/users/me` - Update current user profile (protected)
- `PUT /api/users/me/skills` - Update user skills (protected)
- `PUT /api/users/me/certifications` - Update user certifications (protected)
- `GET /api/users/:id` - Get user by ID (public)

#### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/me` - Get current user's projects (protected)
- `GET /api/projects/featured` - Get featured projects (public)
- `GET /api/projects/user/:userId` - Get projects by user ID (public)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected - owner only)
- `DELETE /api/projects/:id` - Delete project (protected - owner only)

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  bio: String,
  title: String,
  location: String,
  avatar: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    website: String
  },
  skills: [{
    name: String,
    level: Number (0-100)
  }],
  certifications: [{
    name: String,
    issuer: String,
    issueDate: String,
    expiryDate: String,
    credentialId: String,
    credentialUrl: String,
    image: String,
    description: String
  }],
  projects: [ObjectId] // References to Project documents
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  image: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
  category: String,
  userId: ObjectId, // Reference to User
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 12
2. **JWT Tokens**: Authentication uses JWT tokens stored in localStorage
3. **Protected Routes**: API routes require authentication tokens
4. **User Isolation**: Users can only modify their own data
5. **Password Validation**: Minimum 6 characters required

## Troubleshooting

### MongoDB Connection Error
```
Error connecting to MongoDB: connect ECONNREFUSED
```
**Solution**: 
- Make sure MongoDB is running
- Check MongoDB connection string in `.env`
- For Atlas, verify network access and credentials

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
- Kill existing node processes: `taskkill /F /IM node.exe` (Windows)
- Or change PORT in `.env` file

### Packages Not Found
```
Cannot find package 'bcryptjs'
```
**Solution**:
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET in `.env` is set
- Verify token is being sent in API requests

## Next Steps

1. **Set up MongoDB**: Choose local or Atlas
2. **Configure Environment**: Update `.env` with your settings
3. **Start Servers**: Run `npm run dev:all`
4. **Register Account**: Create your first user account
5. **Add Content**: Use the dashboard to add projects, skills, and certifications
6. **Customize**: Update your profile information

## Production Deployment

Before deploying to production:

1. **Change JWT_SECRET**: Use a strong, random secret
2. **Set up MongoDB Atlas**: Use cloud database
3. **Configure CORS**: Update FRONTEND_URL in `.env`
4. **Enable HTTPS**: Use SSL certificates
5. **Environment Variables**: Set in your hosting platform
6. **Build Frontend**: Run `npm run build`
7. **Deploy Backend**: Deploy to services like Heroku, Render, or AWS

## Support

If you encounter any issues:
1. Check the terminal for error messages
2. Verify MongoDB is running and accessible
3. Check environment variables are set correctly
4. Ensure all dependencies are installed
5. Check browser console for frontend errors

Happy coding! 🚀

