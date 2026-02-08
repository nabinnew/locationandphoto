const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/login", controller.login);


router.get("/login", (req, res) => {
  res.render("login", { error: null });
}); 


module.exports = router;
