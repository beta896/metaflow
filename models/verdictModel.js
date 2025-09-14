// verdictModel.js
import mongoose from 'mongoose';

const verdictSchema = new mongoose.Schema({
  ritual: { type: String, required: true },
  tier: { type: String, required: true },
  velocity: { type: String, default: 'neutral' },
  verdict: { type: String, required: true },
  symbolicTag: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export const Verdict = mongoose.model('Verdict', verdictSchema);
