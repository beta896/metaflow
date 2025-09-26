import React from 'react';
import { Link } from 'react-router-dom';
import HealthWidget from '.././components/HealthWidget';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className='landing-container'>
      <header className='hero-section'>
        <h1>Metaflow is Live</h1>
        <p>Every click is logged. Every signal is leverage.</p>
        <HealthWidget />
        <div className='cta-buttons'>
          <Link to='/dashboard' className='btn-primary'>Enter Dashboard</Link>
          <Link to='/offers' className='btn-secondary'>View Offers</Link>
        </div>
      </header>

      <section className='features-section'>
        <h2>What Metaflow Delivers</h2>
        <ul>
          <li>?? Real-time tracking engine with backend proof</li>
          <li>?? Affiliate offer ingestion and conversion logging</li>
          <li>?? Role-based dashboards for publishers, users, and guests</li>
          <li>??? Modular components: ProphecyDashboard, SanctionPanel</li>
        </ul>
      </section>

      <section className='proof-section'>
        <h2>Live System Status</h2>
        <p>Backend: <strong>http://localhost:3001</strong></p>
        <p>Frontend: <strong>http://localhost:3000</strong></p>
        <p>Tracking Endpoint: <code>/track-conversion</code></p>
        <p>Verdict Engine: Operational</p>
      </section>

      <footer className='footer'>
        <p>� 2025 Metaflow Systems. Built for founders, by founders.</p>
      </footer>
    </div>
  );
}
export default LandingPage;
