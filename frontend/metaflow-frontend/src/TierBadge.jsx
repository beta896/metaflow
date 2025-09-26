import React from "react";
import "./cockpit.css";

export default function TierBadge({ tier }) {
  const tierClass = `badge-${tier.toLowerCase()}`;
  return (
    <span className={`tier-badge ${tierClass}`}>
      {tier}
    </span>
  );
}
