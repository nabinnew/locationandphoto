const Submission = require("../models/Submission");
const cloudinary = require("../config/cloudinary");

// Utility function to generate "faces" according to current time
function generateFaces() {
  const seconds = new Date().getSeconds();
  return (seconds % 4) + 1; // 1–4
}

// Store new submission
exports.store = async (req, res) => {
  try {
    const { latitude, longitude, images, device } = req.body;

    if (!latitude || !longitude || !images || images.length !== 4) {
      return res.status(400).json({ message: "Invalid data. Need 4 images and location." });
    }

    const uploadedImages = [];
    const faces = generateFaces();

    // Upload each base64 image to Cloudinary
    for (let img of images) {
      if (!img.includes(",")) continue; // skip invalid base64

      const uploadResponse = await cloudinary.uploader.upload(img, {
        folder: "cameraApp", // optional folder
      });

      uploadedImages.push(uploadResponse.secure_url); // save Cloudinary URL
    }

    // Save submission in MongoDB
    const submission = await Submission.create({
      latitude,
      longitude,
      images: uploadedImages,
      facesDetected: faces,
      device: device || "unknown",
    });

    res.json({ success: true, submission });
  } catch (err) {
    console.error("Error storing submission:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// List all submissions
exports.index = async (req, res) => {
  try {
    const data = await Submission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Clear all submissions (no local files to delete now)
exports.clearAll = async (req, res) => {
  try {
    await Submission.deleteMany({});
    res.json({ success: true, message: "All submissions cleared from database" });
  } catch (err) {
    console.error("Error clearing data:", err);
    res.status(500).json({ success: false, message: "Failed to clear data" });
  }
};
