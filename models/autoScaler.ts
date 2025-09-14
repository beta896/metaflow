import { compareForecastToActual } from './forecastTracker';
import { simulateCampaignTraffic } from './simulateCampaign';

export async function autoScaleCampaigns() {
  const report = compareForecastToActual();

  for (const r of report) {
    if (r.performance === 'Overperformed') {
      console.log(\[AUTO-SCALE] \ → Simulating 10 new profiles\);
      await simulateCampaignTraffic(r.campaign, 10);
    } else {
      console.log(\[PAUSED] \ → Underperformed by \$\{Math.abs(r.delta)} USD\);
    }
  }
}
import { logDecisionToNotion } from './notionDecisionLogger';
    await logDecisionToNotion(r.campaign, r.forecasted, r.actual, r.delta, r.performance);
import { simulateTopCampaigns } from './simulateTopCampaigns';

console.log('[AUTO-TRIGGER] Running top campaign simulation after performance review...');
await simulateTopCampaigns(10);
