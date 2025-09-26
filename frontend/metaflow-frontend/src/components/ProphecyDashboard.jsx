import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import { classifyProfile } from './profileClassification';
import PropTypes from 'prop-types';

export default function ProphecyDashboard({ users, onRoleChange }) {
  const [logs, setLogs] = useState([]);

  const handleRoleChange = (userId, newRole) => {
    const timestamp = new Date().toISOString();
    const user = users.find(u => u.id === userId);
    const classification = classifyProfile(user.profile);

    const logEntry = {
      user: user.name,
      newRole,
      classification,
      timestamp
    };

    setLogs(prev => [...prev, logEntry]);
    console.log('🧾 Verdict Issued:', logEntry);
    logVerdictToBackend(logEntry);
    onRoleChange(userId, newRole);
  };

  async function logVerdictToBackend(logEntry) {
    try {
      await fetch('https://your-backend.com/api/prophecy-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry)
      });
    } catch (error) {
      console.error('⚠️ Failed to log verdict:', error);
    }
  }

  return (
    <div>
      <h1>🧭 Prophecy Dashboard</h1>
      <AdminPanel users={users} onRoleChange={handleRoleChange} />
      <h3>📜 Audit Trail</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.timestamp} — {log.user} → {log.newRole}
            [Tier {log.classification.tier}, {log.classification.category}]
          </li>
        ))}
      </ul>
    </div>
  );
}

ProphecyDashboard.propTypes = {
  users: PropTypes.array.isRequired,
  onRoleChange: PropTypes.func.isRequired
};
