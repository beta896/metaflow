import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function syncVerdictToNotion(verdict) {
  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_VERDICT_DB_ID },
      properties: {
        Title: { title: [{ text: { content: verdict.title } }] },
        Decision: { rich_text: [{ text: { content: verdict.decision } }] },
        Symbol: { rich_text: [{ text: { content: verdict.symbol || '' } }] },
        Tags: {
          multi_select: (verdict.tags || []).map(tag => ({ name: tag }))
        },
        Author: { rich_text: [{ text: { content: verdict.author || 'founder' } }] },
        Timestamp: {
          date: {
            start: verdict.timestamp?.toISOString() || new Date().toISOString()
          }
        }
      }
    });
    console.log(\[Notion] Synced verdict: \\);
  } catch (err) {
    console.error(\[Notion] Verdict sync failed: \\);
  }
}
