import React, { useEffect, useState } from 'react';
import { hashVerdict } from './VerdictHasher';

const LifecycleVisualizer = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fs = require('fs');
    const path = 'C:\\Users\\hp\\metaflow-frontend\\AuditTrail.txt';

    try {
      const raw = fs.readFileSync(path, 'utf-8');
      const lines = raw.trim().split('\\n');
      const parsed = lines.map(line => {
        const [timestamp, rolePart] = line.split(' - Role set to: ');
        const role = rolePart?.trim();
        return {
          timestamp,
          role,
          hash: hashVerdict(role)
        };
      });
      setEntries(parsed.reverse());
    } catch (err) {
      console.error('Lifecycle read failed:', err);
    }
  }, []);

  return (
    <div className='lifecycle-visualizer'>
      <h2>🧬 Role Lifecycle</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <strong>{entry.role}</strong> @ {entry.timestamp}
            <br />
            <code>{entry.hash}</code>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LifecycleVisualizer;
