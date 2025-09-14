const dotenv = require('dotenv');
const { WebClient } = require('@slack/web-api');
dotenv.config();

console.log('\n🧪 Environment Variable Sanity Check');

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

const requiredVars = [
  'MONGO_URI',
  'REDIS_HOST',
  'REDIS_PORT',
  'SLACK_BOT_TOKEN',
  'SLACK_CHANNEL',
  'API_KEY',
  'DB_HOST',
  'DB_PORT'
];

const envDescriptions = {
  MONGO_URI: 'MongoDB connection string',
  REDIS_HOST: 'Redis host name',
  REDIS_PORT: 'Redis port number',
  SLACK_BOT_TOKEN: 'Slack bot authentication token',
  SLACK_CHANNEL: 'Slack channel for audit notifications',
  API_KEY: 'Internal API access key',
  DB_HOST: 'Database host address',
  DB_PORT: 'Database port number'
};

const obfuscate = (val) => {
  if (!val) return 'undefined';
  return val.length > 8 ? `${val.slice(0, 5)}...${val.slice(-2)}` : `${val.slice(0, 2)}...`;
};

console.log('--- ENV AUDIT START ---');

const missingVars = requiredVars.filter((key) => !process.env[key]);

async function notifySlack(message) {
  try {
    await slackClient.chat.postMessage({
      channel: process.env.SLACK_CHANNEL,
      text: message
    });
  } catch (err) {
    console.error('⚠️ Slack notification failed:', err.message);
  }
}

(async () => {
  if (missingVars.length > 0) {
    const failureMessage = `❌ ENV AUDIT FAILED:\n` + missingVars.map((key) => `• ${key}: ${envDescriptions[key]}`).join('\n');
    console.error(failureMessage);
    await notifySlack(failureMessage);
    console.log('--- ENV AUDIT END ---');
    process.exit(1);
  }

  const snapshot = {
    mongo: obfuscate(process.env.MONGO_URI),
    redis: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    slackToken: obfuscate(process.env.SLACK_BOT_TOKEN),
    slackChannel: process.env.SLACK_CHANNEL,
    apiKey: obfuscate(process.env.API_KEY),
    db: `${process.env.DB_HOST}:${process.env.DB_PORT}`
  };

  console.log('✅ All required environment variables are present.');
  console.log('🔍 Sample snapshot of loaded env vars:', snapshot);
  await notifySlack('✅ ENV AUDIT PASSED.\n' + JSON.stringify(snapshot, null, 2));
  console.log('--- ENV AUDIT END ---');
})();