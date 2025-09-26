import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function AffiliateSpotlight() {
  const [snapshot, setSnapshot] = useState(null);
  const [topProfit, setTopProfit] = useState(null);
  const [topReferrals, setTopReferrals] = useState(null);
  const [topTier, setTopTier] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      const latest = all[all.length - 1];
      setSnapshot(latest);
    }
  }, []);

  useEffect(() => {
    if (!snapshot) return;

    const earnings = snapshot.earnings;

    const profitLeader = [...earnings].sort((a, b) => b.profit - a.profit)[0];
    const referralLeader = [...earnings].sort((a, b) => b.referrals - a.referrals)[0];
    const tierLeader = earnings.find(a => a.tier.toLowerCase() === "gold");

    setTopProfit(profitLeader);
    setTopReferrals(referralLeader);
    setTopTier(tierLeader);
  }, [snapshot]);

  return (
    <div className="widget affiliate-spotlight">
      <h2>🌟 Affiliate Spotlight</h2>
      <ul>
        {topProfit && (
          <li className="spotlight-flash">💰 Top Earner: {topProfit.name} (${topProfit.profit})</li>
        )}
        {topReferrals && (
          <li className="spotlight-flash">📣 Most Referrals: {topReferrals.name} ({topReferrals.referrals})</li>
        )}
        {topTier && (
          <li className="spotlight-flash">🥇 First Gold Tier: {topTier.name}</li>
        )}
      </ul>
    </div>
  );
}
import TierBadge from "./TierBadge.jsx";
// ...
{a.name} <TierBadge tier={a.tier} />
import MilestoneBadge from "./MilestoneBadge.jsx";
// ...
{a.name} <MilestoneBadge affiliate={a} />
