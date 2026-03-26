const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  machineId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Cardio', 'Strength', 'Flexibility', 'Other'],
    required: true
  },
  qrCode: {
    type: String,
    required: true,
    unique: true
  },
  instructions: {
    type: String
  },
  targetMuscles: [String],
  safetyGuidelines: [String],
  arModelUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Machine', machineSchema);
