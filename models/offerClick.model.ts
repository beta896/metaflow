import mongoose from 'mongoose';

const offerClickSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offerId: { type: String, required: true },
  source: { type: String },
  campaign: { type: String },
  payout: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  converted: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('OfferClick', offerClickSchema);
