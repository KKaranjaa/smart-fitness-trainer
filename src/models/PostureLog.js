const mongoose = require('mongoose');

const postureLogSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  errorType: {
    type: String,
    enum: ['incorrect_back_angle', 'knee_overextension', 'elbow_position', 'hip_alignment', 'posture_state', 'general_form', 'other'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  bodyPart: {
    type: String
  },
  correctionGiven: {
    type: String
  },
  wasCorreted: {
    type: Boolean,
    default: false
  },
  poseData: {
    type: Object // Store the actual pose keypoints if needed
  }
});

module.exports = mongoose.model('PostureLog', postureLogSchema);
