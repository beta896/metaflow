// scripts/createWallet.js
import mongoose from 'mongoose';
import Wallet from '../models/Wallet.js';

const userId = process.argv[2];

if (!userId) {
  console.error('❌ Missing userId argument. Usage: node scripts/createWallet.js <userId>');
  process.exit(1);
}

try {
  await mongoose.connect('mongodb://127.0.0.1:27017/metaflow');

  const existing = await Wallet.findOne({ userId });
  if (existing) {
    console.warn(`⚠️ Wallet already exists for user ${userId}`);
    process.exit(0);
  }

  const wallet = await Wallet.create({
    userId,
    balance: 0,
    transactions: [],
    audit: {
      createdBy: 'CLI',
      timestamp: new Date(),
      source: 'createWallet.js'
    }
  });

  console.log(`✅ Wallet created for user ${userId}`);
} catch (err) {
  console.error('🔥 Error creating wallet:', err.message);
  process.exit(1);
} finally {
  await mongoose.disconnect();
}