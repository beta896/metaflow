import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBadge from './RoleBadge';

const roles = ['Admin', 'User', 'Guest', 'Influencer', 'Brand'];
const roleRoutes = {
  Admin: '/admin',
  User: '/user',
  Guest: '/guest',
  Influencer: '/influencer',
  Brand: '/brand'
};

const RoleSanctifier = () => {
  const [currentRole, setCurrentRole] = useState(roles[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const timestamp = new Date().toISOString();
    const entry = \ - Role set to: \\n;
    try {
      require('fs').appendFileSync('C:\\Users\\hp\\metaflow-frontend\\AuditTrail.txt', entry);
    } catch (err) {
      console.error('Prophecy log failed:', err);
    }

    const route = roleRoutes[currentRole];
    if (route) navigate(route);
  }, [currentRole]);

  return (
    <div className="sanctifier-panel">
      <h2>Current Role: <RoleBadge role={currentRole} /></h2>
      {roles.map((role) => (
        <button key={role} onClick={() => setCurrentRole(role)}>
          Switch to {role}
        </button>
      ))}
    </div>
  );
};

export default RoleSanctifier;
