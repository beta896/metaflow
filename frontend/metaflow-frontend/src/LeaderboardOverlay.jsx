import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function LeaderboardOverlay() {
  const [snapshot, setSnapshot] = useState(null);
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      const latest = all[all.length - 1];
      setSnapshot(latest);

      const sorted = [...latest.earnings].sort((a, b) => {
        const tierLevels = ["starter", "bronze", "silver", "gold"];
        const tierScore = tierLevels.indexOf(b.tier.toLowerCase()) - tierLevels.indexOf(a.tier.toLowerCase());
        const referralScore = b.referrals - a.referrals;
        const profitScore = b.profit - a.profit;
        return tierScore * 3 + referralScore * 0.5 + profitScore * 0.01;
      });

      setTopContributors(sorted.slice(0, 3));
    }
  }, []);

  return (
    <div className="widget leaderboard-overlay">
      <h2>🌟 Top Contributors</h2>
      <div className="overlay-grid">
        {topContributors.map((c, i) => (
          <div key={i} className="overlay-card glow-tier">
            <h3>{c.name} ({c.referralCode})</h3>
            <p>Tier: {c.tier} | Referrals: {c.referrals} | Profit: ${c.profit}</p>
            <span className="ribbon">#{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
