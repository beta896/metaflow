function enforceCovenant(contractId) {
  const covenant = covenantStore.get(contractId);
  if (!covenant || covenant.status !== 'active') throw new Error("Invalid covenant");

  const { influencerId, brandId, deadline, proofType } = covenant;
  const proof = checkProofSubmission(influencerId, deadline, proofType);

  if (proof) {
    refundStake(influencerId);
    depositToWallet(influencerId, covenant.payout);
    covenant.status = 'fulfilled';

    logTransaction({ transactionId: generateSymbolicTransactionId(influencerId, 'covenantFulfill'), type: 'covenantFulfill', influencerId, brandId, contractId, amount: covenant.payout, reason: 'Task completed with proof' });
  } else {
    forfeitStake(influencerId, brandId);
    covenant.status = 'violated';

    logTransaction({ transactionId: generateSymbolicTransactionId(influencerId, 'covenantViolation'), type: 'covenantViolation', influencerId, brandId, contractId, reason: 'Proof not submitted before deadline' });
  }
}
