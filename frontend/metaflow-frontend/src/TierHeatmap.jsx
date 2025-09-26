import React, { useEffect, useState } from "react";
import { Bubble } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import "./cockpit.css";

Chart.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function TierHeatmap() {
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  if (snapshots.length === 0) return <p>📉 No snapshots available for heatmap.</p>;

  const latest = snapshots[snapshots.length - 1];
  const dataPoints = latest.earnings.map(a => {
    const tierIndex = ["starter", "bronze", "silver", "gold"].indexOf(a.tier.toLowerCase());
    return {
      x: tierIndex,
      y: a.referrals,
      r: Math.min(20, Math.sqrt(a.profit) / 2)
    };
  });

  const data = {
    datasets: [{
      label: "Affiliate Impact",
      data: dataPoints,
      backgroundColor: "rgba(0,120,212,0.5)",
      borderColor: "#0078d4"
    }]
  };

  const options = {
    scales: {
      x: {
        ticks: {
          callback: val => ["Starter", "Bronze", "Silver", "Gold"][val]
        },
        title: { display: true, text: "Tier" }
      },
      y: {
        title: { display: true, text: "Referrals" }
      }
    }
  };

  return (
    <div className="widget heatmap-view">
      <h2>🔥 Tier Heatmap</h2>
      <Bubble data={data} options={options} />
    </div>
  );
}
