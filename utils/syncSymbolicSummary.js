const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const summaryDbId = process.env.NOTION_SUMMARY_DB_ID || '';

async function syncSymbolicSummary({ metric, value, impactTag, streakTag }) {
  const title = streakTag.toUpperCase() + ' on ' + metric;
  const summary = 'Metric: ' + metric + '\\nValue: ' + value + '\\nImpact: ' + impactTag + '\\nStreak: ' + streakTag;

  try {
    await notion.pages.create({
      parent: { database_id: summaryDbId },
      properties: {
        Title: { title: [{ text: { content: title } }] },
        Metric: { select: { name: metric } },
        Value: { number: value },
        Impact: { select: { name: impactTag } },
        Streak: { select: { name: streakTag } },
        Summary: { rich_text: [{ text: { content: summary } }] },
        Timestamp: { date: { start: new Date().toISOString() } }
      }
    });

    console.log('[Summary] Synced: ' + title);
  } catch (err) {
    console.error('[Summary] Sync failed:', err.message);
  }
}

module.exports = { syncSymbolicSummary };
