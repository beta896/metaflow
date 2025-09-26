import React, { useEffect, useState } from 'react';
import { VERSION, PATCH_ID, RELEASE_DATE, AUTHOR } from '../version';

function ProphecyVisualizer({ role }) {
  const [log, setLog] = useState([]);

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    const entry = \\2025-08-23 21:56:33 — Role set to: \\;
    setLog(prev => [entry, ...prev]);
  }, [role]);

  return (
    <div style={{
      backgroundColor: '#111',
      color: '#0f0',
      padding: '1rem',
      border: '2px solid #0f0',
      borderRadius: '8px',
      fontFamily: 'monospace',
      marginTop: '1rem'
    }}>
      <h2>🧭 Prophecy Visualizer</h2>
      <p><strong>Version:</strong> {VERSION}</p>
      <p><strong>Patch ID:</strong> {PATCH_ID}</p>
      <p><strong>Release Date:</strong> {RELEASE_DATE}</p>
      <p><strong>Author:</strong> {AUTHOR}</p>
      <hr />
      <ul>
        {log.map((entry, idx) => (
          <li key={idx}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProphecyVisualizer;
