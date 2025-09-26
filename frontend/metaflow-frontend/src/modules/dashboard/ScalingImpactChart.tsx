import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScalingImpactChart() {
  const [verdicts, setVerdicts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/verdicts')
      .then(res => setVerdicts(res.data))
      .catch(err => console.error('[IMPACT ERROR]', err.message));
  }, []);

  const campaignMap: Record<string, { timestamp: string; revenue: number }[]> = {};

  verdicts.forEach(v => {
    const campaign = v.profile.campaign || 'Unlabeled';
    if (!campaignMap[campaign]) campaignMap[campaign] = [];
    campaignMap[campaign].push({ timestamp: v.timestamp, revenue: v.estimatedRevenue });
  });

  const sortedCampaigns = Object.entries(campaignMap).map(([campaign, data]) => {
    const sorted = data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    let cumulative = 0;
    const points = sorted.map(d => {
      cumulative += d.revenue;
      return { x: new Date(d.timestamp).toLocaleDateString(), y: cumulative };
    });
    return { campaign, points };
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>?? Cumulative Revenue Impact</h2>
      {sortedCampaigns.map((c, idx) => (
        <div key={idx} style={{ marginBottom: '2rem' }}>
          <h4>{c.campaign}</h4>
          <ul>
            {c.points.map((p, i) => (
              <li key={i}>{p.x}: </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
