require('dotenv').config();
const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function logMilestone(tag, message) {
  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_MILESTONES_DB },
      properties: {
        Milestone: {
          title: [{ text: { content: `${tag} — ${message}` } }]
        },
        Phase: {
          rich_text: [{ text: { content: "Deployment" } }]
        },
        Verdict: {
          rich_text: [{ text: { content: "✅ Synced from cockpit" } }]
        }
        // Optional: Add Payout and Deadline if needed
      }
    });
    console.log("✅ Milestone logged to Notion");
  } catch (error) {
    console.error("❌ Notion logging failed:", error);
  }
}

export default { logMilestone };