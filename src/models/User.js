const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fitnessLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  weight: { type: Number }, // in kg
  height: { type: Number }, // in cm
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  loginCount: { type: Number, default: 0 },
  fitnessGoals: { type: String },
  assignedTrainer: { type: String, default: 'Eugene Mogare' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastActive: { type: Date, default: Date.now },
  notes: [{ 
    date: { type: Date, default: Date.now },
    content: { type: String },
    trainer: { type: String, default: 'Eugene Mogare' }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
