import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExportedBatchDashboard() {
  const [batches, setBatches] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/exported-batches')
      .then(res => setBatches(res.data))
      .catch(err => console.error('[EXPORT DASHBOARD ERROR]', err.message));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>?? Exported Batch Logs</h2>
      {batches.map((b, idx) => (
        <div key={idx} style={{
          marginBottom: '1rem',
          padding: '1rem',
          border: '1px solid #ccc',
          background: '#f9f9f9'
        }}>
          <p><strong>Campaign:</strong> {b.Campaign}</p>
          <p><strong>Profiles Simulated:</strong> {b.ProfilesSimulated}</p>
          <p><strong>Total Revenue:</strong> </p>
          <p><strong>Timestamp:</strong> {new Date(b.Timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
import DownloadCSVButton from './DownloadCSVButton';
<DownloadCSVButton />
