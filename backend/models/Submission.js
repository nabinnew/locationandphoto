const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  images: [String],
  facesDetected: Number,
  device: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", SubmissionSchema);
