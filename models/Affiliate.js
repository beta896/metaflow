const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
  name: String,
  email: String,
  referralCode: String,
  referredUsers: [String],
  profitGenerated: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Affiliate', affiliateSchema);
