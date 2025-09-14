import mongoose from "mongoose";

const verdictSchema = new mongoose.Schema({
  symbol: String,
  verdict: String,
  capital: Number,
  entry: Number,
  top: Number,
  target: Number,
  hold: String,
  date: Date
}, {
  timestamps: true
});

const Verdict = mongoose.model("Verdict", verdictSchema);
export default Verdict;