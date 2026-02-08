const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

module.exports = (req, res, next) => {
  const token = req.cookies?.token;
  

  if (!token) {
    return res.redirect("/auth/login"); 
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/auth/login");
  }
};
