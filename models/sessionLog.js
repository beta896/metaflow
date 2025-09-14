import mongoose from "mongoose";

const sessionLogSchema = new mongoose.Schema({
  role: String,
  views: Number,
  timestamp: { type: Date, default: Date.now }
});

export const SessionLog = mongoose.model("SessionLog", sessionLogSchema);
