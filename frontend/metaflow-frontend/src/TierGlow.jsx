import React from "react";
import "./cockpit.css";

export default function TierGlow({ tier }) {
  const tierColors = {
    starter: "#9e9e9e",
    bronze: "#cd7f32",
    silver: "#c0c0c0",
    gold: "#ffd700"
  };

  const glowColor = tierColors[tier.toLowerCase()] || "#9e9e9e";

  return (
    <div className="tier-glow" style={{ borderColor: glowColor }}>
      <span className="tier-label">{tier}</span>
    </div>
  );
}
