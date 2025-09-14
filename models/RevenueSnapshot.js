const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
  segment: String,
  revenue: Number,
  trendScore: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RevenueSnapshot", revenueSchema);