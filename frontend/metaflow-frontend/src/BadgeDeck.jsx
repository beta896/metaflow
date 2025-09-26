import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import MilestoneBadge from "./MilestoneBadge.jsx";
import "./cockpit.css";

export default function BadgeDeck() {
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      const all = JSON.parse(stored);
      setSnapshot(all[all.length - 1]);
    }
  }, []);

  const handleExport = () => {
    const element = document.getElementById("badge-deck");
    html2pdf().from(element).save("Affiliate_Badge_Deck.pdf");
  };

  if (!snapshot) return <p>📉 No snapshot available for badge deck.</p>;

  return (
    <div className="cockpit-dashboard export-view">
      <h1>🏅 Affiliate Badge Deck</h1>
      <button className="print-button" onClick={handleExport}>📥 Export Badge Deck</button>

      <div id="badge-deck">
        {snapshot.earnings.map((a, i) => (
          <div key={i} className="badge-card">
            <h3>{a.name} ({a.referralCode})</h3>
            <p>Tier: {a.tier} | Profit: ${a.profit} | Referrals: {a.referrals}</p>
            <MilestoneBadge affiliate={a} />
          </div>
        ))}
      </div>
    </div>
  );
}
