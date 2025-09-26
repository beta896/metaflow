import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBadge from './RoleBadge';
import ProphecyAnimator from './ProphecyAnimator';
import LifecycleVisualizer from './LifecycleVisualizer';
import AuditTrailVerifier from './AuditTrailVerifier';
import { hashVerdict } from './VerdictHasher';

const roles = ['Admin', 'User', 'Guest', 'Influencer', 'Brand'];
const roleRoutes = {
  Admin: '/admin',
  User: '/user',
  Guest: '/guest',
  Influencer: '/influencer',
  Brand: '/brand'
};

const CovenantCore = () => {
  const [currentRole, setCurrentRole] = useState(roles[0]);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timestamp = new Date().toISOString();
    const hash = hashVerdict(currentRole);
    const entry = `\n- Role set to: ${currentRole}\n- Hash: ${hash}\n- Timestamp: ${timestamp}\n`;

    try {
      require('fs').appendFileSync('C:\\Users\\hp\\metaflow-frontend\\AuditTrail.txt', entry);
    } catch (err) {
      console.error('Audit log failed:', err);
    }

    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1500);

    const route = roleRoutes[currentRole];
    if (route) navigate(route);
  }, [currentRole]);

  return (
    <div className='covenant-core'>
      <h2>🧭 Covenant Core</h2>
      <div>
        <strong>Current Role:</strong> <RoleBadge role={currentRole} />
      </div>
      <div className='role-switcher'>
        {roles.map((role) => (
          <button key={role} onClick={() => setCurrentRole(role)}>
            Switch to {role}
          </button>
        ))}
      </div>
      {showAnimation && <ProphecyAnimator role={currentRole} />}
      <LifecycleVisualizer />
      <AuditTrailVerifier />
    </div>
  );
};

export default CovenantCore;

useEffect(() => {
  fetch('/api/verdict')
    .then(res => res.json())
    .then(data => console.log('Verdict:', data));
}, []);
