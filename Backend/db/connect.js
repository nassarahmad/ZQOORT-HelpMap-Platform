const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};