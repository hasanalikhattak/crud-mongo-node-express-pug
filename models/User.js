const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  cgpa: {
    type: Number,
    trim: true,
    min: 0.0,
    max: 4.0,
  },
  course: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  updated: { 
    type: Date, 
    default: Date.now 
  },
  password: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model('User', userSchema);