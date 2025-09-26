import React, { useEffect } from 'react';
import { classifyProfile } from '../../components/profileClassification/profileClassification';
import { generateOffers } from '../../components/profileClassification/generateOffers';
import { sendVerdict } from './sendVerdict';

type Props = {
  profile: {
    followers: number;
    engagementRate: number;
    socials: string[];
  };
};

const OfferVerdict: React.FC<Props> = ({ profile }) => {
  const verdict = classifyProfile(profile);
  const offers = generateOffers(verdict.category, verdict.tier);
  const conversionPotential = Math.round((verdict.engagementScore / 100) * (offers.length * 10));
  const estimatedRevenue = Math.round(offers.length * (conversionPotential / 100) * 15); // avg payout

  useEffect(() => {
    sendVerdict(profile, verdict, offers, conversionPotential, estimatedRevenue);
  }, []);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>📊 Classification Verdict</h3>
      <p><strong>Tier:</strong> {verdict.tier}</p>
      <p><strong>Category:</strong> {verdict.category}</p>
      <p><strong>Engagement Score:</strong> {verdict.engagementScore}</p>
      <p><strong>Conversion Potential:</strong> {conversionPotential}</p>
      <p><strong>Estimated Revenue:</strong> </p>

      <h4>🎯 Recommended Offers</h4>
      <ul>
        {offers.map((offer, idx) => (
          <li key={idx}>{offer}</li>
        ))}
      </ul>
    </div>
  );
};

export default OfferVerdict;
