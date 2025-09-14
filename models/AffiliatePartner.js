import mongoose from 'mongoose';

const affiliateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  region: { type: String },
  platform: { type: String },
  commissionRate: { type: Number },
  avgCTR: { type: Number }
}, { timestamps: true }); // Optional: adds createdAt & updatedAt

const AffiliatePartner = mongoose.model('AffiliatePartner', affiliateSchema);

export default AffiliatePartner;