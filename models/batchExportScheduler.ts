import { exportBatchLogs } from './exportBatchLogs';

function runExportScheduler() {
  console.log('[EXPORT SCHEDULER STARTED] Exporting batch logs every 24 hours');

  setInterval(async () => {
    const timestamp = new Date().toISOString();
    console.log(\[EXPORT RUN] \\);
    const batches = await exportBatchLogs();
    console.log(\[BATCHES EXPORTED] Count: \\);
  }, 1000 * 60 * 60 * 24); // every 24 hours
}

runExportScheduler();
