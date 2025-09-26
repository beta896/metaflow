import React, { useEffect, useState } from "react";

export default function ProfitWidget() {
  const [profitData, setProfitData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/profit")
      .then(res => res.json())
      .then(data => setProfitData(data))
      .catch(() => console.error("❌ Profit fetch failed"));
  }, []);

  return (
    <div>
      <h3>📈 Profit Tracker</h3>
      {profitData ? (
        <ul>
          <li>Contributor: {profitData.contributor}</li>
          <li>Engagement: {profitData.engagement}</li>
          <li>Tier: {profitData.tier}</li>
          <li>Verdict: {profitData.verdict}</li>
          <li>Profit: {profitData.profit}</li>
          <li>Timestamp: {profitData.timestamp}</li>
        </ul>
      ) : (
        <p>Loading profit data...</p>
      )}
    </div>
  );
}
