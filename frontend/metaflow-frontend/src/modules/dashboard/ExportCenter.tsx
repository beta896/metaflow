import React from 'react';
import DownloadCSVButton from './DownloadCSVButton';
import DownloadVerdictsCSV from './DownloadVerdictsCSV';
import DownloadForecastsCSV from './DownloadForecastsCSV';
import DownloadScalingLogsCSV from './DownloadScalingLogsCSV';

export default function ExportCenter() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>?? Unified Export Center</h2>
      <p>Download tactical intelligence across all modules:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <DownloadCSVButton />
        <DownloadVerdictsCSV />
        <DownloadForecastsCSV />
        <DownloadScalingLogsCSV />
      </div>
    </div>
  );
}
