import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  amount: { type: Number, required: true },
  source: { type: String },
  destination: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'EGP' },
  linkedAccounts: [{ type: String }],
  transactions: [transactionSchema]
}, { timestamps: true });

export default mongoose.model('Wallet', walletSchema);