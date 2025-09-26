import React from "react";
import "./cockpit.css";

export default function BadgeFlash({ badge }) {
  return (
    <div className="badge-flash-animated">
      <span className="badge-icon">{badge}</span>
      <span className="badge-text">Unlocked!</span>
    </div>
  );
}
