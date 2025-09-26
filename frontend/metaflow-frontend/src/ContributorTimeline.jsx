import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function ContributorTimeline() {
  const [snapshots, setSnapshots] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [timeline, setTimeline] = useState([]);

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

    setTimeline(path);
  }, [selectedCode, snapshots]);

  const allCodes = [...new Set(snapshots.flatMap(s => s.earnings.map(a => a.referralCode)))];

  return (
    <div className="widget contributor-timeline">
      <h2>🧭 Contributor Timeline</h2>
      <label>Select Affiliate:</label>
      <select onChange={e => setSelectedCode(e.target.value)} value={selectedCode}>
        <option value="">-- Select --</option>
        {allCodes.map(code => (
          <option key={code} value={code}>{code}</option>
        ))}
      </select>

      {timeline.length === 0 ? (
        <p>No timeline data available.</p>
      ) : (
        <ul>
          {timeline.map((t, i) => (
            <li key={i}>
              Snapshot {t.snapshot} ({new Date(t.timestamp).toLocaleString()}): 
              Tier → {t.tier}, Referrals → {t.referrals}, Profit → ${t.profit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
