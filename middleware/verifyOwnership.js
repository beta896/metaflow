module.exports = function (req, res, next) {
  const { email } = req.body;
  if (req.user.email !== email) {
    return res.status(403).json({ message: "Ownership mismatch" });
  }
  next();
};
