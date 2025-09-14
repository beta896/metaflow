const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const milestoneDbId = process.env.NOTION_MILESTONE_DB_ID || '';

async function scoreMilestone({ title, metric, value }) {
  const impactLevel =
    value >= 100 ? 'scale' :
    value >= 50 ? 'leverage' :
    value >= 20 ? 'precision' : 'signal';

  const tags = [metric, impactLevel];

  try {
    await notion.pages.create({
      parent: { database_id: milestoneDbId },
      properties: {
        Title: { title: [{ text: { content: title } }] },
        Metric: { select: { name: metric } },
        Value: { number: value },
        Impact: { select: { name: impactLevel } },
        Tags: { multi_select: tags.map(tag => ({ name: tag })) },
        Timestamp: { date: { start: new Date().toISOString() } }
      }
    });

    console.log(\[Milestone] Logged: \ [\]\);
  } catch (err) {
    console.error('[Milestone] Sync failed:', err.message);
  }
}

module.exports = { scoreMilestone };
