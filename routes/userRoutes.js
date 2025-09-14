// @audit-clean: user routes with JWT protection, scoped exposure, and role-based access

import express from 'express';
import verifyToken, { requireRole } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// 👤 GET /user/me — Current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.warn(`[User] Profile not found for ID: ${req.user.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(`[User] Profile fetch error: ${err.message}`);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// 🧾 GET /user/all — Admin-only: List all users
router.get('/all', verifyToken, requireRole('admin'), async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (err) {
    console.error(`[User] Admin fetch error: ${err.message}`);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// 🔄 PUT /user/update — Update current user profile
router.put('/update', verifyToken, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    res.status(200).json({ message: 'Profile updated', user });
  } catch (err) {
    console.error(`[User] Update error: ${err.message}`);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// 🗑️ DELETE /user/:id — Admin-only: Delete a user
router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.warn(`[User] Delete failed: ID ${req.params.id} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error(`[User] Delete error: ${err.message}`);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;