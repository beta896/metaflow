const { scoreMilestone } = require('../utils/scoreMilestone');

// After Notion sync:
await scoreMilestone({
  title: 'Weekly Ritual ' + now.toISOString().split('T')[0],
  metric: 'ritualImpact',
  value: impactScore
});
const { updateStreak } = require('../utils/streakTracker');

// After scoreMilestone:
const streak = updateStreak('ritualImpact', impactScore);
console.log('[Streak] ritualImpact ? ' + streak.count + ' (' + streak.tag + ')');
const { updateStreak } = require('../utils/streakTracker');

// After scoreMilestone:
const streak = updateStreak('ritualImpact', impactScore);
console.log('[Streak] ritualImpact ? ' + streak.count + ' (' + streak.tag + ')');
const { syncSymbolicSummary } = require('../utils/syncSymbolicSummary');

// After updateStreak:
await syncSymbolicSummary({
  metric: 'ritualImpact',
  value: impactScore,
  impactTag: impactLevel,
  streakTag: streak.tag
});
const { syncSymbolicSummary } = require('../utils/syncSymbolicSummary');

// After updateStreak:
await syncSymbolicSummary({
  metric: 'ritualImpact',
  value: impactScore,
  impactTag: impactLevel,
  streakTag: streak.tag
});
const { triggerBonus } = require('../utils/triggerBonus');

// After updateStreak:
await triggerBonus({ metric: 'ritualImpact', streakTag: streak.tag });
