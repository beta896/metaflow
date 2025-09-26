import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TierMapWidget() {
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    axios.get("/api/dashboard/tier-map").then(res => {
      setTiers(res.data.distribution);
    });
  }, []);

  return (
    <div className="widget tier-map">
      <h2>📊 Tier Distribution</h2>
      <ul>
        {tiers.map(t => (
          <li key={t.tier}>
            {t.tier}: {t.count} affiliates ({t.percentage})
          </li>
        ))}
      </ul>
    </div>
  );
}
