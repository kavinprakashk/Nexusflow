import React from 'react';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import { Server, ShieldCheck, CheckCircle2, Cpu, Activity } from 'lucide-react';

export default function StatusModule() {
  const SERVICES = [
    { name: 'Core Telemetry API Ingest', uptime: '99.99%', latency: '12ms', status: 'OPERATIONAL' },
    { name: 'Timescale SCADA Database', uptime: '99.98%', latency: '8ms', status: 'OPERATIONAL' },
    { name: 'Real-Time Data Stream Engine', uptime: '99.90%', latency: '15ms', status: 'OPERATIONAL' },
    { name: 'Vector Map Tiles Engine', uptime: '99.97%', latency: '22ms', status: 'OPERATIONAL' },
    { name: 'Emergency Notification Dispatcher', uptime: '100.0%', latency: '4ms', status: 'OPERATIONAL' },
    { name: 'Predictive Analytics Model Server', uptime: '99.95%', latency: '45ms', status: 'OPERATIONAL' },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="SYS / STATUS" 
        title="SYSTEM OPERATIONAL HEALTH MATRIX" 
        subtitle="Real-time uptime monitoring and platform component diagnostic status."
      />

      {/* Large Banner */}
      <div style={{
        backgroundColor: 'var(--dark-bg)',
        border: '3px solid var(--status-success)',
        padding: '28px',
        color: '#FFF',
        boxShadow: 'var(--shadow-hard-md)',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--status-success)',
            fontWeight: 700,
            marginBottom: '6px'
          }}>
            <span className="status-pulse" />
            SYSTEM WIDE STATUS REPORT
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '42px',
            fontWeight: 800,
            margin: 0,
            color: '#FFF',
            letterSpacing: '0.04em'
          }}>
            ALL SYSTEMS OPERATIONAL
          </h2>
        </div>

        <div style={{
          padding: '12px 20px',
          backgroundColor: 'var(--dark-surface)',
          border: '1px solid var(--border-dark)',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          textAlign: 'right'
        }}>
          <div style={{ color: 'var(--text-inverse-muted)' }}>OVERALL UPTIME (30D)</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--status-success)' }}>99.982%</div>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {SERVICES.map((srv, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              padding: '20px',
              boxShadow: 'var(--shadow-hard-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                SERVICE_0{idx + 1}
              </span>
              <StatusBadge status={srv.status} />
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              margin: '0 0 12px 0',
              textTransform: 'uppercase'
            }}>
              {srv.name}
            </h3>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px'
            }}>
              <span>UPTIME: <strong style={{ color: 'var(--status-success)' }}>{srv.uptime}</strong></span>
              <span>LATENCY: <strong>{srv.latency}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
