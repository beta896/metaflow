function filterOffersByTier(offers, userTier) {
  return offers.filter(offer => {
    const requiredTier = offer.requiredTier || 'Tier 0';
    const tiers = ['Tier 0', 'Tier 1', 'Tier 2'];
    return tiers.indexOf(userTier) >= tiers.indexOf(requiredTier);
  });
}

module.exports = { filterOffersByTier };
