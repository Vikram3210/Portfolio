import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please make sure MongoDB is running.',
        error: 'MongoDB connection not established'
      });
    }

    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({ 
        message: 'Not authorized to access this route',
        error: 'No token provided'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ 
          message: 'Not authorized, user not found',
          error: 'Invalid token'
        });
      }

      next();
    } catch (error) {
      // Handle JWT errors
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Not authorized, token failed',
          error: 'Invalid token'
        });
      }
      // Handle database errors
      if (error.name === 'MongoServerError' || error.message.includes('MongoDB')) {
        return res.status(503).json({ 
          message: 'Database connection error',
          error: 'MongoDB connection not established'
        });
      }
      return res.status(401).json({ 
        message: 'Not authorized, token failed',
        error: error.message
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Optional auth - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    // If database is not connected, continue without user
    if (mongoose.connection.readyState !== 1) {
      req.user = null;
      return next();
    }

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
        req.user = await User.findById(decoded.id).select('-password');
      } catch (error) {
        // Token invalid, but continue without user
        req.user = null;
      }
    }

    next();
  } catch (error) {
    // Continue without user on any error
    req.user = null;
    next();
  }
};

