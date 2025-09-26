import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function BadgeUnlockLog() {
  const [snapshot, setSnapshot] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    const badgeHistory = JSON.parse(localStorage.getItem("badgeUnlockLog") || "[]");

    if (stored) {
      const all = JSON.parse(stored);
      const latest = all[all.length - 1];
      setSnapshot(latest);

      const newLog = [];

      latest.earnings.forEach(a => {
        const earned = [];

        if (a.profit >= 10000) earned.push("💰 Profit Master");
        if (a.referrals >= 100) earned.push("📣 Referral Champion");
        if (["bronze", "silver", "gold"].includes(a.tier.toLowerCase())) earned.push("🥇 Tier Upgraded");

        earned.forEach(badge => {
          const key = `${a.referralCode}-${badge}`;
          if (!badgeHistory.find(e => e.key === key)) {
            badgeHistory.push({ key, timestamp: new Date().toISOString(), name: a.name, badge });
            newLog.push({ name: a.name, badge, timestamp: new Date().toISOString() });
          }
        });
      });

      localStorage.setItem("badgeUnlockLog", JSON.stringify(badgeHistory));
      setLog(newLog);
    }
  }, []);

  return (
    <div className="widget badge-unlock-log">
      <h2>🎉 Badge Unlock Rituals</h2>
      {log.length === 0 ? (
        <p>No new badges earned in this snapshot.</p>
      ) : (
        <ul>
          {log.map((entry, i) => (
            <li key={i}>
              {entry.name} unlocked <strong>{entry.badge}</strong> at {new Date(entry.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
import BadgeFlash from "./BadgeFlash.jsx";
<BadgeFlash badge={entry.badge} />
