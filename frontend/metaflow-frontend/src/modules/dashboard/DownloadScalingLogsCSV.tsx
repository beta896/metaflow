import React from 'react';

export default function DownloadScalingLogsCSV() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'http://localhost:3001/api/export/scaling';
    link.download = 'scaling_logs.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} style={{
      padding: '0.75rem 1.5rem',
      backgroundColor: '#ffc107',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginBottom: '1rem'
    }}>
      ?? Download Scaling Logs (CSV)
    </button>
  );
}
