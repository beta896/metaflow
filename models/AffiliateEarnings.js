import mongoose from "mongoose";

const affiliateEarningsSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AffiliatePartner",
    required: true,
  },
  revenueGenerated: {
    type: Number,
    required: true,
  },
  commissionRate: {
    type: Number,
    required: true,
  },
  payoutStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false, // Optional: you're manually tracking 'timestamp'
  collection: "affiliate_earnings", // Optional override for naming clarity
});

// ⚡ Indexing for query speed by partner and recency
affiliateEarningsSchema.index({ partnerId: 1, timestamp: -1 });

const AffiliateEarnings = mongoose.model("AffiliateEarnings", affiliateEarningsSchema);
export default AffiliateEarnings;