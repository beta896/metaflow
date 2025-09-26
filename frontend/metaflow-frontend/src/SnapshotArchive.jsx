import React, { useState, useEffect } from "react";
import SnapshotExport from "./SnapshotExport.jsx";
import "./cockpit.css";

export default function SnapshotArchive() {
  const [snapshots, setSnapshots] = useState([]);
  const [filterTier, setFilterTier] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("cockpitSnapshots");
    if (stored) {
      setSnapshots(JSON.parse(stored));
    }
  }, []);

  const filterSnapshots = () => {
    if (filterTier === "all") return snapshots;
    return snapshots.filter(snap =>
      snap.tiers.some(t => t.tier.toLowerCase() === filterTier && t.count > 0)
    );
  };

  return (
    <div className="widget archive-viewer">
      <h2>📚 Snapshot Archive</h2>
      <label>Filter by Tier:</label>
      <select onChange={e => setFilterTier(e.target.value)} value={filterTier}>
        <option value="all">All</option>
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="bronze">Bronze</option>
        <option value="starter">Starter</option>
      </select>

      {filterSnapshots().length === 0 ? (
        <p>No matching snapshots found.</p>
      ) : (
        filterSnapshots().map((snap, index) => (
          <div key={index}>
            <SnapshotExport snapshot={snap} />
          </div>
        ))
      )}
    </div>
  );
}
