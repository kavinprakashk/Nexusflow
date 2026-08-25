import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import ScrambleText from './ScrambleText';

export default function PageHeader({ code = 'SYS / OVERVIEW', title = 'CITY-SCALE INTELLIGENCE', subtitle, actions }) {
  const { metrics } = useTelemetry();

  return (
    <div style={{
      marginBottom: '24px',
      borderBottom: '2px solid var(--border-light)',
      backgroundColor: 'var(--bg-surface)',
      padding: '20px 24px',
      border: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow-hard-md)'
    }}>
      {/* Code Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '4px'
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--accent-orange)',
          letterSpacing: '0.1em'
        }}>
          {code}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)'
        }}>
          LATITUDE 37.7749° N / LONGITUDE 122.4194° W
        </div>
      </div>

      {/* Main Display Title */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        margin: '8px 0'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: '1.05',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--text-main)',
            letterSpacing: '0.02em',
            margin: 0
          }}>
            <ScrambleText text={title} />
          </h1>
          {subtitle && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginTop: '4px'
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: 'flex', gap: '10px' }}>
            {actions}
          </div>
        )}
      </div>

      {/* Orange Divider */}
      <div style={{
        height: '2px',
        backgroundColor: 'var(--accent-orange)',
        margin: '16px 0 12px 0',
        position: 'relative'
      }}>
        <div className="pulse-line" style={{ height: '100%', width: '100%' }} />
      </div>

      {/* Technical Ticker Metadata Strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-main)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>SYSTEM_STATUS:</span>
          <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>OPERATIONAL</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>NETWORK:</span>
          <span style={{ fontWeight: 700 }}>{metrics.networkCoverage}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>LAST_SYNC:</span>
          <span style={{ fontWeight: 700 }}>{metrics.lastSync}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>NODES:</span>
          <span style={{ fontWeight: 700, color: 'var(--accent-orange)' }}>{metrics.activeNodes.toLocaleString()}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
          <span style={{ color: 'var(--text-muted)' }}>ENCRYPTION:</span>
          <span style={{ fontWeight: 600 }}>AES-256 GCM</span>
        </div>
      </div>
    </div>
  );
}
