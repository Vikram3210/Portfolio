import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Project from '../models/Project.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Helper function to check database connection
const checkDBConnection = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ 
      message: 'Database not connected. Please make sure MongoDB is running.',
      error: 'MongoDB connection not established'
    });
    return false;
  }
  return true;
};

// Get all users (public profiles)
router.get('/', async (req, res) => {
  try {
    if (!checkDBConnection(res)) return;
    const users = await User.find().select('-password').populate('projects');
    res.json({ success: true, users });
  } catch (error) {
    console.error('Get users error:', error);
    if (error.name === 'MongoServerError' || error.message.includes('MongoDB')) {
      return res.status(503).json({ 
        message: 'Database connection error',
        error: 'MongoDB connection not established'
      });
    }
    res.status(500).json({ message: error.message });
  }
});

// Get current user profile (protected)
router.get('/me', protect, async (req, res) => {
  try {
    if (!checkDBConnection(res)) return;
    const user = await User.findById(req.user.id).populate('projects');
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user profile error:', error);
    if (error.name === 'MongoServerError' || error.message.includes('MongoDB')) {
      return res.status(503).json({ 
        message: 'Database connection error',
        error: 'MongoDB connection not established'
      });
    }
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID (public profile)
router.get('/:id', async (req, res) => {
  try {
    if (!checkDBConnection(res)) return;
    const user = await User.findById(req.params.id).select('-password').populate('projects');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user by ID error:', error);
    if (error.name === 'MongoServerError' || error.message.includes('MongoDB')) {
      return res.status(503).json({ 
        message: 'Database connection error',
        error: 'MongoDB connection not established'
      });
    }
    res.status(500).json({ message: error.message });
  }
});

// Update current user profile (protected)
router.put('/me', protect, async (req, res) => {
  try {
    // Don't allow password update through this route
    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user by ID (protected - only own profile)
router.put('/:id', protect, async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    // Don't allow password update through this route
    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user skills (protected)
router.put('/me/skills', protect, async (req, res) => {
  try {
    const { skills } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { skills },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user certifications (protected)
router.put('/me/certifications', protect, async (req, res) => {
  try {
    const { certifications } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { certifications },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user education (protected)
router.put('/me/education', protect, async (req, res) => {
  try {
    const { education } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { education },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user experience (protected)
router.put('/me/experience', protect, async (req, res) => {
  try {
    const { experience } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { experience },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete current user account (protected)
router.delete('/me', protect, async (req, res) => {
  try {
    // Delete all projects associated with this user
    await Project.deleteMany({ userId: req.user.id });
    
    // Delete user
    await User.findByIdAndDelete(req.user.id);
    
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
