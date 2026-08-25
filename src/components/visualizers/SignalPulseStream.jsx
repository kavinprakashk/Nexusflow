import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';

export default function SignalPulseStream() {
  const { signals } = useTelemetry();

  return (
    <div style={{
      backgroundColor: 'var(--dark-bg)',
      border: '1px solid var(--border-dark)',
      padding: '16px',
      color: 'var(--text-inverse)',
      boxShadow: 'var(--shadow-hard-sm)',
      marginBottom: '24px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        borderBottom: '1px solid var(--border-dark)',
        paddingBottom: '8px'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent-orange)' }}>
          LIVE TELEMETRY SIGNAL WAVEFORMS (REAL-TIME STREAM)
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--status-success)' }}>
          ● LIVE DATA STREAM
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {signals.slice(0, 4).map((sig) => (
          <div
            key={sig.id}
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              <span style={{ fontWeight: 700, color: '#FFF' }}>{sig.source}</span>
              <span style={{ color: 'var(--accent-orange)' }}>{sig.value}</span>
            </div>

            {/* Horizontal Data Pulse Bar */}
            <div style={{
              height: '8px',
              backgroundColor: '#000',
              border: '1px solid var(--border-dark)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, sig.rawValue || 60)}%`,
                  backgroundColor: sig.status === 'CRITICAL' ? 'var(--status-error)' : 'var(--accent-orange)',
                  transition: 'width 0.5s ease-out'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-inverse-muted)' }}>
              <span>CAT: {sig.category}</span>
              <span>SYNC: {sig.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
