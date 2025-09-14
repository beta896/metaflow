import mongoose from 'mongoose';

const verdictSchema = new mongoose.Schema({
  title: { type: String, required: true },
  decision: { type: String, required: true },
  symbol: { type: String },
  timestamp: { type: Date, default: Date.now },
  tags: [{ type: String }],
  author: { type: String, default: 'founder' }
});

export const Verdict = mongoose.model('Verdict', verdictSchema);
