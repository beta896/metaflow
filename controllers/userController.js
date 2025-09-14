const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};