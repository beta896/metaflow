import React from "react";
import { useEffect, useState } from "react";

export default function HealthWidget() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch("http://localhost:3000/api/status")
      .then(res => res.json())
      .then(data => {
        const isOnline = data.status === "online" || data.online === true;
        setStatus(isOnline ? "✅ Online" : "❌ Offline");
      })
      .catch(() => setStatus("❌ Offline"));
  }, []);

  return <div>Backend Status: {status}</div>;
}
