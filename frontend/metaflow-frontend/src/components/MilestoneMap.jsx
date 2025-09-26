import React, { useEffect, useState } from "react";

export default function MilestoneMap() {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/milestones")
      .then(res => res.json())
      .then(data => setMilestones(data))
      .catch(() => console.error("❌ Milestone fetch failed"));
  }, []);

  return (
    <div>
      <h3>📍 Milestone Map</h3>
      <ul>
        {milestones.map((m, index) => (
          <li key={index}>
            <strong>{m.title}</strong> — {m.verdict}  
            <br />
            Tier: {m.tier} | Time: {new Date(m.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
