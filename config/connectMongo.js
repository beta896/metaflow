// connectMongo.js — MongoDB Connection Handler

import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectMongo() {
  try {
    await mongoose.connect(env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('[mongo] Connected to MongoDB');
  } catch (err) {
    console.error('[mongo] Connection error:', err.message);
    process.exit(1);
  }
}
