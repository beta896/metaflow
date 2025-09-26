import React, { useEffect, useState } from "react";
import BadgeFlash from "./BadgeFlash.jsx";
import "./cockpit.css";

export default function SpotlightTrigger() {
  const [snapshot, setSnapshot] = useState(null);
  const [spotlight, setSpotlight] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      const latest = all[all.length - 1];
      setSnapshot(latest);

      const spotlighted = latest.earnings.filter(a =>
        ["bronze", "silver", "gold"].includes(a.tier.toLowerCase()) ||
        a.referrals >= 100 ||
        a.profit >= 10000
      );

      setSpotlight(spotlighted);
    }
  }, []);

  return (
    <div className="widget spotlight-trigger">
      <h2>🔦 Affiliate Spotlight</h2>
      {spotlight.length === 0 ? (
        <p>No spotlight triggers activated in this snapshot.</p>
      ) : (
        <div className="spotlight-grid">
          {spotlight.map((a, i) => (
            <div key={i} className="spotlight-card glow-tier">
              <h3>{a.name} ({a.referralCode})</h3>
              <p>Tier: {a.tier} | Referrals: {a.referrals} | Profit: ${a.profit}</p>
              <BadgeFlash badge="🌟 Spotlight Activated" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import TierGlow from "./TierGlow.jsx";
<TierGlow tier={a.tier} />
