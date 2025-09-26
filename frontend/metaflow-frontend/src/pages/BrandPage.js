import React from 'react';

export default function BrandPage({ profile }) {
  return (
    <div>
      <h1>🏷️ Brand Dashboard</h1>
      <p>Brand Name: {profile.name}</p>
      <p>Industry: {profile.industry}</p>
      <p>Linked Accounts: {profile.socials.join(', ')}</p>
      <p>Offers Sent: {profile.offersSent.join(', ')}</p>
    </div>
  );
}
