// lib/walletOps.js
import Wallet from '../models/Wallet.js';
import { createWallet } from '../lib/walletOps.js';
export async function createWallet(userId, auditMeta = {}) {
  const existing = await Wallet.findOne({ userId });
  if (existing) return existing;

  return await Wallet.create({
    userId,
    balance: 0,
    transactions: [],
    audit: {
      createdBy: auditMeta.createdBy || 'system',
      timestamp: new Date(),
      source: auditMeta.source || 'walletOps.js'
    }
  });
}