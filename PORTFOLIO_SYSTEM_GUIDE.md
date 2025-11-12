# Complete Portfolio System Guide

## Overview

This is a complete MERN stack desktop application where students can create their personal portfolios. The application supports multiple users, each with their own portfolio that can be customized with personal details, education, skills, projects, experiences, and certifications.

## System Architecture

### Frontend (React + Vite)
- **Authentication**: Login/Register with JWT tokens
- **Protected Routes**: All portfolio pages require authentication
- **Dashboard**: Admin dashboard for managing portfolio content
- **Dynamic Display**: Portfolio pages display user data dynamically

### Backend (Express.js + MongoDB)
- **RESTful API**: Complete CRUD operations for all portfolio data
- **Authentication**: JWT-based authentication middleware
- **Database**: MongoDB with Mongoose ODM

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  bio: String,
  title: String,
  location: String,
  avatar: String (URL),
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
  education: [{
    institution: String (required),
    degree: String (required),
    field: String,
    startDate: String,
    endDate: String,
    grade: String,
    description: String,
    currentlyStudying: Boolean
  }],
  experience: [{
    company: String (required),
    position: String (required),
    location: String,
    startDate: String,
    endDate: String,
    description: String,
    responsibilities: [String],
    currentlyWorking: Boolean
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
  title: String (required),
  description: String (required),
  image: String (URL),
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
  category: String,
  userId: ObjectId (required, reference to User)
}
```

## API Routes

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/user/:userId` - Get user by ID (public)

### User Routes (`/api/users`)
- `GET /api/users/me` - Get current user profile (protected)
- `PUT /api/users/me` - Update current user profile (protected)
- `PUT /api/users/me/skills` - Update user skills (protected)
- `PUT /api/users/me/certifications` - Update user certifications (protected)
- `PUT /api/users/me/education` - Update user education (protected)
- `PUT /api/users/me/experience` - Update user experience (protected)
- `DELETE /api/users/me` - Delete user account (protected)

### Project Routes (`/api/projects`)
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/me` - Get current user's projects (protected)
- `GET /api/projects/user/:userId` - Get projects by user ID (public)
- `GET /api/projects/featured` - Get featured projects (public)
- `GET /api/projects/:id` - Get project by ID (public)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected, owner only)
- `DELETE /api/projects/:id` - Delete project (protected, owner only)

## Application Workflow

### 1. User Registration/Login
- Users must register or log in to access the application
- Authentication is required for all portfolio pages
- JWT tokens are stored in localStorage

### 2. Portfolio Data Entry
After logging in, users can fill in their portfolio data through the Admin Dashboard:

#### Personal Details
- Full Name
- Professional Title
- Bio/Description
- Location
- Profile Picture URL
- Social Links (GitHub, LinkedIn, Twitter, Website)

#### Education
- Institution Name
- Degree
- Field of Study
- Start/End Dates
- Grade/GPA
- Currently Studying checkbox
- Description

#### Experience
- Company Name
- Position/Job Title
- Location
- Start/End Dates
- Currently Working checkbox
- Description
- Key Responsibilities (multiple)

#### Skills
- Skill Name
- Proficiency Level (0-100%)

#### Projects
- Project Title
- Description
- Image URL
- Technologies Used
- GitHub URL
- Live Demo URL
- Featured checkbox

#### Certifications
- Certification Name
- Issuer
- Issue Date
- Expiry Date
- Credential ID
- Credential URL
- Image
- Description

### 3. Data Storage
- All data is saved to MongoDB
- Each user's data is isolated and secure
- Data is linked to the user's account via userId

### 4. Dynamic Portfolio Display
The portfolio pages automatically display user data:
- **Home Page**: Hero section with user info, featured projects, skills
- **About Page**: Bio, education, experience, social links
- **Gallery Page**: All user projects
- **Contact Page**: Contact information

## Components Structure

### Form Components
- `PersonalDetailsForm.jsx` - Edit personal information
- `EducationForm.jsx` - Add/Edit education entries
- `ExperienceForm.jsx` - Add/Edit experience entries
- `SkillsForm.jsx` - Add/Edit skills
- `ProjectForm.jsx` - Add/Edit projects
- `CertificationForm.jsx` - Add/Edit certifications

### Display Components
- `Home.jsx` - Main portfolio homepage
- `About.jsx` - About page with education and experience
- `Hero.jsx` - Hero section with user info
- `Projects.jsx` - Projects display
- `Skills.jsx` - Skills display
- `Gallery.jsx` - Projects gallery

### Management Components
- `AdminDashboard.jsx` - Main dashboard for managing all portfolio data
- `Login.jsx` - User login
- `Register.jsx` - User registration
- `ProtectedRoute.jsx` - Route protection wrapper
- `PublicRoute.jsx` - Public route wrapper (redirects authenticated users)

## Features

### ✅ Multi-User Support
- Each user has their own isolated portfolio
- Users can only edit their own data
- Secure authentication and authorization

### ✅ Complete CRUD Operations
- Create, Read, Update, Delete for all portfolio sections
- Real-time data updates
- Form validation

### ✅ Dynamic Portfolio Display
- Portfolio structure is predefined
- Content is dynamically loaded from database
- Responsive design

### ✅ Secure Authentication
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Protected frontend routes

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Start the Application
```bash
# Start both frontend and backend
npm run dev:all

# Or start separately:
npm run dev          # Frontend only
npm run dev:server   # Backend only
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Usage Instructions

1. **Register/Login**: Create an account or log in with existing credentials
2. **Access Dashboard**: Click on "Dashboard" in the navigation
3. **Fill Portfolio Data**:
   - Click "Edit Personal Details" to add basic info
   - Add Education entries
   - Add Experience entries
   - Add Skills
   - Add Projects
   - Add Certifications
4. **View Portfolio**: Navigate to Home, About, Gallery pages to see your portfolio

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT token authentication
- Protected API routes with middleware
- User data isolation
- Input validation and sanitization

## Future Enhancements

Potential features to add:
- Image upload functionality
- Portfolio themes/templates
- Export portfolio as PDF
- Public portfolio sharing links
- Analytics and views tracking
- Resume generation from portfolio data

