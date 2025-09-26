type Verdict = {
  profile: { followers: number; engagementRate: number; socials: string[] };
  verdict: { tier: string; category: string; engagementScore: number };
  offers: string[];
  conversionPotential: number;
  estimatedRevenue: number;
};

export function scorePortfolio(verdicts: Verdict[]) {
  const totalRevenue = verdicts.reduce((sum, v) => sum + v.estimatedRevenue, 0);
  const avgEngagement = Math.round(
    verdicts.reduce((sum, v) => sum + v.profile.engagementRate, 0) / verdicts.length * 100
  );
  const offerDensity = Math.round(
    verdicts.reduce((sum, v) => sum + v.offers.length, 0) / verdicts.length
  );

  return {
    totalRevenue,
    avgEngagement,
    offerDensity,
    profileCount: verdicts.length
  };
}
