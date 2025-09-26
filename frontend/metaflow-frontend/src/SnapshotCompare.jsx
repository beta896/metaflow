import React, { useState, useEffect } from "react";
import "./cockpit.css";

export default function SnapshotCompare() {
  const [snapshots, setSnapshots] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  if (snapshots.length < 2) return <p>📉 Not enough snapshots to compare.</p>;

  const first = snapshots[firstIndex];
  const second = snapshots[secondIndex];

  const totalProfit = snap => snap.earnings.reduce((sum, a) => sum + a.profit, 0);
  const totalReferrals = snap => snap.earnings.reduce((sum, a) => sum + a.referrals, 0);

  return (
    <div className="widget comparison-view">
      <h2>📊 Milestone Comparison</h2>
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

      <div className="comparison-grid">
        <div>
          <h3>📌 Snapshot A</h3>
          <p>Profit: ${totalProfit(first).toLocaleString()}</p>
          <p>Referrals: {totalReferrals(first)}</p>
          <p>Escalations: {first.escalationLog.length}</p>
        </div>
        <div>
          <h3>📌 Snapshot B</h3>
          <p>Profit: ${totalProfit(second).toLocaleString()}</p>
          <p>Referrals: {totalReferrals(second)}</p>
          <p>Escalations: {second.escalationLog.length}</p>
        </div>
      </div>
    </div>
  );
}
