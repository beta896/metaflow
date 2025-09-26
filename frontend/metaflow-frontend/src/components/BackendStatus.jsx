import React, { useEffect, useState } from "react";

export default function BackendStatus() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch("/api/ping")
      .then(res => res.text())
      .then(data => {
        const isOnline = data.includes("Backend is live");
        setStatus(isOnline ? "ONLINE" : "OFFLINE");
      })
      .catch(() => setStatus("OFFLINE"));
  }, []);

  return (
    <div className="backend-status">
      <strong>Backend Status:</strong> {status}
    </div>
  );
}
