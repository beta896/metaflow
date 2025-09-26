import React from 'react';
import { useEffect, useState } from 'react';
export default function HealthWidget() {
  const [status, setStatus] = useState('Checking...');
  useEffect(() => {
    fetch('http://localhost:3000/health')
      .then(res => res.json())
      .then(data => setStatus(data.status || 'OK'))
      .catch(() => setStatus('Offline'));
  }, []);
  return <div>Backend Status: {status}</div>;
}
