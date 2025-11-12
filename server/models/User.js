import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  bio: {
    type: String,
    trim: true,
    default: ''
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  avatar: {
    type: String,
    trim: true,
    default: ''
  },
  socialLinks: {
    github: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    twitter: { type: String, trim: true, default: '' },
    website: { type: String, trim: true, default: '' }
  },
  skills: [{
    name: { type: String, trim: true },
    level: { type: Number, min: 0, max: 100, default: 50 }
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  certifications: [{
    name: { type: String, trim: true },
    issuer: { type: String, trim: true },
    issueDate: { type: String, trim: true },
    expiryDate: { type: String, trim: true, default: '' },
    credentialId: { type: String, trim: true, default: '' },
    credentialUrl: { type: String, trim: true, default: '' },
    image: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' }
  }],
  education: [{
    institution: { type: String, trim: true, required: true },
    degree: { type: String, trim: true, required: true },
    field: { type: String, trim: true, default: '' },
    startDate: { type: String, trim: true, default: '' },
    endDate: { type: String, trim: true, default: '' },
    grade: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    currentlyStudying: { type: Boolean, default: false }
  }],
  experience: [{
    company: { type: String, trim: true, required: true },
    position: { type: String, trim: true, required: true },
    location: { type: String, trim: true, default: '' },
    startDate: { type: String, trim: true, default: '' },
    endDate: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    responsibilities: [{ type: String, trim: true }],
    currentlyWorking: { type: Boolean, default: false }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    this.updatedAt = Date.now();
    return next();
  }

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;

