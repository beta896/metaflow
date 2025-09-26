import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function EscalationAlert() {
  const [snapshots, setSnapshots] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      setSnapshots(all);
    }
  }, []);

  useEffect(() => {
    if (snapshots.length < 2) return;

    const prev = snapshots[snapshots.length - 2];
    const latest = snapshots[snapshots.length - 1];

    const prevMap = {};
    prev.earnings.forEach(a => { prevMap[a.referralCode] = a.tier; });

    const upgrades = latest.earnings
      .filter(a => {
        const before = prevMap[a.referralCode];
        return before && before !== a.tier;
      })
      .map(a => ({
        name: a.name,
        from: prevMap[a.referralCode],
        to: a.tier
      }));

    setAlerts(upgrades);
  }, [snapshots]);

  return (
    <div className="widget escalation-alert">
      <h2>⚡ Escalation Alerts</h2>
      {alerts.length === 0 ? (
        <p>No new tier upgrades detected.</p>
      ) : (
        <ul>
          {alerts.map((a, i) => (
            <li key={i} className="escalation-flash">
              {a.name} escalated from {a.from} → {a.to}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
