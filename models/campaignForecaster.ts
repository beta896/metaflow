import { getVerdicts } from './verdictStore';

export function forecastCampaignRevenue() {
  const verdicts = getVerdicts();

  const campaignStats: Record<string, { totalRevenue: number; count: number }> = {};

  verdicts.forEach(v => {
    const campaign = v.profile.campaign || 'Unlabeled';
    if (!campaignStats[campaign]) {
      campaignStats[campaign] = { totalRevenue: 0, count: 0 };
    }
    campaignStats[campaign].totalRevenue += v.estimatedRevenue;
    campaignStats[campaign].count += 1;
  });

  const forecast = Object.entries(campaignStats).map(([campaign, stats]) => {
    const avgRevenue = stats.totalRevenue / stats.count;
    const projected = Math.round(avgRevenue * 100); // simulate next 100 profiles
    return {
      campaign,
      avgRevenue: Math.round(avgRevenue),
      projectedRevenue: projected,
      profileCount: stats.count
    };
  });

  return forecast.sort((a, b) => b.projectedRevenue - a.projectedRevenue);
}
