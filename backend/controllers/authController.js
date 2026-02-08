const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secret, expiresIn } = require("../config/jwt");

exports.login = (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  if (email !== ADMIN_EMAIL || !bcrypt.compareSync(password, ADMIN_PASSWORD_HASH))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ role: "admin", email }, secret, { expiresIn });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  res.json({ success: true });
};
