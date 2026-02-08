module.exports = (req, res, next) => {
  const { device } = req.body;
  if (!/Android|iPhone/i.test(device)) {
    return res.status(403).json({ message: "Mobile devices only" });
  }
  next();
};
