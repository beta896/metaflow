const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function logMilestone(tag, message) {
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB },
    properties: {
      Name: { title: [{ text: { content: tag } }] },
      Description: { rich_text: [{ text: { content: message } }] },
      Timestamp: { date: { start: new Date().toISOString() } }
    }
  });
}

async function logAffiliateVerdict(action, data) {
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB },
    properties: {
      Name: { title: [{ text: { content: \Affiliate \\ } }] },
      Description: { rich_text: [{ text: { content: JSON.stringify(data) } }] },
      Timestamp: { date: { start: new Date().toISOString() } }
    }
  });
}

module.exports = { logMilestone, logAffiliateVerdict };
