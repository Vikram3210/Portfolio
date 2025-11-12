import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import User from '../models/User.js';
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

// Get all projects (public)
router.get('/', optionalAuth, async (req, res) => {
  try {
    if (!checkDBConnection(res)) return;
    const projects = await Project.find().populate('userId', 'name email avatar');
    res.json({ success: true, projects });
  } catch (error) {
    console.error('Get projects error:', error);
    if (error.name === 'MongoServerError' || error.message.includes('MongoDB')) {
      return res.status(503).json({ 
        message: 'Database connection error',
        error: 'MongoDB connection not established'
      });
    }
    res.status(500).json({ message: error.message });
  }
});

// Get featured projects (public)
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true })
      .populate('userId', 'name email avatar')
      .limit(6);
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user's projects (protected)
router.get('/me', protect, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get projects by user ID (public)
router.get('/user/:userId', async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.userId })
      .populate('userId', 'name email avatar');
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('userId', 'name email avatar');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new project (protected)
router.post('/', protect, async (req, res) => {
  try {
    // Automatically set userId to logged-in user
    const projectData = {
      ...req.body,
      userId: req.user.id
    };

    const project = new Project(projectData);
    const savedProject = await project.save();

    // Add project to user's projects array
    const user = await User.findById(req.user.id);
    if (user) {
      user.projects.push(savedProject._id);
      await user.save();
    }

    res.status(201).json({ success: true, project: savedProject });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project (protected - only owner)
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user owns this project
    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    // Don't allow changing userId
    const { userId, ...updateData } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, project: updatedProject });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project (protected - only owner)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user owns this project
    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    // Remove project from user's projects array
    const user = await User.findById(project.userId);
    if (user) {
      user.projects = user.projects.filter(
        id => id.toString() !== project._id.toString()
      );
      await user.save();
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
