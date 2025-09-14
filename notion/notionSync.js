import { Client } from "@notionhq/client";
import { NOTION_TOKEN, DATABASE_ID } from "./notionConfig.js";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function pushVerdictToNotion(verdict) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Symbol: { title: [{ text: { content: verdict.symbol } }] },
        Verdict: { select: { name: verdict.verdict } },
        Capital: { number: verdict.capital },
        Entry: { number: verdict.entry },
        Stop: { number: verdict.stop },
        Target: { number: verdict.target },
        Hold: { rich_text: [{ text: { content: verdict.hold } }] },
        Date: { date: { start: verdict.date } }
      }
    });
    console.log("? Verdict pushed to Notion:", response.id);
  } catch (error) {
    console.error("? Notion sync failed:", error.message);
  }
}
