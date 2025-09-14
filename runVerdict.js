import fs from 'fs';
import { pushVerdictToNotion } from './notion/notionSync.js';

const verdict = JSON.parse(fs.readFileSync('./verdict.json', 'utf-8'));
await pushVerdictToNotion(verdict);
