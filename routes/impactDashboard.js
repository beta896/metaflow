const express = require('express');
const OfferClick = require('../models/offerClick.model');
const Review = require('../models/review.model');
const Notification = require('../models/notification.model');

const router = express.Router();

router.get('/impact', async (_req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  try {
    const [clicksToday, payoutToday, reviewsToday, conversionsToday] = await Promise.all([
      OfferClick.countDocuments({ timestamp: { \\\: startOfDay } }),
      OfferClick.aggregate([
        { \\\: { timestamp: { \\\: startOfDay } } },
        { \\\: { _id: null, total: { \\\: '\\\' } } }
      ]),
      Review.countDocuments({ timestamp: { \\\: startOfDay } }),
      Notification.countDocuments({ timestamp: { \\\: startOfDay, type: 'success' } })
    ]);

    const impactScore =
      (clicksToday * 1) +
      ((payoutToday[0]?.total || 0) * 2) +
      (reviewsToday * 1.5) +
      (conversionsToday * 3);

    const impactLevel =
      impactScore >= 100 ? 'scale' :
      impactScore >= 50 ? 'leverage' :
      impactScore >= 20 ? 'precision' : 'low-signal';

    res.json({
      date: startOfDay.toISOString().split('T')[0],
      impactScore,
      impactLevel,
      metrics: {
        clicksToday,
        payoutToday: payoutToday[0]?.total || 0,
        reviewsToday,
        conversionsToday
      }
    });
  } catch (err) {
    console.error('[Dashboard] Impact error:', err.message);
    res.status(500).json({ message: 'Failed to fetch impact dashboard' });
  }
});

module.exports = router;
