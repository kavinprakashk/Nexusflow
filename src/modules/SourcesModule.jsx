import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import { Database, RefreshCw, CheckCircle, Wifi, Server } from 'lucide-react';

export default function SourcesModule() {
  const { sources, setSources } = useTelemetry();
  const [syncingId, setSyncingId] = useState(null);

  const handleSync = (id) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
    }, 1200);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="SRC / SOURCES" 
        title="DATA SOURCE MESH MATRIX" 
        subtitle="Connected telemetry pipelines, SCADA ingest interfaces, and external municipal APIs."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {sources.map((src) => (
          <div
            key={src.id}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              padding: '20px',
              boxShadow: 'var(--shadow-hard-md)',
              position: 'relative'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent-orange)' }}>
                {src.id}
              </span>
              <StatusBadge status={src.status} />
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              margin: '0 0 4px 0',
              textTransform: 'uppercase'
            }}>
              {src.name}
            </h3>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              PROTOCOL: {src.type} | NODES: {src.nodes}
            </div>

            {/* Matrix details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              padding: '12px',
              backgroundColor: 'var(--dark-bg)',
              color: '#FFF',
              border: '1px solid var(--border-dark)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              marginBottom: '16px'
            }}>
              <div><span style={{ color: 'var(--text-inverse-muted)' }}>LATENCY:</span> <strong style={{ color: 'var(--status-success)' }}>{src.latency}</strong></div>
              <div><span style={{ color: 'var(--text-inverse-muted)' }}>THROUGHPUT:</span> {src.throughput}</div>
              <div><span style={{ color: 'var(--text-inverse-muted)' }}>DATA QUALITY:</span> <strong style={{ color: 'var(--accent-orange)' }}>{src.dataQuality}</strong></div>
              <div><span style={{ color: 'var(--text-inverse-muted)' }}>LAST SYNC:</span> JUST NOW</div>
            </div>

            <button
              onClick={() => handleSync(src.id)}
              disabled={syncingId === src.id}
              style={{
                width: '100%',
                padding: '10px',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: 'var(--accent-orange)',
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={14} className={syncingId === src.id ? 'spin-anim' : ''} />
              {syncingId === src.id ? 'RE-SYNCING STREAM...' : 'FORCE RE-SYNC STREAM'}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .spin-anim {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
