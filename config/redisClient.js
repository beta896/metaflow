// redisClient.js — Redis Connection Module

import { createClient } from 'redis';
import { env } from './env.js';

export const redisClient = createClient({ url: env.REDIS_URL });

redisClient.on('error', (err) => {
  console.error('[redis] Error:', err.message);
});

redisClient.on('ready', () => {
  console.log('[redis] Ready for commands');
});

redisClient.on('reconnecting', () => {
  console.log('[redis] Reconnecting...');
});

await redisClient.connect();

console.log('[redis] Connected');
