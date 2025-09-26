import RoleBadge from "./components/RoleBadge";
import React from 'react';
import ProphecyDashboard from './components/ProphecyDashboard';

export default function AdminPage({ users }) {
  return (
    <div>
      <h1>🛡️ Admin Control Center</h1>
      <ProphecyDashboard users={users} />
    </div>
  );
}

