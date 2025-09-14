import { autoScaleCampaigns } from './autoScaler';

function runScheduler() {
  console.log('[SCHEDULER STARTED] Auto-scaling every 24 hours');

  setInterval(async () => {
    const timestamp = new Date().toISOString();
    console.log(\[AUTO-SCALE RUN] \\);
    await autoScaleCampaigns();
  }, 1000 * 60 * 60 * 24); // every 24 hours
}

runScheduler();
