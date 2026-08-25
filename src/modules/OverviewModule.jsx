import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import PageHeader from '../components/common/PageHeader';
import TelemetryStrip from '../components/common/TelemetryStrip';
import StatusBadge from '../components/common/StatusBadge';
import SignalPulseStream from '../components/visualizers/SignalPulseStream';
import { MapPin, ArrowRight, Radio, ShieldAlert, Activity, Cpu, Layers } from 'lucide-react';

export default function OverviewModule() {
  const { navigateTo, signals, events, setSelectedNode } = useTelemetry();

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <PageHeader 
        code="SYS / OVERVIEW" 
        title="CITY-SCALE INTELLIGENCE" 
        subtitle="Real-time visibility across infrastructure, mobility, environmental systems, and urban operations."
        actions={
          <>
            <button className="btn-brutalist" onClick={() => navigateTo('/map')}>
              <MapPin size={16} /> OPEN LIVE MAP
            </button>
            <button className="btn-brutalist btn-brutalist-secondary" onClick={() => navigateTo('/signals')}>
              <Radio size={16} /> VIEW SIGNALS
            </button>
          </>
        }
      />

      {/* Telemetry Metric Strip */}
      <TelemetryStrip />

      {/* Live Waveform Stream Header */}
      <SignalPulseStream />

      {/* Main 2-Column Content Grid: Live Signals & Recent Activity Ticker */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Left Column: LIVE CITY SIGNALS Grid */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          padding: '24px',
          boxShadow: 'var(--shadow-hard-md)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            borderBottom: '2px solid var(--accent-orange)',
            paddingBottom: '8px'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              textTransform: 'uppercase',
              margin: 0
            }}>
              LIVE CITY SIGNALS
            </h2>
            <button 
              onClick={() => navigateTo('/signals')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--accent-orange)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              VIEW ALL ({signals.length}) <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '12px'
          }}>
            {signals.map((signal) => (
              <div
                key={signal.id}
                onClick={() => {
                  setSelectedNode(signal);
                  navigateTo('/map');
                }}
                className="shadow-hard-hover"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-light)',
                  padding: '14px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {signal.category} / {signal.source}
                  </span>
                  <StatusBadge status={signal.status} size="small" />
                </div>

                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '26px',
                  fontWeight: 800,
                  color: signal.status === 'CRITICAL' ? 'var(--status-error)' : 'var(--text-main)',
                  lineHeight: '1'
                }}>
                  {signal.value}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-muted)'
                }}>
                  <span>DELTA: <strong style={{ color: signal.change.startsWith('+') ? 'var(--status-success)' : 'var(--status-warning)' }}>{signal.change}</strong></span>
                  <span>{signal.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: RECENT SYSTEM EVENTS Activity Feed */}
        <div style={{
          backgroundColor: 'var(--dark-bg)',
          border: '1px solid var(--border-dark)',
          padding: '24px',
          color: 'var(--text-inverse)',
          boxShadow: 'var(--shadow-hard-md)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            borderBottom: '2px solid var(--accent-orange)',
            paddingBottom: '8px'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              color: '#FFF',
              textTransform: 'uppercase',
              margin: 0
            }}>
              RECENT SYSTEM EVENTS
            </h2>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--status-success)'
            }}>
              ● AUDIT FEED ACTIVE
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.map((evt) => (
              <div
                key={evt.id}
                style={{
                  padding: '12px 14px',
                  backgroundColor: 'var(--dark-surface)',
                  border: '1px solid var(--border-dark)',
                  borderLeft: `4px solid ${
                    evt.severity === 'CRITICAL' ? 'var(--status-error)' : evt.severity === 'WARNING' ? 'var(--status-warning)' : 'var(--status-success)'
                  }`
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px'
                }}>
                  <span style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>{evt.time}</span>
                  <span style={{ color: 'var(--text-inverse-muted)' }}>{evt.zone}</span>
                </div>

                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#FFF'
                }}>
                  {evt.title}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-inverse-muted)'
                }}>
                  <span>TARGET: {evt.node}</span>
                  <span>STATUS: LOGGED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
