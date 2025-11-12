# Portfolio Project

A full-stack multi-user portfolio application built with React, TypeScript, Vite, Express.js, and MongoDB.

## Features

- 🚀 React 19 with TypeScript
- ⚡ Vite for fast development
- 🗄️ MongoDB for data storage
- 🔌 Express.js REST API
- 🔐 User Authentication (JWT)
- 👥 Multi-user support
- 📱 Responsive design ready
- 🎨 Modern UI components
- 🛡️ Secure password hashing
- 🔒 Protected routes and APIs

## Project Structure

```
porfolio/
├── server/                 # Backend server
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── src/                   # Frontend source
│   ├── services/          # API service functions
│   └── ...
└── package.json
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

## Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd porfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` file in the root directory
   - Add the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   VITE_API_URL=http://localhost:5000/api
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```
   
   **For MongoDB Atlas (Cloud):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   # Windows (if installed as service, it starts automatically)
   # Mac/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongodb
   ```

## Running the Application

### Development Mode

**Option 1: Run both frontend and backend separately**

Terminal 1 - Backend:
```bash
npm run dev:server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

**Option 2: Run both together** (requires `concurrently`)
```bash
npm run dev:all
```

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   npm run server
   ```

## MongoDB Setup

For detailed MongoDB setup instructions, see [MONGODB_SETUP.md](./MONGODB_SETUP.md)

### Quick Setup Options

**Local MongoDB:**
- Download and install from [MongoDB Website](https://www.mongodb.com/try/download/community)
- Default connection: `mongodb://localhost:27017/portfolio`

**MongoDB Atlas (Cloud):**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Update `.env` file

## Authentication

### Register a New User
1. Go to `/register`
2. Fill in name, email, and password
3. Click "Register"
4. You'll be automatically logged in

### Login
1. Go to `/login`
2. Enter your email and password
3. Click "Login"

### Access Dashboard
- After logging in, click "Dashboard" in navigation
- Manage your projects, skills, and certifications
- All data is user-specific and stored in MongoDB

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/user/:userId` - Get user by ID (public)

### Users (Protected Routes)
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `PUT /api/users/me/skills` - Update user skills
- `PUT /api/users/me/certifications` - Update user certifications
- `GET /api/users/:id` - Get user by ID (public)

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/me` - Get current user's projects (protected)
- `GET /api/projects/featured` - Get featured projects (public)
- `GET /api/projects/user/:userId` - Get projects by user ID (public)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected - owner only)
- `DELETE /api/projects/:id` - Delete project (protected - owner only)

### Health Check
- `GET /api/health` - Check server status

## Using the API in Your Components

```javascript
import { userAPI, projectAPI } from './services/api';

// Get all users
const users = await userAPI.getAllUsers();

// Get user by ID
const user = await userAPI.getUserById('user-id');

// Create a user
const newUser = await userAPI.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Full-stack developer',
  skills: ['React', 'Node.js', 'MongoDB']
});

// Get projects
const projects = await projectAPI.getAllProjects();

// Create a project
const newProject = await projectAPI.createProject({
  title: 'My Project',
  description: 'Project description',
  userId: 'user-id',
  technologies: ['React', 'Node.js'],
  featured: true
});
```

## Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
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
  skills: [String],
  projects: [ObjectId],
  createdAt: Date,
  updatedAt: Date
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
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
```

## Scripts

- `npm run dev` - Start Vite development server
- `npm run dev:server` - Start Express server with watch mode
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run server` - Start production server
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Express.js, Node.js
- **Database:** MongoDB with Mongoose
- **Tools:** ESLint, TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🚀 Deployment

### Quick Deploy (5 minutes)
See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for the fastest deployment steps.

### Full Deployment Guide
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Recommended Free Hosting Platforms

**Frontend:**
- [Vercel](https://vercel.com) - Best for React/Vite apps (recommended)
- [Netlify](https://netlify.com) - Great alternative

**Backend:**
- [Render](https://render.com) - Free tier available (recommended)
- [Railway](https://railway.app) - Good alternative

**Database:**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Free tier available

### Environment Variables for Production

**Frontend (Vercel/Netlify):**
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Backend (Render/Railway):**
```env
PORT=10000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-random-secret-string
FRONTEND_URL=https://your-frontend.vercel.app
```

## License

MIT
