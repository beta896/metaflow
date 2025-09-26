import React, { useState } from "react";

export default function EscalationPanel() {
  const [verdict, setVerdict] = useState("");

  const escalateUser = async () => {
    const res = await fetch("http://localhost:3000/api/escalate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "mustafa.founder@neemotech7.in", trigger: "admin" })
    });
    const data = await res.json();
    setVerdict(data.verdict);
  };

  return (
    <div>
      <h3>🛡️ Escalation Panel</h3>
      <button onClick={escalateUser}>Trigger Admin Escalation</button>
      {verdict && <p>Verdict: {verdict}</p>}
    </div>
  );
}
