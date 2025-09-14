const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const milestoneDbId = process.env.NOTION_MILESTONE_DB_ID || '';

async function logMilestone({ title, metric, value, impactTag, streakTag }) {
  await notion.pages.create({
    parent: { database_id: milestoneDbId },
    properties: {
      Title: { title: [{ text: { content: title } }] },
      Metric: { select: { name: metric } },
      Value: { number: value },
      Impact: { select: { name: impactTag } },
      Streak: { select: { name: streakTag } },
      Timestamp: { date: { start: new Date().toISOString() } }
    }
  });

  console.log('[Milestone] Logged: ' + title + ' ? ' + value);
}

module.exports = { logMilestone };
