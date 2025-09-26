import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cockpit.css";

export default function EarningsWidget() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/affiliate/earnings").then(res => {
      setData(res.data.earnings);
    });
  }, []);

  const getBadge = (tier) => {
    switch (tier.toLowerCase()) {
      case "gold": return "🥇";
      case "silver": return "🥈";
      case "bronze": return "🥉";
      default: return "🔰";
    }
  };

  return (
    <div className="widget earnings">
      <h2>💰 Affiliate Earnings</h2>
      <ul>
        {data.map(a => {
          const tierClass = `tier-${a.tier.toLowerCase()}`;
          const pulseClass = a.profit >= 10000 ? "pulse" : "";
          const badge = getBadge(a.tier);
          return (
            <li key={a.referralCode} className={`widget ${tierClass} ${pulseClass}`}>
              {badge} {a.name} → {a.tier} | ${a.profit} | {a.referrals} referrals
            </li>
          );
        })}
      </ul>
    </div>
  );
}
