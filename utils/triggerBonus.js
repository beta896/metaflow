async function triggerBonus({ metric, streakTag }) {
  const bonuses = {
    surge: () => console.log('[Bonus] Surge bonus triggered for ' + metric),
    momentum: () => console.log('[Bonus] Momentum multiplier activated for ' + metric),
    breakthrough: () => console.log('[Bonus] Breakthrough ritual unlocked for ' + metric)
  };

  if (bonuses[streakTag]) {
    bonuses[streakTag]();
    // Optional: sync to Notion, trigger payout logic, or log bonus
  } else {
    console.log('[Bonus] No bonus for ' + metric + ' at tag: ' + streakTag);
  }
}

module.exports = { triggerBonus };
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const bonusDbId = process.env.NOTION_BONUS_DB_ID || '';

async function syncBonus(metric, streakTag) {
  const title = streakTag.toUpperCase() + ' Bonus for ' + metric;
  const summary = 'Metric: ' + metric + '\\nStreak: ' + streakTag + '\\nTimestamp: ' + new Date().toISOString();

  await notion.pages.create({
    parent: { database_id: bonusDbId },
    properties: {
      Title: { title: [{ text: { content: title } }] },
      Metric: { select: { name: metric } },
      Streak: { select: { name: streakTag } },
      Summary: { rich_text: [{ text: { content: summary } }] },
      Timestamp: { date: { start: new Date().toISOString() } }
    }
  });

  console.log('[Bonus] Synced: ' + title);
}
const bonuses = {
  surge: async () => {
    console.log('[Bonus] Surge bonus triggered for ' + metric);
    await syncBonus(metric, 'surge');
  },
  momentum: async () => {
    console.log('[Bonus] Momentum multiplier activated for ' + metric);
    await syncBonus(metric, 'momentum');
  },
  breakthrough: async () => {
    console.log('[Bonus] Breakthrough ritual unlocked for ' + metric);
    await syncBonus(metric, 'breakthrough');
  }
};
