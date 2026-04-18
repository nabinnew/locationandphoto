const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb+srv://parvatneupane104_db_user:JLGFCcnIFLlzkZPK@cluster0.jjxlbvf.mongodb.net/?appName=Cluster0"); // no extra options
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // exit if DB connection fails
  }
};
  
