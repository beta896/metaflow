import React, { useEffect, useState } from "react";

export default function SystemSnapshot() {
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/snapshot")
      .then(res => res.json())
      .then(data => setSnapshot(data))
      .catch(() => console.error("❌ Snapshot fetch failed"));
  }, []);

  return (
    <div>
      <h3>📦 System Snapshot</h3>
      {snapshot ? (
        <div>
          <p><strong>Timestamp:</strong> {new Date(snapshot.timestamp).toLocaleString()}</p>
          <p><strong>Profit:</strong> {snapshot.profit}</p>
          <h4>Milestones:</h4>
          <ul>{snapshot.milestones.map((m, i) => <li key={i}>{m}</li>)}</ul>
          <h4>Contributors:</h4>
          <ul>
            {snapshot.contributors.map((c, i) => (
              <li key={i}>
                {c.email} — {c.tier} — {c.engagement}% — {c.verdict}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading snapshot...</p>
      )}
    </div>
  );
}
