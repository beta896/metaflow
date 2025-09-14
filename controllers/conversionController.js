const Notification = require('../models/notification.model');

async function notifyConversion(req, res) {
  const { offerId, source, payout, currency = 'USD' } = req.body;

  if (!offerId || !source || !payout) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const impactTag =
      payout >= 100 ? 'scale' :
      payout >= 50 ? 'leverage' :
      payout >= 10 ? 'precision' : 'micro';

    await Notification.create({
      offerId,
      source,
      payout,
      currency,
      type: 'success',
      impactTag,
      timestamp: new Date()
    });

    console.log(\[Conversion] Logged: \ [\]\);
    res.status(200).json({ message: 'Conversion logged successfully', impactTag });
  } catch (err) {
    console.error('[Conversion] Logging failed:', err.message);
    res.status(500).json({ error: 'Failed to log conversion' });
  }
}

module.exports = { notifyConversion };
const { scoreMilestone } = require('../utils/scoreMilestone');

// Inside notifyConversion try block:
await scoreMilestone({
  title: 'Conversion: ' + offerId,
  metric: 'payout',
  value: payout
});
const { updateStreak } = require('../utils/streakTracker');

// After scoreMilestone:
const streak = updateStreak('payout', payout);
console.log('[Streak] payout ? ' + streak.count + ' (' + streak.tag + ')');
const { updateStreak } = require('../utils/streakTracker');

// After scoreMilestone:
const streak = updateStreak('payout', payout);
console.log('[Streak] payout ? ' + streak.count + ' (' + streak.tag + ')');
const { syncSymbolicSummary } = require('../utils/syncSymbolicSummary');

// After updateStreak:
await syncSymbolicSummary({
  metric: 'payout',
  value: payout,
  impactTag: impactTag,
  streakTag: streak.tag
});
const { triggerBonus } = require('../utils/triggerBonus');

// After updateStreak:
await triggerBonus({ metric: 'payout', streakTag: streak.tag });
let adjustedPayout = payout;

if (streak.tag === 'breakthrough') {
  adjustedPayout = payout * 2;
  console.log('[Multiplier] Breakthrough streak ? payout doubled to ' + adjustedPayout);
}

// Use adjustedPayout in milestone and summary
await scoreMilestone({
  title: 'Conversion: ' + offerId,
  metric: 'payout',
  value: adjustedPayout,
  impactTag: impactTag,
  streakTag: streak.tag
});

await syncSymbolicSummary({
  metric: 'payout',
  value: adjustedPayout,
  impactTag: impactTag,
  streakTag: streak.tag
});
const { unlockAffiliateTier } = require('../utils/unlockAffiliateTier');

// After triggerBonus:
await unlockAffiliateTier({ userId, metric: 'payout', streakTag: streak.tag });
const { triggerIngestionRitual } = require('../utils/triggerIngestionRitual');

// After unlockAffiliateTier or triggerBonus:
await triggerIngestionRitual({ userId, tier: 'Tier 2', streakTag: streak.tag });
