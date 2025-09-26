import React from "react";
import { useNavigate } from "react-router-dom";
import "./cockpit.css";

export default function CockpitIntro() {
  const navigate = useNavigate();

  return (
    <div className="cockpit-intro">
      <h1>🧠 Welcome to Metaflow Cockpit</h1>
      <p>This dashboard is your tactical command center—tracking referrals, profit, tier upgrades, and symbolic verdicts across the affiliate engine.</p>
      <ul>
        <li>📊 Tier Map: Distribution across Gold, Silver, Bronze, Starter</li>
        <li>💰 Earnings: Real-time profit and referral counts</li>
        <li>🧠 Escalation Log: Narrated tier upgrades and milestones</li>
      </ul>
      <button onClick={() => navigate("/dashboard")}>🚀 Enter Cockpit</button>
    </div>
  );
}
