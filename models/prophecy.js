import mongoose from "mongoose";

const prophecySchema = new mongoose.Schema({
  key: String,
  role: String,
  trigger: String,
  verdict: String,
  timestamp: { type: Date, default: Date.now }
});

export const Prophecy = mongoose.model("Prophecy", prophecySchema);
