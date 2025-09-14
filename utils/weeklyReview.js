const { logMilestone } = require('./logMilestone');

async function weeklyReview({ userId }) {
  const today = new Date().toISOString().slice(0, 10);
  const summary = {
    title: 'Weekly Review – ' + today,
    metric: 'weeklyPerformance',
    value: 1,
    impactTag: 'review',
    streakTag: 'compound'
  };

  await logMilestone(summary);
  console.log('[Weekly Review] Logged for ' + userId);
}

module.exports = { weeklyReview };
