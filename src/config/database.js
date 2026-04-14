const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.error(`⚠️ Server will continue running without database`);
    console.error(`\n🔧 TO FIX THIS:`);
    console.error(`1. Go to https://cloud.mongodb.com`);
    console.error(`2. Click "Network Access" → Add IP → Allow from Anywhere`);
    console.error(`3. Wait 2-3 minutes and restart server\n`);
    // DON'T EXIT - Let server continue
  }
};

module.exports = connectDB;