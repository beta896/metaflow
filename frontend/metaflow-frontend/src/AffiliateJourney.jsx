import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function AffiliateJourney() {
  const [snapshots, setSnapshots] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [journey, setJourney] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!selectedCode || snapshots.length === 0) return;

    const path = snapshots.map((snap, index) => {
      const match = snap.earnings.find(a => a.referralCode === selectedCode);
      if (!match) return null;
      return {
        snapshot: index + 1,
        timestamp: snap.timestamp,
        tier: match.tier,
        referrals: match.referrals,
        profit: match.profit
      };
    }).filter(Boolean);

    setJourney(path);
  }, [selectedCode, snapshots]);

  const allCodes = [...new Set(snapshots.flatMap(s => s.earnings.map(a => a.referralCode)))];

  return (
    <div className="widget affiliate-journey">
      <h2>🛤️ Affiliate Journey Map</h2>
      <label>Select Affiliate:</label>
      <select onChange={e => setSelectedCode(e.target.value)} value={selectedCode}>
        <option value="">-- Select --</option>
        {allCodes.map(code => (
          <option key={code} value={code}>{code}</option>
        ))}
      </select>

      {journey.length === 0 ? (
        <p>No journey data available.</p>
      ) : (
        <ul>
          {journey.map((j, i) => (
            <li key={i}>
              Snapshot {j.snapshot} ({new Date(j.timestamp).toLocaleString()}): 
              Tier → {j.tier}, Referrals → {j.referrals}, Profit → ${j.profit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
