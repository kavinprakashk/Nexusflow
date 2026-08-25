import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Cpu, Activity, ShieldCheck, AlertTriangle, Wifi } from 'lucide-react';

export default function TelemetryStrip() {
  const { metrics } = useTelemetry();

  const METRICS_DATA = [
    { label: 'ACTIVE NODES', value: metrics.activeNodes.toLocaleString(), unit: 'ONLINE', icon: Cpu, change: '+12 TODAY', isOrange: true },
    { label: 'DATA THROUGHPUT', value: `${metrics.throughput}K`, unit: 'REQ/S', icon: Activity, change: '+4.2%', isOrange: false },
    { label: 'SYSTEM HEALTH', value: `${metrics.systemHealth}%`, unit: 'OPTIMAL', icon: ShieldCheck, change: '0.0%', isOrange: false, isGreen: true },
    { label: 'ACTIVE EVENTS', value: metrics.activeEvents, unit: 'LOGGED', icon: AlertTriangle, change: '-2 LAST HR', isOrange: true },
    { label: 'NETWORK COVERAGE', value: `${metrics.networkCoverage}%`, unit: 'METRO ZONES', icon: Wifi, change: '+0.5%', isOrange: false },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      marginBottom: '24px'
    }}>
      {METRICS_DATA.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              padding: '16px',
              boxShadow: 'var(--shadow-hard-sm)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: item.isOrange ? 'var(--accent-orange)' : item.isGreen ? 'var(--status-success)' : 'var(--dark-bg)'
            }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.05em'
              }}>
                {item.label}
              </span>
              <Icon size={16} color={item.isOrange ? 'var(--accent-orange)' : item.isGreen ? 'var(--status-success)' : 'var(--text-main)'} />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px'
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                lineHeight: '1',
                fontWeight: 800,
                color: item.isOrange ? 'var(--accent-orange)' : 'var(--text-main)'
              }}>
                {item.value}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                fontWeight: 600
              }}>
                {item.unit}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '10px',
              paddingTop: '8px',
              borderTop: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)'
            }}>
              <span>DELTA: {item.change}</span>
              <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>LIVE</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
