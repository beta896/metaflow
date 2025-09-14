// notifyRoutes.js
import express from 'express';

const router = express.Router();

// POST /notify — Trigger symbolic notification
router.post('/', async (req, res) => {
  try {
    const { message, type, module } = req.body;
    console.log(`🔔 Notification Triggered: [${type}] — module: ${module}`);
    res.status(200).json({
      success: true,
      message: '✅ Notification dispatched',
      data: { message, type, module }
    });
  } catch (error) {
    console.error('❌ Notification dispatch failed:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;