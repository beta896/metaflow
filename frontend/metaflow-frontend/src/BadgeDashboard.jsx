import React, { useEffect, useState } from "react";
import MilestoneBadge from "./MilestoneBadge.jsx";
import "./cockpit.css";

export default function BadgeDashboard() {
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      setSnapshot(all[all.length - 1]);
    }
  }, []);

  if (!snapshot) return <p>📉 No snapshot available for badge dashboard.</p>;

  return (
    <div className="widget badge-dashboard">
      <h2>🏅 Affiliate Badge Dashboard</h2>
      <div className="badge-grid">
        {snapshot.earnings.map((a, i) => (
          <div key={i} className="badge-card">
            <h3>{a.name} ({a.referralCode})</h3>
            <p>Tier: {a.tier} | Profit: ${a.profit} | Referrals: {a.referrals}</p>
            <MilestoneBadge affiliate={a} />
          </div>
        ))}
      </div>
    </div>
  );
}
