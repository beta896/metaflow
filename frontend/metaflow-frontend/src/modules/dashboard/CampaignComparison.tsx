import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CampaignComparison() {
  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/performance')
      .then(res => setReport(res.data))
      .catch(err => console.error('[COMPARISON ERROR]', err.message));
  }, []);

  const scaled = report.filter(r => r.performance === 'Overperformed');
  const paused = report.filter(r => r.performance === 'Underperformed');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>?? Scaled vs Paused Campaigns</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3>? Scaled Campaigns</h3>
          {scaled.map((r, idx) => (
            <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', background: '#e6ffe6' }}>
              <p><strong>{r.campaign}</strong></p>
              <p>Forecasted: </p>
              <p>Actual: </p>
              <p>Delta: </p>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h3>?? Paused Campaigns</h3>
          {paused.map((r, idx) => (
            <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', background: '#ffe6e6' }}>
              <p><strong>{r.campaign}</strong></p>
              <p>Forecasted: </p>
              <p>Actual: </p>
              <p>Delta: </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
