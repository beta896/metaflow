import { exportBatchLogs } from './exportBatchLogs';

export async function formatBatchLogsToCSV() {
  const logs = await exportBatchLogs();
  const headers = ['Campaign', 'ProfilesSimulated', 'TotalRevenue', 'Timestamp'];
  const rows = logs.map(log => [
    log.Campaign,
    log.ProfilesSimulated,
    log.TotalRevenue,
    log.Timestamp
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
  console.log('[CSV OUTPUT]\\n' + csv);
  return csv;
}
