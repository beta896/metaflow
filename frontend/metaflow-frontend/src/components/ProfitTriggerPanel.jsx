import React, { useEffect, useState } from "react";

export default function ProfitTriggerPanel() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/profit-trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "creator@buzzflow.io",
        profit: 148
      })
    })
      .then(res => res.json())
      .then(data => setResult(data));
  }, []);

  return (
    <div>
      <h3>🟣 Profit Trigger Panel</h3>
      {result ? (
        <ul>
          <li>Status: {result.status}</li>
          <li>Tier: {result.tier}</li>
        </ul>
      ) : (
        <p>Triggering profit logic...</p>
      )}
    </div>
  );
}
