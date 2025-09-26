import React, { useState, useEffect } from "react";
import "./cockpit.css";

export default function SnapshotDeltaSummary() {
  const [snapshots, setSnapshots] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  if (snapshots.length < 2) return <p>📉 Not enough snapshots to summarize deltas.</p>;

  const first = snapshots[firstIndex];
  const second = snapshots[secondIndex];

  const totalProfit = snap => snap.earnings.reduce((sum, a) => sum + a.profit, 0);
  const totalReferrals = snap => snap.earnings.reduce((sum, a) => sum + a.referrals, 0);
  const totalEscalations = snap => snap.escalationLog.length;

  const profitDelta = totalProfit(second) - totalProfit(first);
  const referralDelta = totalReferrals(second) - totalReferrals(first);
  const escalationDelta = totalEscalations(second) - totalEscalations(first);

  return (
    <div className="widget delta-summary">
      <h2>📌 Snapshot Delta Summary</h2>
      <label>Compare:</label>
      <select onChange={e => setFirstIndex(Number(e.target.value))} value={firstIndex}>
        {snapshots.map((s, i) => (
          <option key={i} value={i}>Snapshot {i + 1} - {new Date(s.timestamp).toLocaleString()}</option>
        ))}
      </select>
      <span> vs </span>
      <select onChange={e => setSecondIndex(Number(e.target.value))} value={secondIndex}>
        {snapshots.map((s, i) => (
          <option key={i} value={i}>Snapshot {i + 1} - {new Date(s.timestamp).toLocaleString()}</option>
        ))}
      </select>

      <ul>
        <li><strong>Profit Delta:</strong> ${profitDelta.toLocaleString()}</li>
        <li><strong>Referral Delta:</strong> {referralDelta}</li>
        <li><strong>Escalation Delta:</strong> {escalationDelta}</li>
      </ul>
    </div>
  );
}
