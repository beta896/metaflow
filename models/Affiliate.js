import mongoose from "mongoose";

const affiliateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  referralCode: { type: String, required: true, unique: true },
  referredUsers: [{ type: String }],
  profitGenerated: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

/**
 * Logs a referral and updates profit
 */
affiliateSchema.methods.trackReferral = function (userId, profitAmount) {
  if (!this.referredUsers.includes(userId)) {
    this.referredUsers.push(userId);
    this.profitGenerated += profitAmount;
  }
  return this.save();
};

const Affiliate = mongoose.model("Affiliate", affiliateSchema);
export default Affiliate;
