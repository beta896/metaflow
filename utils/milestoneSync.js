// milestoneSync.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateMilestone } from './milestoneValidator.js';
import { logMilestone } from './milestoneLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawJson = fs.readFileSync(path.join(__dirname, 'milestone.json'), 'utf-8');
const milestone = JSON.parse(rawJson);

export function logMilestoneToNotion({ title, description, type, module }) {
  console.log(`Milestone Logged: Title: ${title} | Description: ${description} | Type: ${type} | Module: ${module}`);
}

export async function syncMilestone() {
  try {
    const data = validateMilestone(milestone?.motion?.milestone || {});
    logMilestone(data);
    fs.writeFileSync(path.join(__dirname, 'milestoneOutput.json'), JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('? Milestone sync failed:', error.message);
    throw error;
  }
}
