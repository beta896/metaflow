// scripts/testRedis.js
import { connectRedis } from '../config/redisClient.js';

const redis = connectRedis();

const report = {
  status: 'ok',
  timestamp: Date.now(),
  source: 'testRedis.js',
};

redis.setex(`audit:${Date.now()}`, 3600, JSON.stringify(report), (err) => {
  if (err) {
    console.error('❌ Redis write failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Redis write succeeded');
    redis.quit();
  }
});