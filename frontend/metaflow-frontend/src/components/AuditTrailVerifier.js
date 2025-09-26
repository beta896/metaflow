import React, { useEffect, useState } from 'react';
import { hashVerdict } from './VerdictHasher';

const AuditTrailVerifier = () => {
  const [verdicts, setVerdicts] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fs = require('fs');
    const path = 'C:\\Users\\hp\\metaflow-frontend\\AuditTrail.txt';

    try {
      const raw = fs.readFileSync(path, 'utf-8');
      const lines = raw.trim().split('\\n');
      const verified = [];
      const issues = [];

      lines.forEach((line, index) => {
        const match = line.match(/^(.*?) - Role set to: (.*?) - Hash: (.*?)$/);
        if (!match) {
          issues.push(\Line \ malformed: \\);
          return;
        }

        const [_, timestamp, role, hash] = match;
        const expectedHash = hashVerdict(role);

        if (hash !== expectedHash) {
          issues.push(\Line \ hash mismatch: expected \, got \\);
        } else {
          verified.push({ timestamp, role, hash });
        }
      });

      setVerdicts(verified);
      setErrors(issues);
    } catch (err) {
      console.error('Audit verification failed:', err);
    }
  }, []);

  return (
    <div className='audit-verifier'>
      <h2>🧾 Audit Trail Verifier</h2>
      {errors.length > 0 ? (
        <div className='errors'>
          <h3>❌ Issues Found:</h3>
          <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      ) : (
        <div className='verified'>
          <h3>✅ All verdicts verified</h3>
          <ul>
            {verdicts.map((v, i) => (
              <li key={i}>
                <strong>{v.role}</strong> @ {v.timestamp}
                <br />
                <code>{v.hash}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuditTrailVerifier;
