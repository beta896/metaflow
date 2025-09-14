type OfferPayoutMap = {
  [key: string]: number;
};

const payoutRates: OfferPayoutMap = {
  StyleHub: 12,
  BrandX: 15,
  GloUp: 20,
  VibeReach: 18,
  GadgetPro: 10,
  InnovateNow: 8,
  OpenPromo: 5
};

export function estimateRevenue(offers: string[], conversionPotential: number): number {
  let total = 0;
  for (const offer of offers) {
    const payout = payoutRates[offer] || 0;
    total += payout * (conversionPotential / 100);
  }
  return Math.round(total);
}
