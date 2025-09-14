// routes/scrap.js
import express from 'express';
import Scrap from '../models/Scrap.js';

const router = express.Router();

// @audit-api: Scrap Summary — aggregates scrap events for dashboard
router.get('/summary', async (req, res) => {
  const summary = await Scrap.aggregate([
    { $group: { _id: '$reason', count: { $sum: 1 } } }
  ]);

  const byDept = await Scrap.aggregate([
    { $group: { _id: '$department', count: { $sum: 1 } } }
  ]);

  res.json({ summary, byDept });
});

export default router;
module.exports = router;
