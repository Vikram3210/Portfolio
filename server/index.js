import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

// Load environment variables
// Try to load from server/.env first, then fall back to root .env
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if server/.env exists, otherwise use root .env
const envPath = existsSync(join(__dirname, '.env')) 
  ? join(__dirname, '.env')
  : join(__dirname, '..', '.env');

dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB (non-blocking)
connectDB().catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware
// Middleware
// app.use(cors({
//   origin: [
//     process.env.FRONTEND_URL || 'http://localhost:5173',
//     'https://portfolio-two-azure-92.vercel.app',
//     'https://portfolio-frontend.vercel.app'
//   ],
//   credentials: true
// }));

const allowedBaseDomains = [
  'portfolio-two-azure-92.vercel.app',
  'www.portfolio-two-azure-92.vercel.app',
  'localhost'
];

// Helper to check if the request origin is allowed
const isAllowedOrigin = (origin) => {
  if (!origin) return true; // Allow requests like Postman / server-to-server
  try {
    const url = new URL(origin);
    const hostname = url.hostname;

    // ✅ Allow from known base domains
    if (allowedBaseDomains.includes(hostname)) return true;

    // ✅ Allow any preview subdomain from Vercel ending with 'vercel.app'
    if (hostname.endsWith('vercel.app') && hostname.includes('project-mate')) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      projects: '/api/projects'
    },
    frontend: process.env.FRONTEND_URL || 'http://localhost:5173'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Don't log sensitive information like MongoDB URI
  const mongoURI = process.env.MONGODB_URI;
  if (mongoURI) {
    // Mask the connection string for security
    const maskedURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
    console.log(`MongoDB: Connected to ${maskedURI.split('@')[1] || 'database'}`);
  } else {
    console.log(`MongoDB: Using default local connection`);
  }
});

