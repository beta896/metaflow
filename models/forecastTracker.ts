import { getVerdicts } from './verdictStore';
import { forecastCampaignRevenue } from './campaignForecaster';

export function compareForecastToActual() {
  const actuals = getVerdicts();
  const forecast = forecastCampaignRevenue();

  const actualRevenueMap: Record<string, number> = {};
  actuals.forEach(v => {
    const campaign = v.profile.campaign || 'Unlabeled';
    actualRevenueMap[campaign] = (actualRevenueMap[campaign] || 0) + v.estimatedRevenue;
  });

  return forecast.map(f => {
    const actual = actualRevenueMap[f.campaign] || 0;
    const delta = actual - f.projectedRevenue;
    const performance = delta >= 0 ? 'Overperformed' : 'Underperformed';
    return {
      campaign: f.campaign,
      forecasted: f.projectedRevenue,
      actual,
      delta,
      performance
    };
  }).sort((a, b) => b.delta - a.delta);
}
