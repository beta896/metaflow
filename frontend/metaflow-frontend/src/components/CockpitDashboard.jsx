import React from "react";
import LifecyclePanel from "./LifecyclePanel";
import OfferMatchPanel from "./OfferMatchPanel";
import ProfitTriggerPanel from "./ProfitTriggerPanel";
import LegacySeal from "./LegacySeal";

export default function CockpitDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧠 MetaFlow Cockpit Dashboard</h2>
      <LifecyclePanel />
      <OfferMatchPanel />
      <ProfitTriggerPanel />
      <LegacySeal />
    </div>
  );
}
