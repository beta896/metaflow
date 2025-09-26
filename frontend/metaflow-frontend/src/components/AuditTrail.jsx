import React, { useEffect, useState } from "react";

export default function AuditTrail() {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/audit-trail")
      .then(res => res.json())
      .then(data => setTrail(data))
      .catch(() => console.error("❌ Audit trail fetch failed"));
  }, []);

  return (
    <div>
      <h3>🧾 Audit Trail</h3>
      <ul>
        {trail.map((entry, index) => (
          <li key={index}>
            <strong>{entry.contributor}</strong> — {entry.action}  
            ({entry.tier}, {entry.engagement}%)  
            <br />
            <em>{entry.timestamp}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
