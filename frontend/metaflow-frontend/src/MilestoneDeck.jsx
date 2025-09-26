import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import "./cockpit.css";

export default function MilestoneDeck() {
  const [snapshot, setSnapshot] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedSnapshots = localStorage.getItem("cockpitSnapshots");
    const storedLogs = localStorage.getItem("milestoneLog");
    if (storedSnapshots) {
      const all = JSON.parse(storedSnapshots);
      setSnapshot(all[all.length - 1]);
    }
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const handleExport = () => {
    const element = document.getElementById("milestone-deck");
    html2pdf().from(element).save("Metaflow_Milestone_Deck.pdf");
  };

  if (!snapshot) return <p>📉 No snapshot available for deck.</p>;

  const totalProfit = snapshot.earnings.reduce((sum, a) => sum + a.profit, 0);
  const totalReferrals = snapshot.earnings.reduce((sum, a) => sum + a.referrals, 0);
  const goldAffiliates = snapshot.earnings.filter(a => a.tier.toLowerCase() === "gold");

  return (
    <div className="cockpit-dashboard export-view">
      <h1>📘 Metaflow Milestone Deck</h1>
      <button className="print-button" onClick={handleExport}>📥 Export Deck as PDF</button>

      <div id="milestone-deck">
        <section>
          <h2>📌 Tactical Summary</h2>
          <p><strong>Date:</strong> {new Date(snapshot.timestamp).toLocaleString()}</p>
          <p><strong>Total Profit:</strong> ${totalProfit.toLocaleString()}</p>
          <p><strongTotal Referrals:</strong> {totalReferrals}</p>
          <p><strong>Gold Affiliates:</strong> {goldAffiliates.map(a => a.name).join(", ") || "None yet"}</p>
        </section>

        <section>
          <h2>🌟 Milestone Log</h2>
          <ul>
            {logs.map((log, i) => (
              <li key={i}>{new Date(log.timestamp).toLocaleString()} — {log.message}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>💰 Top Earners</h2>
          <ul>
            {[...snapshot.earnings].sort((a, b) => b.profit - a.profit).slice(0, 5).map(a => (
              <li key={a.referralCode}>{a.name} → ${a.profit}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>📣 Referral Champions</h2>
          <ul>
            {[...snapshot.earnings].sort((a, b) => b.referrals - a.referrals).slice(0, 5).map(a => (
              <li key={a.referralCode}>{a.name} → {a.referrals} referrals</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
