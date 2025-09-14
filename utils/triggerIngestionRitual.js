async function triggerIngestionRitual({ userId, tier, streakTag }) {
  const ritualTag = tier + '-' + streakTag;
  console.log('[Ingestion Ritual] Triggered for ' + userId + ' ? ' + ritualTag);

  // Optional: fetch offers, filter by tier, tag with ritual
  // const offers = await fetchOffers();
  // const eligible = filterOffersByTier(offers, tier);
  // eligible.forEach(o => o.ritualTag = ritualTag);

  // Optional: sync to Notion
  // await logMilestone({ title: 'Ingestion Ritual', metric: 'offers', value: eligible.length, impactTag: 'refresh', streakTag: streakTag });
}

module.exports = { triggerIngestionRitual };
const { logMilestone } = require('./logMilestone');

// After ritual trigger:
await logMilestone({
  title: 'Tier 2 Ingestion Ritual',
  metric: 'offers',
  value: eligible.length,
  impactTag: 'refresh',
  streakTag: streakTag
});
const { logMilestone } = require('./logMilestone');

// After ritual trigger:
await logMilestone({
  title: 'Tier 2 Ingestion Ritual',
  metric: 'offers',
  value: eligible.length,
  impactTag: 'refresh',
  streakTag: streakTag
});
