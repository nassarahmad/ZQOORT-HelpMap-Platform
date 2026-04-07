import mongoose from 'mongoose';
import config from '../config.js';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', err => console.error('❌ MongoDB Error:', err));
    mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB Disconnected'));
    
    return conn;
  } catch (error) {
    console.error('🔥 MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;