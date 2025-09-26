import RoleBadge from "./components/RoleBadge";
import React, { useState } from 'react';
import { classifyProfile } from './components/profileClassification';

export default function UserPage() {
  const [role, setRole] = useState('');
  const [socials, setSocials] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [engagementRate, setEngagementRate] = useState(0);
  const [verdict, setVerdict] = useState(null);

  const toggleSocial = (platform) => {
    setSocials(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleClassify = () => {
    const profile = { followers, engagementRate, socials };
    const result = classifyProfile(profile);
    setVerdict(result);
  };

  return (
    <div>
      <h1>👤 User Onboarding</h1>

      <label>Choose Role:</label>
      <select onChange={e => setRole(e.target.value)}>
        <option value=''>Select</option>
        <option value='influencer'>Influencer</option>
        <option value='brand'>Brand</option>
      </select>

      <label>Followers:</label>
      <input type='number' value={followers} onChange={e => setFollowers(Number(e.target.value))} />

      <label>Engagement Rate (0.0 - 1.0):</label>
      <input type='number' step='0.01' value={engagementRate} onChange={e => setEngagementRate(Number(e.target.value))} />

      <label>Link Social Accounts:</label>
      {['Instagram', 'TikTok', 'LinkedIn'].map(platform => (
        <div key={platform}>
          <input
            type='checkbox'
            checked={socials.includes(platform)}
            onChange={() => toggleSocial(platform)}
          />
          {platform}
        </div>
      ))}

      <button onClick={handleClassify}>Submit & Classify</button>

      {verdict && (
        <div>
          <h3>🧠 Classification Verdict</h3>
          <p>Tier: {verdict.tier}</p>
          <p>Category: {verdict.category}</p>
          <p>Engagement Score: {verdict.engagementScore}</p>
          <p>Offers: {verdict.offers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

