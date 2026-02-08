const express = require("express");
const router = express.Router();
const controller = require("../controllers/submissionController");
const auth = require("../middleware/authMiddleware");
const mobileOnly = require("../middleware/mobileOnly");
const Submission = require("../models/Submission");


// router.post("/store", controller.store);
router.get("/clear", controller.clearAll);



// Render EJS page
router.get("/view", async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.render("submissions", { 
      submissions, 
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY 
    });
  } catch (err) {
    console.error("Error in /admin/view route:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
