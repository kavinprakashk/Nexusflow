import React from 'react';

export default function StatusBadge({ status = 'OPERATIONAL', size = 'normal', showDot = true }) {
  const normalized = status.toUpperCase();

  let statusClass = 'operational';
  if (['WARNING', 'WARN', 'PENDING', 'MEDIUM'].includes(normalized)) {
    statusClass = 'warning';
  } else if (['CRITICAL', 'ERROR', 'HIGH', 'FAILED'].includes(normalized)) {
    statusClass = 'critical';
  } else if (['INFO', 'ACTIVE', 'CONNECTING'].includes(normalized)) {
    statusClass = 'info';
  }

  return (
    <span className={`status-badge ${statusClass}`} style={{ fontSize: size === 'small' ? '10px' : '11px' }}>
      {showDot && (
        <span 
          style={{
            display: 'inline-block',
            width: size === 'small' ? '5px' : '6px',
            height: size === 'small' ? '5px' : '6px',
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }} 
        />
      )}
      {normalized}
    </span>
  );
}
