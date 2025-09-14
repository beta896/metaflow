// motionSync.js
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function syncMotion({ title, status, module }) {
  try {
    const payload = {
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        Title: { title: [{ text: { content: title } }] },
        Status: { select: { name: status } },
        Module: { select: { name: module } }
      }
    };

    const response = await notion.pages.create(payload);
    console.log(?? Motion synced:  — Status:  — Module: );
    return response;
  } catch (error) {
    console.error('? Motion sync failed:', error.message);
    throw error;
  }
}
