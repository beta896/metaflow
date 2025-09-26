import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function TierAscensionLog() {
  const [snapshots, setSnapshots] = useState([]);
  const [ascensions, setAscensions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      setSnapshots(all);
    }
  }, []);

  useEffect(() => {
    if (snapshots.length < 2) return;

    const log = [];
    for (let i = 1; i < snapshots.length; i++) {
      const prev = snapshots[i - 1];
      const curr = snapshots[i];

      const prevMap = {};
      prev.earnings.forEach(a => { prevMap[a.referralCode] = a.tier; });

      curr.earnings.forEach(a => {
        const before = prevMap[a.referralCode];
        if (before && before !== a.tier) {
          log.push({
            name: a.name,
            code: a.referralCode,
            from: before,
            to: a.tier,
            timestamp: curr.timestamp,
            snapshot: i + 1
          });
        }
      });
    }

    setAscensions(log);
  }, [snapshots]);

  return (
    <div className="widget tier-ascension-log">
      <h2>🚀 Tier Ascension Log</h2>
      {ascensions.length === 0 ? (
        <p>No tier upgrades detected across snapshots.</p>
      ) : (
        <ul>
          {ascensions.map((a, i) => (
            <li key={i}>
              {a.name} ({a.code}) ascended from <strong>{a.from}</strong> to <strong>{a.to}</strong> 
              in Snapshot {a.snapshot} at {new Date(a.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
