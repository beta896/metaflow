import React from "react";
import BadgeDashboard from "./BadgeDashboard.jsx";
import TierAscensionLog from "./TierAscensionLog.jsx";
import ContributorTimeline from "./ContributorTimeline.jsx";
import VelocityLeaderboard from "./VelocityLeaderboard.jsx";
import SpotlightTrigger from "./SpotlightTrigger.jsx";
import ContributorExport from "./ContributorExport.jsx";
import BackendStatus from "./BackendStatus.jsx";

export default function CockpitDashboard() {
  return (
    <div className="cockpit-dashboard">
      <BackendStatus />
      <BadgeDashboard />
      <TierAscensionLog />
      <ContributorTimeline />
      <VelocityLeaderboard />
      <SpotlightTrigger />
      <ContributorExport />
    </div>
  );
}
