const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['freelancer', 'employer'], required: true },
  profileData: {
    name: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
