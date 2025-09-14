async function unlockAffiliateTier({ userId, metric, streakTag }) {
  if (streakTag !== 'breakthrough') return;

  const tier = 'Tier 2';
  console.log('[Affiliate] ' + userId + ' unlocked ' + tier + ' via ' + metric + ' breakthrough');

  // Optional: sync to Notion or update user profile
  // await updateUserTier(userId, tier);
  // await syncSymbolicSummary({ metric, value: 0, impactTag: 'unlock', streakTag: 'breakthrough' });
}

module.exports = { unlockAffiliateTier };
