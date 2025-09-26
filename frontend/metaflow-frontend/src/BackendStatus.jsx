import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function BackendStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    fetch("http://localhost:3002/api/users")
      .then(res => res.ok ? setStatus("online") : setStatus("error"))
      .catch(() => setStatus("offline"));
  }, []);

  const colorMap = {
    checking: "#ff9800",
    online: "#4caf50",
    offline: "#f44336",
    error: "#e91e63"
  };

  return (
    <div className="widget backend-status" style={{ borderLeft: `6px solid ${colorMap[status]}` }}>
      <h2>🛠 Backend Status</h2>
      <p>Status: <strong>{status.toUpperCase()}</strong></p>
    </div>
  );
}
