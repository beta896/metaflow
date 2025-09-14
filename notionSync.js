// notionSync.js — Verdict Chain Logger

import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function logVerdict(verdict) {
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB_ID },
    properties: {
      Title: { title: [{ text: { content: verdict.title } }] },
      Result: { rich_text: [{ text: { content: verdict.result } }] },
      Timestamp: { date: { start: new Date().toISOString() } }
    }
  });
}
