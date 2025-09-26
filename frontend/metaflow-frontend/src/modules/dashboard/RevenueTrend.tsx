import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RevenueTrend() {
  const [verdicts, setVerdicts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/verdicts')
      .then(res => setVerdicts(res.data))
      .catch(err => console.error('[FETCH ERROR]', err.message));
  }, []);

  const batchRevenue = verdicts.reduce((acc, v) => {
    const batch = v.batchId || 'unlabeled';
    acc[batch] = (acc[batch] || 0) + v.estimatedRevenue;
    return acc;
  }, {} as Record<string, number>);

  const sortedBatches = Object.entries(batchRevenue).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Revenue Trend by Simulation Batch</h2>
      {sortedBatches.map(([batch, revenue], idx) => (
        <p key={idx}><strong>{batch}:</strong> </p>
      ))}
    </div>
  );
}
