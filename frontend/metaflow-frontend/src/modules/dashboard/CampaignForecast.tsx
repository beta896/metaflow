import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CampaignForecast() {
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/forecast')
      .then(res => setForecast(res.data))
      .catch(err => console.error('[FORECAST ERROR]', err.message));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📈 Campaign Revenue Forecast</h2>
      {forecast.map((f, idx) => (
        <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <p><strong>Campaign:</strong> {f.campaign}</p>
          <p><strong>Profiles Analyzed:</strong> {f.profileCount}</p>
          <p><strong>Average Revenue:</strong> </p>
          <p><strong>Projected Revenue (next 100 profiles):</strong> </p>
        </div>
      ))}
    </div>
  );
}
