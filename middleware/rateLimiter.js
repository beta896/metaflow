// rateLimiter.js � Redis-backed Rate Limiter

import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../config/redisClient.js';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'ratelimit:',
  }),
  handler: (req, res) => {
    console.warn('[RateLimit] Blocked IP on', req.ip);
    res.status(429).json({ message: 'Too many requests. Please try again later.' });
  },
});
