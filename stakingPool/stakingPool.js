const stakingLedger = new Map();

function stakeFunds(userId, amount) {
  const wallet = getWallet(userId);
  if (wallet.balance < amount || wallet.balance <= 5) throw new Error("Insufficient funds");

  const txId = generateSymbolicTransactionId(userId, 'stake');
  wallet.balance -= amount;

  stakingLedger.set(userId, { amount, timestamp: Date.now(), txId });

  logTransaction({ transactionId: txId, type: 'stakeCommitment', userId, amount, reason: 'Influencer reliability pledge' });

  return txId;
}

function refundStake(userId) {
  const stake = stakingLedger.get(userId);
  if (!stake) throw new Error("No stake found");

  const wallet = getWallet(userId);
  wallet.balance += stake.amount;

  logTransaction({ transactionId: generateSymbolicTransactionId(userId, 'stakeRefund'), type: 'stakeRefund', userId, amount: stake.amount, reason: 'Task completed successfully' });

  stakingLedger.delete(userId);
}

function forfeitStake(userId, brandId) {
  const stake = stakingLedger.get(userId);
  if (!stake) throw new Error("No stake found");

  const split = stake.amount / 2;
  depositToWallet(METAFLOW_WALLET_ID, split);
  depositToWallet(brandId, split);

  logTransaction({ transactionId: generateSymbolicTransactionId(userId, 'stakeForfeit'), type: 'stakePenalty', influencerId: userId, brandId, amount: stake.amount, reason: 'Proof not submitted before deadline' });

  stakingLedger.delete(userId);
}
