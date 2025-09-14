// controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // ✅ Default ES Module import

const generateToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// ✅ Handle Email/Password Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials!' });

    const token = generateToken(user);
    res.json({ accessToken: token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

// ✅ Handle Google Login (Mocked logic)
const loginWithGoogle = async (req, res) => {
  const { token } = req.body;
  try {
    const googleId = 'mocked_google_id'; // Replace with real verification logic
    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        email: 'placeholder@gmail.com', // Replace with actual email from Google
        googleId
      });
    }

    const accessToken = generateToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Google login error', error: err.message });
  }
};

// ✅ Return Authenticated User Profile
const getMe = (req, res) => {
  res.json({ user: req.user });
};

// ✅ Handle Logout
const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

export default {
  login,
  loginWithGoogle,
  getMe,
  logout
};