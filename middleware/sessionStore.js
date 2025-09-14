// sessionStore.js — Redis-backed Session Middleware

import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redisClient } from '../config/redisClient.js';

const RedisStore = connectRedis(session);

const store = new RedisStore({
  client: redisClient,
  prefix: 'sess:',
});

export const sessionMiddleware = session({
  store,
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
    maxAge: 86400000,
  },
});
