import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { RoleProvider } from "./context/RoleContext";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import GuestDashboard from "./pages/GuestDashboard";
import ProphecyDashboard from "./components/ProphecyDashboard";
import SanctionPanel from "./components/SanctionPanel";
import OfferDisplay from "./components/OfferDisplay";
import ConversionButton from "./components/ConversionButton";
import HealthWidget from "./components/HealthWidget";
import SignupForm from "./components/SignupForm";
import ContributorDashboard from "./components/ContributorDashboard";

import "./App.css";

function App() {
  const [userRole, setUserRole] = useState("guest");

  useEffect(() => {
    fetch("http://localhost:3001/roles/getRole", {
      headers: { Authorization: "user-token" } // Replace with real token logic
    })
      .then(res => res.json())
      .then(data => setUserRole(data.role))
      .catch(() => setUserRole("guest"));
  }, []);

  const mockData = [
    {
      name: "Mustafa",
      email: "founder@metaflow.com",
      classification: { tier: "Tier 3", category: "Tech", engagementScore: 92 },
      lastVerdict: "Admin escalation approved"
    }
  ];

  return (
    <AuthProvider>
      <RoleProvider role={userRole}>
        <Router>
          <div className="app-container">
            <nav className="navbar">
              <Link to="/landing">Landing</Link>
              <Link to="/">Login</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/offers">Offers</Link>
              <Link to="/admin">Admin</Link>
              <Link to="/user">User</Link>
              <Link to="/guest">Guest</Link>
              <Link to="/prophecy">Prophecy</Link>
              <Link to="/sanction">Sanction</Link>
              <Link to="/signup">Signup</Link>
              <Link to="/contributors">Contributors</Link>
            </nav>

            <main className="main-content">
              <HealthWidget />
              <Routes>
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/offers" element={<OfferDisplay />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/guest" element={<GuestDashboard />} />
                <Route path="/prophecy" element={<ProphecyDashboard />} />
                <Route path="/sanction" element={<SanctionPanel />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/contributors" element={<ContributorDashboard contributors={mockData} />} />
              </Routes>
              <ConversionButton />
            </main>
          </div>
        </Router>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
