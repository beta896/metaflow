import { compareForecastToActual } from './forecastTracker';
import { simulateCampaignTraffic } from './simulateCampaign';

export async function simulateTopCampaigns(count = 10) {
  const report = compareForecastToActual();
  const top = report
    .filter(r => r.performance === 'Overperformed')
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 3);

  for (const r of top) {
    console.log(\[TOP CAMPAIGN] \ ? Simulating \ profiles\);
    await simulateCampaignTraffic(r.campaign, count);
  }
}
import { logBatchToNotion } from './notionBatchLogger';
    await logBatchToNotion(r.campaign, count, r.actual);
