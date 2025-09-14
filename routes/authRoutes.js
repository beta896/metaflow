// @audit-clean: authentication routes with JWT issuance and session fallback

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

const router = express.Router();

// 🔐 Login with Passport local strategy
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, { session: true }, err => {
      if (err) return next(err);

      const token = jwt.sign(
        { id: user._id, role: user.role },
        env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user._id, email: user.email, role: user.role },
      });
    });
  })(req, res, next);
});

// 🧪 Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('[Auth] Registration error:', err.message);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// 🔓 Logout
router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

export default router;

module.exports = router;
