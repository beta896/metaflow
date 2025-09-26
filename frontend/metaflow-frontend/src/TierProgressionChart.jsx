import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "./cockpit.css";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function TierProgressionChart() {
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

  const affiliateData = snapshots.map(snap => {
    const match = snap.earnings.find(a => a.referralCode === selectedCode);
    return match ? getTierIndex(match.tier) : null;
  });

  const chartData = {
    labels: timestamps,
    datasets: [{
      label: "Tier Progression",
      data: affiliateData,
      borderColor: "#0078d4",
      backgroundColor: "rgba(0,120,212,0.2)",
      tension: 0.3,
      spanGaps: true
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        ticks: {
          callback: val => tierLevels[val]
        },
        title: { display: true, text: "Tier Level" },
        min: 0,
        max: tierLevels.length - 1
      },
      x: {
        title: { display: true, text: "Snapshot Timestamp" }
      }
    }
  };

  const allCodes = [...new Set(snapshots.flatMap(s => s.earnings.map(a => a.referralCode)))];

  return (
    <div className="widget tier-progression-chart">
      <h2>📈 Tier Progression Chart</h2>
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
