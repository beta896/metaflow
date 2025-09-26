import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "./cockpit.css";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function SnapshotChart() {
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  const labels = snapshots.map(s => new Date(s.timestamp).toLocaleDateString());
  const profitData = snapshots.map(s => s.earnings.reduce((sum, a) => sum + a.profit, 0));
  const referralData = snapshots.map(s => s.earnings.reduce((sum, a) => sum + a.referrals, 0));

  const data = {
    labels,
    datasets: [
      {
        label: "Total Profit ($)",
        data: profitData,
        borderColor: "#0078d4",
        backgroundColor: "rgba(0,120,212,0.2)",
        tension: 0.3
      },
      {
        label: "Total Referrals",
        data: referralData,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255,152,0,0.2)",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="widget chart-view">
      <h2>📈 Growth Over Time</h2>
      <Line data={data} />
    </div>
  );
}
