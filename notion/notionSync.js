import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config({ path: "./notion/.env" });

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function pushVerdictToNotion(verdict) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB },
      properties: {
        "Milestone Title": { title: [{ text: { content: verdict.symbol } }] },
        "Verdict": { select: { name: verdict.verdict } },
        "Capital": { number: verdict.capital },
        "Entry": { number: verdict.entry },
        "Stop": { number: verdict.stop },
        "Target": { number: verdict.target },
        "Hold": { rich_text: [{ text: { content: verdict.hold } }] },
        "Deadline": { date: { start: verdict.date } },
        "Scroll Link": { url: verdict.link || "https://github.com/beta896/metaflow" },
        "MVP Status": { rich_text: [{ text: { content: verdict.mvp || "Pending" } }] },
        "Backend": { rich_text: [{ text: { content: verdict.backend || "Stable" } }] },
        "Trading Logic Status": { rich_text: [{ text: { content: verdict.logic || "Pending review" } }] }
      }
    });
    console.log("? Verdict pushed to Notion:", response.id);
  } catch (error) {
    console.error("? Notion sync failed:", error.message);
  }
}
