import React, { useState } from 'react';

export default function TelemetryChart({ title = 'NETWORK THROUGHPUT & LATENCY TREND', height = 240 }) {
  const [timeRange, setTimeRange] = useState('24H');

  // Multi-series SVG Points
  const seriesA = [20, 35, 45, 30, 60, 75, 55, 80, 70, 90, 85, 95];
  const seriesB = [40, 30, 50, 40, 35, 50, 45, 60, 55, 65, 60, 70];

  const pointsA = seriesA.map((val, idx) => `${(idx / (seriesA.length - 1)) * 600},${height - (val / 100) * (height - 40) - 20}`).join(' ');
  const pointsB = seriesB.map((val, idx) => `${(idx / (seriesB.length - 1)) * 600},${height - (val / 100) * (height - 40) - 20}`).join(' ');

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-light)',
      padding: '20px',
      boxShadow: 'var(--shadow-hard-md)',
      marginBottom: '24px'
    }}>
      {/* Chart Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '10px'
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          fontWeight: 800,
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          {title}
        </div>

        {/* Time range selector */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {['24H', '7D', '30D', '90D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: timeRange === range ? 'var(--dark-bg)' : 'var(--bg-surface-alt)',
                color: timeRange === range ? 'var(--accent-orange)' : 'var(--text-main)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer'
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart Engine */}
      <div style={{ position: 'relative', width: '100%', height: `${height}px`, backgroundColor: '#080808' }}>
        <svg width="100%" height="100%" viewBox={`0 0 600 ${height}`} preserveAspectRatio="none">
          {/* Technical Grid lines */}
          <line x1="0" y1="20%" x2="600" y2="20%" stroke="#222" strokeDasharray="4 4" />
          <line x1="0" y1="40%" x2="600" y2="40%" stroke="#222" strokeDasharray="4 4" />
          <line x1="0" y1="60%" x2="600" y2="60%" stroke="#222" strokeDasharray="4 4" />
          <line x1="0" y1="80%" x2="600" y2="80%" stroke="#222" strokeDasharray="4 4" />

          {/* Area Fill for Series A */}
          <polygon
            points={`0,${height} ${pointsA} 600,${height}`}
            fill="url(#orangeGrad)"
            opacity="0.25"
          />

          {/* Series A (Orange Primary) */}
          <polyline
            fill="none"
            stroke="var(--accent-orange)"
            strokeWidth="3"
            points={pointsA}
          />

          {/* Series B (Green Secondary) */}
          <polyline
            fill="none"
            stroke="var(--status-success)"
            strokeWidth="2"
            strokeDasharray="5 3"
            points={pointsB}
          />

          <defs>
            <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-orange)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--accent-orange)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Legend Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '12px',
          display: 'flex',
          gap: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: '#888'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '3px', backgroundColor: 'var(--accent-orange)' }} />
            <span>TRAFFIC LOAD (8.4K req/s)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '3px', backgroundColor: 'var(--status-success)' }} />
            <span>LATENCY AVG (14ms)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
