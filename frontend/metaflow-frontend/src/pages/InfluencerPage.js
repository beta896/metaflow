import React from 'react';

export default function InfluencerPage({ profile }) {
  return (
    <div>
      <h1>🌟 Influencer Portal</h1>
      <p>Name: {profile.name}</p>
      <p>Followers: {profile.followers}</p>
      <p>Engagement Rate: {profile.engagementRate}</p>
      <p>Linked Accounts: {profile.socials.join(', ')}</p>
      <p>Offers: {profile.offers.join(', ')}</p>
    </div>
  );
}
