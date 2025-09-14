import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { WebClient } from "@slack/web-api";

// Load Slack token from .env or config
const slackToken = process.env.SLACK_TOKEN;
const channel = "#audit-feed";
const fileName = "business-file-mustafa-meta.json";
const filePath = path.resolve(`./${fileName}`);

const slack = new WebClient(slackToken);

(async () => {
  try {
    const result = await slack.files.upload({
      channels: channel,
      initial_comment: `📁 Business file pushed for audit: ${fileName}`,
      file: fs.createReadStream(filePath),
      filename: fileName,
      title: `MetaFlow Business File: ${fileName}`
    });

    console.log("✅ File pushed to Slack:", result.file.id);
  } catch (err) {
    console.error("❌ Slack push failed:", err.message);
    process.exit(1);
  }
})();