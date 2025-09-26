import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function VelocityLeaderboard() {
  const [snapshots, setSnapshots] = useState([]);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      setSnapshots(all);
    }
  }, []);

  useEffect(() => {
    if (snapshots.length < 2) return;

    const prev = snapshots[snapshots.length - 2];
    const curr = snapshots[snapshots.length - 1];

    const velocityMap = curr.earnings.map(a => {
      const before = prev.earnings.find(p => p.referralCode === a.referralCode);
      if (!before) return null;

      const tierLevels = ["starter", "bronze", "silver", "gold"];
      const tierDelta = tierLevels.indexOf(a.tier.toLowerCase()) - tierLevels.indexOf(before.tier.toLowerCase());
      const referralDelta = a.referrals - before.referrals;
      const profitDelta = a.profit - before.profit;

      return {
        name: a.name,
        code: a.referralCode,
        tierDelta,
        referralDelta,
        profitDelta,
        score: tierDelta * 3 + referralDelta * 0.5 + profitDelta * 0.01
      };
    }).filter(Boolean);

    const sorted = velocityMap.sort((a, b) => b.score - a.score);
    setRankings(sorted);
  }, [snapshots]);

  return (
    <div className="widget velocity-leaderboard">
      <h2>🏁 Velocity Leaderboard</h2>
      {rankings.length === 0 ? (
        <p>No velocity data available.</p>
      ) : (
        <ol>
          {rankings.map((r, i) => (
            <li key={i}>
              {r.name} ({r.code}) → Score: {r.score.toFixed(2)} | ΔTier: {r.tierDelta}, ΔReferrals: {r.referralDelta}, ΔProfit: ${r.profitDelta}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
