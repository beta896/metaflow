import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function RitualSummary() {
  const [snapshots, setSnapshots] = useState([]);
  const [cadence, setCadence] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      setSnapshots(all);
    }
  }, []);

  useEffect(() => {
    if (snapshots.length < 2) return;

    const timestamps = snapshots.map(s => new Date(s.timestamp));
    const intervals = [];

    for (let i = 1; i < timestamps.length; i++) {
      const delta = (timestamps[i] - timestamps[i - 1]) / (1000 * 60 * 60); // hours
      intervals.push(delta);
    }

    const avgInterval = (intervals.reduce((sum, i) => sum + i, 0) / intervals.length).toFixed(2);
    const latest = snapshots[snapshots.length - 1];

    const tierCounts = latest.tiers.map(t => `${t.tier}: ${t.count}`).join(", ");

    setCadence({
      snapshotCount: snapshots.length,
      avgInterval,
      latestTimestamp: latest.timestamp,
      tierSummary: tierCounts
    });
  }, [snapshots]);

  return (
    <div className="widget ritual-summary">
      <h2>🧭 Ritual Summary</h2>
      {cadence ? (
        <ul>
          <li><strong>Total Snapshots:</strong> {cadence.snapshotCount}</li>
          <li><strong>Avg Time Between Snapshots:</strong> {cadence.avgInterval} hours</li>
          <li><strong>Last Snapshot:</strong> {new Date(cadence.latestTimestamp).toLocaleString()}</li>
          <li><strong>Tier Distribution:</strong> {cadence.tierSummary}</li>
        </ul>
      ) : (
        <p>📉 Not enough snapshots to summarize cadence.</p>
      )}
    </div>
  );
}
