import { formatBatchLogsToCSV } from './formatBatchLogsToCSV';
import { formatVerdictsToCSV } from './formatVerdictsToCSV';
import { formatForecastsToCSV } from './formatForecastsToCSV';
import { formatScalingLogsToCSV } from './formatScalingLogsToCSV';
import axios from 'axios';

async function deliverCSV(name: string, csv: string) {
  try {
    await axios.post(process.env.CSV_DELIVERY_WEBHOOK, {
      filename: \\.csv\,
      content: csv
    });
    console.log(\[DELIVERED] \.csv\);
  } catch (err) {
    console.error(\[DELIVERY ERROR] \\, err.message);
  }
}

export async function runScheduledCSVDelivery() {
  console.log('[SCHEDULED DELIVERY STARTED]');

  const batchCSV = await formatBatchLogsToCSV();
  const verdictCSV = await formatVerdictsToCSV();
  const forecastCSV = await formatForecastsToCSV();
  const scalingCSV = await formatScalingLogsToCSV();

  await deliverCSV('batch_logs', batchCSV);
  await deliverCSV('verdicts', verdictCSV);
  await deliverCSV('forecasts', forecastCSV);
  await deliverCSV('scaling_logs', scalingCSV);

  console.log('[SCHEDULED DELIVERY COMPLETE]');
}
import { logDeliveryToNotion } from './logDeliveryToNotion';
  await logDeliveryToNotion(name + '.csv', 'Delivered');
