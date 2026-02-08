const cookieParser = require("cookie-parser");

require("dotenv").config(); // MUST be FIRST

const express = require("express");
const cors = require("cors");
const path = require("path");
const authMiddleware = require("./middleware/authMiddleware");
const { secret, expiresIn } = require("./config/jwt");

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json({ limit: "50mb" }));        // JSON
app.use(express.urlencoded({ extended: true })); // FORM DATA (IMPORTANT)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
// ✅ routes
app.use("/auth", require("./routes/authRoutes"));
app.post("/store", require("./controllers/submissionController").store);

app.use("/admin",authMiddleware, require("./routes/submissionRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
