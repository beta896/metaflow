import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VerdictDashboard() {
  const [verdicts, setVerdicts] = useState<any[]>([]);
  const [tierFilter, setTierFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [revenueFilter, setRevenueFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/verdicts')
      .then(res => setVerdicts(res.data))
      .catch(err => console.error('[FETCH ERROR]', err.message));
  }, []);

  const filtered = verdicts.filter(v => {
    const tierMatch = tierFilter ? v.verdict.tier === tierFilter : true;
    const categoryMatch = categoryFilter ? v.verdict.category === categoryFilter : true;
    const revenueMatch = revenueFilter
      ? revenueFilter === 'high' ? v.estimatedRevenue >= 20
      : revenueFilter === 'mid' ? v.estimatedRevenue >= 10 && v.estimatedRevenue < 20
      : v.estimatedRevenue < 10
      : true;
    return tierMatch && categoryMatch && revenueMatch;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Verdict Dashboard</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Tier: </label>
        <select onChange={e => setTierFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Tier 1">Tier 1</option>
          <option value="Tier 2">Tier 2</option>
          <option value="Tier 3">Tier 3</option>
        </select>

        <label style={{ marginLeft: '1rem' }}>Category: </label>
        <select onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Fashion">Fashion</option>
          <option value="Tech">Tech</option>
          <option value="General">General</option>
        </select>

        <label style={{ marginLeft: '1rem' }}>Revenue: </label>
        <select onChange={e => setRevenueFilter(e.target.value)}>
          <option value="">All</option>
          <option value="high">High (≥ )</option>
          <option value="mid">Mid (–)</option>
          <option value="low">Low (< )</option>
        </select>
      </div>

      {filtered.map((v, idx) => (
        <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <p><strong>Followers:</strong> {v.profile.followers}</p>
          <p><strong>Engagement Rate:</strong> {v.profile.engagementRate}</p>
          <p><strong>Tier:</strong> {v.verdict.tier}</p>
          <p><strong>Category:</strong> {v.verdict.category}</p>
          <p><strong>Offers:</strong> {v.offers.join(', ')}</p>
          <p><strong>Conversion Potential:</strong> {v.conversionPotential}</p>
          <p><strong>Estimated Revenue:</strong> </p>
          <p><strong>Timestamp:</strong> {v.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
import { scorePortfolio } from './portfolioScorer';

const portfolio = scorePortfolio(filtered);

<div style={{ marginBottom: '2rem', padding: '1rem', background: '#f9f9f9', border: '1px solid #ddd' }}>
  <h3>📈 Portfolio Summary</h3>
  <p><strong>Profiles:</strong> {portfolio.profileCount}</p>
  <p><strong>Total Revenue:</strong> </p>
  <p><strong>Average Engagement:</strong> {portfolio.avgEngagement}%</p>
  <p><strong>Offer Density:</strong> {portfolio.offerDensity} offers/profile</p>
</div>
import { exportToCSV } from './exportToCSV';

<button onClick={() => exportToCSV(filtered)}>📤 Export to CSV</button>
import { comparePortfolios } from './comparePortfolios';

const portfolios = comparePortfolios([
  { name: 'Fashion Creators', verdicts: filtered.filter(v => v.verdict.category === 'Fashion') },
  { name: 'Tech Influencers', verdicts: filtered.filter(v => v.verdict.category === 'Tech') },
  { name: 'General Pool', verdicts: filtered.filter(v => v.verdict.category === 'General') }
]);

<div style={{ marginTop: '2rem' }}>
  <h3>📊 Portfolio Comparison</h3>
  {portfolios.map((p, idx) => (
    <div key={idx} style={{ marginBottom: '1rem', padding: '1rem', border: '1px dashed #aaa' }}>
      <p><strong>Name:</strong> {p.name}</p>
      <p><strong>Profiles:</strong> {p.profileCount}</p>
      <p><strong>Total Revenue:</strong> </p>
      <p><strong>Avg Engagement:</strong> {p.avgEngagement}%</p>
      <p><strong>Offer Density:</strong> {p.offerDensity}</p>
    </div>
  ))}
</div>
