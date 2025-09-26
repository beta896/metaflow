import React, { useEffect, useState } from "react";
import "./cockpit.css";

export default function MilestoneLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("milestoneLog");
    if (stored) {
      setLogs(JSON.parse(stored));
    }
  }, []);

  const renderLog = (log) => {
    return `${new Date(log.timestamp).toLocaleString()} — ${log.message}`;
  };

  return (
    <div className="widget milestone-log">
      <h2>📜 Milestone Log</h2>
      {logs.length === 0 ? (
        <p>No milestones recorded yet.</p>
      ) : (
        <ul>
          {logs.map((log, i) => (
            <li key={i}>{renderLog(log)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
