const fs = require('fs');
const path = require('path');
const streakFile = path.join(__dirname, '../data/streaks.json');

function loadStreaks() {
  if (!fs.existsSync(streakFile)) return {};
  return JSON.parse(fs.readFileSync(streakFile));
}

function saveStreaks(data) {
  fs.writeFileSync(streakFile, JSON.stringify(data, null, 2));
}

function updateStreak(metric, value) {
  const thresholds = {
    payout: 50,
    impactScore: 40,
    ritualImpact: 30
  };

  const streaks = loadStreaks();
  const current = streaks[metric] || { count: 0 };

  if (value >= thresholds[metric]) {
    current.count += 1;
  } else {
    current.count = 0;
  }

  const tag =
    current.count >= 10 ? 'breakthrough' :
    current.count >= 5 ? 'momentum' :
    current.count >= 3 ? 'surge' : 'signal';

  streaks[metric] = { count: current.count, tag };
  saveStreaks(streaks);

  console.log('[Streak] ' + metric + ': ' + current.count + ' ? ' + tag);
  return { count: current.count, tag };
}

module.exports = { updateStreak };
let alert = null;

if (value < thresholds[metric] && current.count > 0) {
  alert = {
    metric,
    previousStreak: current.count,
    verdict: 'collapse',
    timestamp: new Date().toISOString()
  };
  console.warn('[Alert] ' + metric + ' streak collapsed from ' + current.count + ' ? 0');
}

return { count: current.count, tag, alert };
let alert = null;

if (value < thresholds[metric] && current.count > 0) {
  alert = {
    metric,
    previousStreak: current.count,
    verdict: 'collapse',
    timestamp: new Date().toISOString()
  };
  console.warn('[Alert] ' + metric + ' streak collapsed from ' + current.count + ' ? 0');
}

return { count: current.count, tag, alert };
