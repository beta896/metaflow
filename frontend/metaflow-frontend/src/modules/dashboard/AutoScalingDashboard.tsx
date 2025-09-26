import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AutoScalingDashboard() {
  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/performance')
      .then(res => setReport(res.data))
      .catch(err => console.error('[AUTO-SCALE ERROR]', err.message));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>⚙️ Auto-Scaling Decisions</h2>
      {report.map((r, idx) => (
        <div key={idx} style={{
          marginBottom: '1rem',
          padding: '1rem',
          border: '1px solid #ccc',
          background: r.performance === 'Overperformed' ? '#e6ffe6' : '#ffe6e6'
        }}>
          <p><strong>Campaign:</strong> {r.campaign}</p>
          <p><strong>Forecasted Revenue:</strong> </p>
          <p><strong>Actual Revenue:</strong> </p>
          <p><strong>Delta:</strong> </p>
          <p><strong>Decision:</strong> {r.performance === 'Overperformed' ? 'Scaled (10 new profiles)' : 'Paused'}</p>
        </div>
      ))}
    </div>
  );
}
