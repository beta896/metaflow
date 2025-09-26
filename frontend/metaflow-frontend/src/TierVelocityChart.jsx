import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "./cockpit.css";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function TierVelocityChart() {
  const [snapshots, setSnapshots] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  const tierLevels = ["starter", "bronze", "silver", "gold"];
  const getTierIndex = (tier) => tierLevels.indexOf(tier.toLowerCase());

  const timestamps = snapshots.map(s => new Date(s.timestamp).toLocaleString());

  const velocityData = snapshots.map((snap, i) => {
    const match = snap.earnings.find(a => a.referralCode === selectedCode);
    if (!match) return null;
    return getTierIndex(match.tier);
  });

  const deltas = velocityData.map((val, i, arr) => {
    if (i === 0 || val === null || arr[i - 1] === null) return 0;
    return val - arr[i - 1];
  });

  const chartData = {
    labels: timestamps,
    datasets: [{
      label: "Tier Velocity",
      data: deltas,
      borderColor: "#ff9800",
      backgroundColor: "rgba(255,152,0,0.2)",
      tension: 0.3,
      spanGaps: true
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        title: { display: true, text: "Tier Change per Snapshot" },
        min: -1,
        max: 2
      },
      x: {
        title: { display: true, text: "Snapshot Timestamp" }
      }
    }
  };

  const allCodes = [...new Set(snapshots.flatMap(s => s.earnings.map(a => a.referralCode)))];

  return (
    <div className="widget tier-velocity-chart">
      <h2>⚡ Tier Velocity Chart</h2>
      <label>Select Affiliate:</label>
      <select onChange={e => setSelectedCode(e.target.value)} value={selectedCode}>
        <option value="">-- Select --</option>
        {allCodes.map(code => (
          <option key={code} value={code}>{code}</option>
        ))}
      </select>

      {selectedCode && <Line data={chartData} options={chartOptions} />}
    </div>
  );
}
