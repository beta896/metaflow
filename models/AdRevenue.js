import mongoose from "mongoose";

const adRevenueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  platform: {
    type: String,
    required: true,
    enum: ["Facebook", "Instagram", "YouTube", "TikTok", "Other"],
  },
  adType: {
    type: String,
    required: true,
    enum: ["CPC", "CPM", "CPA", "Sponsorship"],
  },
  earnings: {
    type: Number,
    required: true,
    min: 0,
  },
  impressions: {
    type: Number,
    default: 0,
    min: 0,
  },
  clicks: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
  collection: "ad_revenue", // Optional: keeps your MongoDB collection name explicit
});

const AdRevenue = mongoose.model("AdRevenue", adRevenueSchema);
export default AdRevenue;