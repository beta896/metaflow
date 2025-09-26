import React from 'react';

export default function DownloadVerdictsCSV() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'http://localhost:3001/api/export/verdicts';
    link.download = 'verdicts.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} style={{
      padding: '0.75rem 1.5rem',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginBottom: '1rem'
    }}>
      ?? Download Verdicts (CSV)
    </button>
  );
}
