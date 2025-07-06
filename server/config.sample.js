// config.sample.js - Sample configuration file
// Copy this file to .env in the server directory and update the values

/*
Create a .env file in the server directory with these variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-secret-key-here-please-change-this-in-production
NODE_ENV=development
UPLOAD_PATH=uploads
*/

module.exports = {
  // Sample configuration for reference
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-blog',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-here',
  NODE_ENV: process.env.NODE_ENV || 'development',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads'
}; 