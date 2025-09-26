import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cockpit.css";

export default function EscalationLogWidget() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("/api/dashboard/escalation-log").then(res => {
      setLogs(res.data.escalationLog);
    });
  }, []);

  return (
    <div className="widget escalation-log">
      <h2>🧠 Escalation Log</h2>
      <ul>
        {logs.map(log => (
          <li key={log.referralCode} className="escalation-entry">
            ⚡ {log.verdict} ({new Date(log.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
