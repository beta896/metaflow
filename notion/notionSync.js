await notion.pages.create({
  parent: { database_id: process.env.NOTION_MILESTONES_DB },
  properties: {
    "Milestone Title": {
      title: [{ text: { content: `${tag} — ${message}` } }]
    },
    "Phase": {
      rich_text: [{ text: { content: "Deployment" } }]
    },
    "Payout": {
      rich_text: [{ text: { content: "$0 (test sync)" } }]
    },
    "Deadline": {
      date: { start: new Date().toISOString() }
    },
    "Verdict": {
      rich_text: [{ text: { content: "✅ Synced from cockpit" } }]
    },
    "Scroll Link": {
      url: "https://github.com/beta896/metaflow"
    },
    "MVP Status": {
      rich_text: [{ text: { content: "In progress" } }]
    },
    "Backend": {
      rich_text: [{ text: { content: "Stable" } }]
    },
    "Trading Logic Status": {
      rich_text: [{ text: { content: "Pending review" } }]
    }
  }
});