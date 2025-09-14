// metaFlow.js — Invincible Jaguar Edition 🐆
import { predictProfitPascal } from './predictProfitPascal.js';
import { getSessionFingerprint, getUserTier } from './sessionUtils.js';
import { logToLedger, hashEntry } from './utils/auditUtils.js';


const earningsLog = [];
// Removed redundant redeclaration of predictProfitPascal

export function trackEarnings({ userId, actionType, entityId, amount, probability }) {
  const timestamp = new Date().toISOString();
  const sessionId = getSessionFingerprint();
  const userTier = getUserTier(userId);

  // Predict profit using Pascal-inspired method
  const expectedProfit = predictProfitPascal(amount, probability, userTier);

  const entry = {
    userId,
    actionType,
    entityId,
    amount,
    probability,
    expectedProfit,
    timestamp,
    sessionId,
    hash: hashEntry({ userId, actionType, entityId, amount, timestamp })
  };

  earningsLog.push(entry);
  logToLedger(entry);

  console.log(`🧠 Profit predicted: $${expectedProfit.toFixed(2)} | Logged for ${actionType} by ${userId}`);
  return entry;
}
