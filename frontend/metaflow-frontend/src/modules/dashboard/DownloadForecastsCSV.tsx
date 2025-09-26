import React from 'react';

export default function DownloadForecastsCSV() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'http://localhost:3001/api/export/forecasts';
    link.download = 'forecasts.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} style={{
      padding: '0.75rem 1.5rem',
      backgroundColor: '#17a2b8',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginBottom: '1rem'
    }}>
      ?? Download Forecasts (CSV)
    </button>
  );
}
