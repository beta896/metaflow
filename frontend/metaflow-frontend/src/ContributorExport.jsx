import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import MilestoneBadge from "./MilestoneBadge.jsx";
import "./cockpit.css";

export default function ContributorExport() {
  const [snapshots, setSnapshots] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  const handleExport = () => {
    const element = document.getElementById("contributor-dossier");
    html2pdf().from(element).save(`Dossier_${selectedCode}.pdf`);
  };

  const timeline = snapshots.map((snap, index) => {
    const match = snap.earnings.find(a => a.referralCode === selectedCode);
    if (!match) return null;
    return {
      snapshot: index + 1,
      timestamp: snap.timestamp,
      tier: match.tier,
      referrals: match.referrals,
      profit: match.profit,
      name: match.name
    };
  }).filter(Boolean);

  const allCodes = [...new Set(snapshots.flatMap(s => s.earnings.map(a => a.referralCode)))];

  return (
    <div className="widget contributor-export">
      <h2>📤 Contributor Export Trigger</h2>
      <label>Select Affiliate:</label>
      <select onChange={e => setSelectedCode(e.target.value)} value={selectedCode}>
        <option value="">-- Select --</option>
        {allCodes.map(code => (
          <option key={code} value={code}>{code}</option>
        ))}
      </select>

      {selectedCode && timeline.length > 0 && (
        <>
          <button className="print-button" onClick={handleExport}>📥 Export Dossier</button>
          <div id="contributor-dossier">
            <h3>{timeline[0].name} ({selectedCode})</h3>
            <MilestoneBadge affiliate={timeline[timeline.length - 1]} />
            <ul>
              {timeline.map((t, i) => (
                <li key={i}>
                  Snapshot {t.snapshot} ({new Date(t.timestamp).toLocaleString()}): 
                  Tier → {t.tier}, Referrals → {t.referrals}, Profit → ${t.profit}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
