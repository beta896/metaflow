import React, { useState } from "react";
import axios from "axios";

export default function SnapshotButton() {
  const [lastSnapshot, setLastSnapshot] = useState(null);

  const captureSnapshot = async () => {
    const [tiersRes, earningsRes, logsRes] = await Promise.all([
      axios.get("/api/dashboard/tier-map"),
      axios.get("/api/affiliate/earnings"),
      axios.get("/api/dashboard/escalation-log")
    ]);

    const newSnapshot = {
      timestamp: new Date().toISOString(),
      tiers: tiersRes.data.distribution,
      earnings: earningsRes.data.earnings,
      escalationLog: logsRes.data.escalationLog
    };

    const existing = JSON.parse(localStorage.getItem("cockpitSnapshots") || "[]");
    const updated = [...existing, newSnapshot];
    localStorage.setItem("cockpitSnapshots", JSON.stringify(updated));
    setLastSnapshot(newSnapshot);
  };

  return (
    <div className="widget">
      <h2>📦 Milestone Archive</h2>
      <button onClick={captureSnapshot}>📝 Capture Snapshot</button>
      {lastSnapshot && (
        <p><strong>Last Saved:</strong> {new Date(lastSnapshot.timestamp).toLocaleString()}</p>
      )}
    </div>
  );
}
