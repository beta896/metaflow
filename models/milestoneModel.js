// milestoneModel.js
import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['deployment', 'trigger', 'escalation'], required: true },
  module: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export const Milestone = mongoose.model('Milestone', milestoneSchema);
