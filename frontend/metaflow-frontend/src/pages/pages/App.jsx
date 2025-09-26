import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '../context/RoleContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OfferDisplay from './components/OfferDisplay';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import GuestDashboard from './pages/GuestDashboard';
import ProphecyDashboard from './components/ProphecyDashboard';
import SanctionPanel from './components/SanctionPanel';
import ConversionButton from './components/ConversionButton';
import HealthWidget from './components/HealthWidget';
import LandingPage from './pages/LandingPage'; // ✅ Corrected path
import './App.css';

function App() {
  return (
    <AuthProvider>
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
          </nav>

          <main className="main-content">
            <HealthWidget />
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/" element={<Login />} /> {/* ✅ Corrected root route */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/offers" element={<OfferDisplay />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/guest" element={<GuestDashboard />} />
              <Route path="/prophecy" element={<ProphecyDashboard />} />
              <Route path="/sanction" element={<SanctionPanel />} />
              <Route path="/landing" element={<LandingPage />} />
            </Routes>
            <ConversionButton />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
