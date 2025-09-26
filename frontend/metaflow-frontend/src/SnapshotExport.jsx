import React from "react";
import html2pdf from "html2pdf.js";
import "./cockpit.css";

export default function SnapshotExport({ snapshot }) {
  const handleExport = () => {
    const element = document.getElementById("snapshot-export");
    html2pdf().from(element).save(`Snapshot_${new Date(snapshot.timestamp).toISOString()}.pdf`);
  };

  return (
    <div className="widget">
      <h2>📤 Export Snapshot</h2>
      <button onClick={handleExport}>📥 Export as PDF</button>

      <div id="snapshot-export">
        <p><strong>Timestamp:</strong> {new Date(snapshot.timestamp).toLocaleString()}</p>
        <p><strong>Affiliates:</strong> {snapshot.earnings.length}</p>
        <p><strong>Escalations:</strong> {snapshot.escalationLog.length}</p>
        <p><strong>Total Profit:</strong> ${snapshot.earnings.reduce((sum, a) => sum + a.profit, 0).toLocaleString()}</p>

        <h3>📊 Tier Distribution</h3>
        <ul>
          {snapshot.tiers.map(t => (
            <li key={t.tier}>{t.tier}: {t.count} affiliates ({t.percentage})</li>
          ))}
        </ul>

        <h3>💰 Affiliate Earnings</h3>
        <ul>
          {snapshot.earnings.map(a => (
            <li key={a.referralCode}>
              {a.name} → {a.tier} | ${a.profit} | {a.referrals} referrals
            </li>
          ))}
        </ul>

        <h3>🧠 Escalation Log</h3>
        <ul>
          {snapshot.escalationLog.map(log => (
            <li key={log.referralCode}>
              {log.verdict} ({new Date(log.timestamp).toLocaleString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
