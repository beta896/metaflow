import dotenv from 'dotenv';
dotenv.config();

// sanity check logic...

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { WebClient } from '@slack/web-api';

import { scanFiles } from './utils/fileScanner.js';
import auditTagRule from './rules/auditTagRule.js';
import rateLimiterRule from './rules/rateLimiterRule.js';
import sessionRule from './rules/sessionRule.js';
import syntaxRule from './rules/syntaxRule.js';

dotenv.config();

// 🔐 Load environment variables
const {
  SLACK_BOT_TOKEN,
  SLACK_CHANNEL,
  MONGO_URI,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_TTL
} = process.env;

const slackClient = new WebClient(SLACK_BOT_TOKEN);
const redisClient = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });

const red = text => `\x1b[31m${text}\x1b[0m`;
const green = text => `\x1b[32m${text}\x1b[0m`;
const yellow = text => `\x1b[33m${text}\x1b[0m`;

const targetDir = process.argv[2] || './routes';
const outputJson = process.argv.includes('--json');
const outputPath = './audit-report.json';

const files = scanFiles(targetDir);

const rules = [
  { name: 'Audit Tag', fn: auditTagRule },
  { name: 'Rate Limiter', fn: rateLimiterRule },
  { name: 'Session Middleware', fn: sessionRule },
  { name: 'Syntax Style', fn: syntaxRule },
];

let totalViolations = 0;
const allViolations = [];

console.log(yellow(`\n🔍 Auditing hygiene in: ${targetDir}\n`));

// 🔌 Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(green('✅ Connected to MongoDB')))
  .catch(err => console.error(red(`❌ MongoDB connection error: ${err.message}`)));

// 🔌 Connect to Redis
redisClient.connect().then(() => {
  console.log(green('✅ Connected to Redis'));
}).catch(err => {
  console.error(red(`❌ Redis connection error: ${err.message}`));
});

// 🧾 Optional MongoDB schema
const violationSchema = new mongoose.Schema({
  file: String,
  rule: String,
  severity: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Violation = mongoose.model('Violation', violationSchema);

for (const { filePath, content } of files) {
  const relativePath = path.relative(process.cwd(), filePath);
  const violations = [];

  for (const rule of rules) {
    try {
      const result = rule.fn(content, filePath);
      if (Array.isArray(result) && result.length) {
        result.forEach(v => violations.push({ ...v, rule: rule.name }));
      } else if (typeof result === 'string') {
        violations.push({
          file: filePath,
          rule: rule.name,
          severity: 'medium',
          message: result
        });
      }
    } catch (err) {
      violations.push({
        file: filePath,
        rule: rule.name,
        severity: 'error',
        message: `⚠️ Error running rule - ${err.message}`
      });
    }
  }

  if (violations.length) {
    console.log(red(`\n🚨 Violations in ${relativePath}:`));
    violations.forEach(v => console.log(red(`  - [${v.rule}] ${v.message}`)));
    totalViolations += violations.length;
    allViolations.push(...violations);

    // 🔔 Send Slack alert
    const slackText = `🚨 *Violations in ${relativePath}*`;
    const slackBlocks = violations.map(v => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `• *[${v.rule}]* ${v.message}`
      }
    }));

    slackClient.chat.postMessage({
      channel: SLACK_CHANNEL || '#backend-audit',
      text: slackText,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: slackText } },
        ...slackBlocks
      ]
    }).catch(err => {
      console.error(red(`❌ Failed to send Slack message: ${err.message}`));
    });

    // 🧾 Save to MongoDB
    violations.forEach(v => {
      const violation = new Violation(v);
      violation.save().catch(err => {
        console.error(red(`❌ MongoDB save error: ${err.message}`));
      });
    });

    // ⚡ Cache in Redis
    redisClient.setEx(`audit:${relativePath}`, REDIS_TTL || 60, JSON.stringify(violations))
      .catch(err => console.error(red(`❌ Redis cache error: ${err.message}`)));

  } else {
    console.log(green(`✅ ${relativePath} passed all checks.`));
  }
}

if (outputJson) {
  fs.writeFileSync(outputPath, JSON.stringify(allViolations, null, 2));
  console.log(yellow(`\n📝 Audit report saved to ${outputPath}`));
}

console.log(`\n${totalViolations > 0
  ? red(`❌ ${totalViolations} total violations found.`)
  : green('🎉 All files passed hygiene audit.')}`);

process.exit(totalViolations > 0 ? 1 : 0);