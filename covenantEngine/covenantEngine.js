const covenantStore = new Map();

function createCovenant({ influencerId, brandId, task, deadline, payout, proofType }) {
  const contractId = COV--;
  covenantStore.set(contractId, { influencerId, brandId, task, deadline, payout, proofType, stakeRequired: true, status: 'active' });

  logTransaction({ transactionId: generateSymbolicTransactionId(influencerId, 'covenantCreate'), type: 'covenantCreate', influencerId, brandId, contractId, reason: 'Formal task agreement' });

  return contractId;
}

function getUserCovenants(userId) {
  return Array.from(covenantStore.values()).filter(c => c.influencerId === userId || c.brandId === userId);
}
