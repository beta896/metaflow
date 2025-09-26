import React from "react";
import "./cockpit.css";

export default function MilestoneBadge({ affiliate }) {
  const badges = [];

  if (affiliate.profit >= 10000) {
    badges.push("💰 Profit Master");
  }

  if (affiliate.referrals >= 100) {
    badges.push("📣 Referral Champion");
  }

  if (["bronze", "silver", "gold"].includes(affiliate.tier.toLowerCase())) {
    badges.push("🥇 Tier Upgraded");
  }

  return (
    <div className="milestone-badge">
      {badges.map((b, i) => (
        <span key={i} className="badge-flash">{b}</span>
      ))}
    </div>
  );
}
