const mongoose = require('mongoose');



module.exports. connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};