const OfferClick = require('../models/offerClick.model');
const Review = require('../models/review.model');
const Notification = require('../models/notification.model');

async function getImpactSummary(req, res) {
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

    const payout = payoutToday[0]?.total || 0;
    const impactScore = (clicksToday * 1) + (payout * 2) + (reviewsToday * 1.5) + (conversionsToday * 3);
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
        payoutToday: payout,
        reviewsToday,
        conversionsToday
      }
    });
  } catch (err) {
    console.error('[Impact] Summary error:', err.message);
    res.status(500).json({ error: 'Failed to fetch impact summary' });
  }
}

module.exports = { getImpactSummary };
const { scoreMilestone } = require('../utils/scoreMilestone');

// Inside getImpactSummary try block:
await scoreMilestone({
  title: 'Impact Summary ' + startOfDay.toISOString().split('T')[0],
  metric: 'impactScore',
  value: impactScore
});
const { updateStreak } = require('../utils/streakTracker');

// After scoreMilestone:
const streak = updateStreak('impactScore', impactScore);
console.log('[Streak] impactScore ? ' + streak.count + ' (' + streak.tag + ')');
const { updateStreak } = require('../utils/streakTracker');

// After scoreMilestone:
const streak = updateStreak('impactScore', impactScore);
console.log('[Streak] impactScore ? ' + streak.count + ' (' + streak.tag + ')');
const { syncSymbolicSummary } = require('../utils/syncSymbolicSummary');

// After updateStreak:
await syncSymbolicSummary({
  metric: 'impactScore',
  value: impactScore,
  impactTag: impactLevel,
  streakTag: streak.tag
});
const { triggerBonus } = require('../utils/triggerBonus');

// After updateStreak:
await triggerBonus({ metric: 'impactScore', streakTag: streak.tag });
