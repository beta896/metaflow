import React from 'react';
import RoleBadge from './components/RoleBadge';

const GuestPage = ({ role }) => {
  return (
    <div className="panel guest-panel">
      <h1>Guest Panel</h1>
      <p>Role: <RoleBadge role={role} /></p>
      <p>Status: Ephemeral</p>
    </div>
  );
};

export default GuestPage;
