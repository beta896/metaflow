import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cockpit.css";
import html2pdf from "html2pdf.js";

export default function CockpitExport() {
  const [tiers, setTiers] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("/api/dashboard/tier-map").then(res => setTiers(res.data.distribution));
    axios.get("/api/affiliate/earnings").then(res => setEarnings(res.data.earnings));
    axios.get("/api/dashboard/escalation-log").then(res => setLogs(res.data.escalationLog));
  }, []);

  const handlePDF = () => {
    const element = document.getElementById("export-content");
    html2pdf().from(element).save("MetaflowCockpitReport.pdf");
  };

  const totalReferrals = earnings.reduce((sum, a) => sum + a.referrals, 0);
  const totalProfit = earnings.reduce((sum, a) => sum + a.profit, 0);
  const totalEscalations = logs.length;

  return (
    <div className="cockpit-dashboard export-view">
      <h1>📄 Metaflow Cockpit Export</h1>
      <button className="print-button" onClick={handlePDF}>📥 Export as PDF</button>

      <div id="export-content">
        <section className="summary-block">
          <h2>📌 Tactical Summary</h2>
          <p><strong>Total Referrals:</strong> {totalReferrals}</p>
          <p><strongTotal Profit:</strong> ${totalProfit.toLocaleString()}</p>
          <p><strong>Escalation Events:</strong> {totalEscalations}</p>
          <p><strong>Tier Distribution:</strong></p>
          <ul>
            {tiers.map(t => (
              <li key={t.tier}>{t.tier}: {t.count} affiliates ({t.percentage})</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>💰 Affiliate Earnings</h2>
          <ul>
            {earnings.map(a => (
              <li key={a.referralCode}>
                {a.name} → {a.tier} | ${a.profit} | {a.referrals} referrals
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>🧠 Escalation Log</h2>
          <ul>
            {logs.map(log => (
              <li key={log.referralCode}>
                {log.verdict} ({new Date(log.timestamp).toLocaleString()})
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
