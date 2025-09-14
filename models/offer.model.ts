import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  offerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  vertical: { type: String },
  payout: { type: Number },
  currency: { type: String, default: 'USD' },
  trackingUrl: { type: String },
  source: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Offer', offerSchema);
