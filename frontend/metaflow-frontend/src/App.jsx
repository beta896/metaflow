import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CockpitDashboard from "./CockpitDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CockpitDashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
import CockpitDashboard from "./components/CockpitDashboard";

<Route path="/cockpit" element={<CockpitDashboard />} />
