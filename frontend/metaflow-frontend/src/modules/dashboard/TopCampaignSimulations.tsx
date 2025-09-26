import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopCampaignSimulations() {
  const [verdicts, setVerdicts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/verdicts')
      .then(res => setVerdicts(res.data))
      .catch(err => console.error('[TOP SIM ERROR]', err.message));
  }, []);

  const batchMap: Record<string, { campaign: string; count: number; revenue: number }> = {};

  verdicts.forEach(v => {
    const batchId = v.batchId || '';
    if (batchId.startsWith('campaign-')) {
      const parts = batchId.split('-');
      const campaign = parts[1];
      const key = batchId;
      if (!batchMap[key]) {
        batchMap[key] = { campaign, count: 0, revenue: 0 };
      }
      batchMap[key].count += 1;
      batchMap[key].revenue += v.estimatedRevenue;
    }
  });

  const sortedBatches = Object.entries(batchMap).sort((a, b) => b[1].revenue - a[1].revenue);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>?? Top Campaign Simulation Results</h2>
      {sortedBatches.map(([batchId, data], idx) => (
        <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <p><strong>Campaign:</strong> {data.campaign}</p>
          <p><strong>Batch ID:</strong> {batchId}</p>
          <p><strong>Profiles Simulated:</strong> {data.count}</p>
          <p><strong>Total Revenue:</strong> </p>
        </div>
      ))}
    </div>
  );
}
