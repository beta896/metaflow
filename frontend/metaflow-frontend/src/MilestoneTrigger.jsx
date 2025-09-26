import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function MilestoneTrigger() {
  const [snapshot, setSnapshot] = useState(null);
  const [milestones, setMilestones] = useState([]);

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

    const triggers = [];

    const goldAffiliates = snapshot.earnings.filter(a => a.tier.toLowerCase() === "gold");
    if (goldAffiliates.length > 0) {
      triggers.push(`🥇 First Gold-tier affiliate(s): ${goldAffiliates.map(a => a.name).join(", ")}`);
    }

    const highEarners = snapshot.earnings.filter(a => a.profit >= 10000);
    if (highEarners.length > 0) {
      triggers.push(`💰 Affiliates with $10K+ profit: ${highEarners.map(a => a.name).join(", ")}`);
    }

    const referralChampions = snapshot.earnings.filter(a => a.referrals >= 100);
    if (referralChampions.length > 0) {
      triggers.push(`📣 Affiliates with 100+ referrals: ${referralChampions.map(a => a.name).join(", ")}`);
    }

    setMilestones(triggers);
  }, [snapshot]);

  return (
    <div className="widget milestone-trigger">
      <h2>🚨 Milestone Triggers</h2>
      {milestones.length === 0 ? (
        <p>No symbolic milestones detected yet.</p>
      ) : (
        <ul>
          {milestones.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      )}
    </div>
  );
}
const saveMilestone = (message) => {
  const existing = JSON.parse(localStorage.getItem("milestoneLog") || "[]");
  const updated = [...existing, { timestamp: new Date().toISOString(), message }];
  localStorage.setItem("milestoneLog", JSON.stringify(updated));
};
