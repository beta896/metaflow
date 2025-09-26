import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TrafficVisualizer() {
  const [verdicts, setVerdicts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/verdicts')
      .then(res => setVerdicts(res.data))
      .catch(err => console.error('[FETCH ERROR]', err.message));
  }, []);

  const tierCounts = verdicts.reduce((acc, v) => {
    acc[v.verdict.tier] = (acc[v.verdict.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryCounts = verdicts.reduce((acc, v) => {
    acc[v.verdict.category] = (acc[v.verdict.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalRevenue = verdicts.reduce((sum, v) => sum + v.estimatedRevenue, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📈 Traffic Simulation Overview</h2>

      <div style={{ marginBottom: '1rem' }}>
        <h4>Tier Distribution</h4>
        {Object.entries(tierCounts).map(([tier, count]) => (
          <p key={tier}><strong>{tier}:</strong> {count} profiles</p>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4>Category Breakdown</h4>
        {Object.entries(categoryCounts).map(([cat, count]) => (
          <p key={cat}><strong>{cat}:</strong> {count} profiles</p>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4>Total Simulated Revenue</h4>
        <p><strong></strong> USD</p>
      </div>
    </div>
  );
}
const campaignCounts = verdicts.reduce((acc, v) => {
  const tag = v.profile.campaign || 'Unlabeled';
  acc[tag] = (acc[tag] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

<div style={{ marginBottom: '1rem' }}>
  <h4>Campaign Breakdown</h4>
  {Object.entries(campaignCounts).map(([tag, count]) => (
    <p key={tag}><strong>{tag}:</strong> {count} profiles</p>
  ))}
</div>
