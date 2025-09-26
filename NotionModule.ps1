# Set target path
$folderPath = "C:\Users\hp\metaflowbackend\notion"

# Create folder if it doesn't exist
if (!(Test-Path $folderPath)) {
    New-Item -ItemType Directory -Path $folderPath
    Write-Host "✅ Created folder: $folderPath"
} else {
    Write-Host "📁 Folder already exists: $folderPath"
}

# Create notionConfig.js
$configContent = @"
<<<<<<< HEAD
export const NOTION_TOKEN = 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";
export const DATABASE_ID = "25c70788ec638088a9ebc541cad81c88";
=======
export const NOTION_TOKEN = "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";
export const DATABASE_ID = "25f70788ec6380408806000cecea5e11";
>>>>>>> 56099f3e (Schema Verified — 🚀 Full sync via PowerShell)
"@
Set-Content -Path "$folderPath\notionConfig.js" -Value $configContent
Write-Host "🧩 Created: notionConfig.js"

# Create notionSync.js
$syncContent = @"
import { Client } from "@notionhq/client";
import { NOTION_TOKEN, DATABASE_ID } from "./notionConfig.js";

const notion = new Client({ auth: NOTION_TOKEN });

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
    console.log("✅ Verdict pushed to Notion:", response.id);
  } catch (error) {
    console.error("❌ Notion sync failed:", error.message);
  }
}
"@
Set-Content -Path "$folderPath\notionSync.js" -Value $syncContent
Write-Host "🧩 Created: notionSync.js"