import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    const maskedURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
    console.log(`🔌 Attempting to connect to MongoDB: ${maskedURI}`);
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected successfully!`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Failed:`);
    console.error(`   Error: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('timeout')) {
      console.error(`\n💡 Troubleshooting:`);
      console.error(`   1. If using local MongoDB: Make sure MongoDB service is running`);
      console.error(`   2. If using MongoDB Atlas: Check your connection string in .env`);
      console.error(`   3. Verify network access (for Atlas) or service status (for local)`);
    }
    
    console.error(`\n⚠️  Server will continue, but database operations will fail.`);
    return false;
  }
};

export default connectDB;

