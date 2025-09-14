// server.js — Metaflow Backend Boot

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { env } from './config/env.js';
import { connectMongo } from './config/connectMongo.js';
import { sessionMiddleware } from './middleware/sessionStore.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import verdictRoutes from './routes/verdictRoutes.js';

dotenv.config();

const app = express();

// ?? Middleware
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));
app.use(sessionMiddleware);
app.use(apiLimiter);

// ?? Connect MongoDB
await connectMongo();

// ?? Routes
app.use('/verdict', verdictRoutes);

// ?? Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: Date.now() });
});

// ?? Boot Server
const PORT = env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[engine-start] Metaflow running at http://localhost:${PORT}`);
});
