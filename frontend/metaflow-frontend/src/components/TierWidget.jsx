import React, { useEffect, useState } from "react";

export default function TierWidget({ email }) {
  const [tierData, setTierData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/contributors")
      .then(res => res.json())
      .then(data => {
        const contributor = data.find(c => c.email === email);
        if (contributor) setTierData(contributor);
      });
  }, [email]);

  return (
    <div>
      <h3>🗺️ Tier Map</h3>
      {tierData ? (
        <ul>
          <li>Email: {tierData.email}</li>
          <li>Tier: {tierData.tier}</li>
          <li>Engagement: {tierData.engagement}%</li>
        </ul>
      ) : (
        <p>Loading tier data...</p>
      )}
    </div>
  );
}
