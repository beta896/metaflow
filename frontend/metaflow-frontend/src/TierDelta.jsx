import React, { useState, useEffect } from "react";
import "./cockpit.css";

export default function TierDelta() {
  const [snapshots, setSnapshots] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  if (snapshots.length < 2) return <p>📉 Not enough snapshots to compare tier transitions.</p>;

  const first = snapshots[firstIndex];
  const second = snapshots[secondIndex];

  const getTierMap = (snapshot) => {
    const map = {};
    snapshot.earnings.forEach(a => {
      map[a.referralCode] = a.tier;
    });
    return map;
  };

  const firstMap = getTierMap(first);
  const secondMap = getTierMap(second);

  const transitions = Object.keys(secondMap).map(code => {
    const from = firstMap[code] || "N/A";
    const to = secondMap[code];
    return { code, from, to };
  }).filter(t => t.from !== t.to);

  return (
    <div className="widget tier-delta">
      <h2>🔁 Tier Transitions</h2>
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

      {transitions.length === 0 ? (
        <p>✅ No tier changes detected.</p>
      ) : (
        <ul>
          {transitions.map(t => (
            <li key={t.code}>
              {t.code}: {t.from} → {t.to}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
