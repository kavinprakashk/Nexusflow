import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import { Bell, ShieldAlert, CheckCircle, AlertTriangle, Search } from 'lucide-react';

export default function AlertsModule() {
  const { incidents, acknowledgeAlert } = useTelemetry();
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const filteredAlerts = incidents.filter(inc => {
    if (severityFilter === 'ALL') return true;
    return inc.severity === severityFilter;
  });

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="ALT / ALERTS" 
        title="REAL-TIME ALERT MONITOR" 
        subtitle="Prioritized queue of system alerts, anomaly thresholds, and automated emergency notifications."
      />

      {/* Filter Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-light)',
        padding: '16px 20px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-hard-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, alignSelf: 'center', marginRight: '8px' }}>
            SEVERITY QUEUE:
          </span>
          {['ALL', 'HIGH', 'MEDIUM', 'LOW', 'CRITICAL'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              style={{
                padding: '6px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: severityFilter === sev ? 'var(--dark-bg)' : 'var(--bg-surface-alt)',
                color: severityFilter === sev ? 'var(--accent-orange)' : 'var(--text-main)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer'
              }}
            >
              {sev}
            </button>
          ))}
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
          ALERT DISPATCH BUFFER ACTIVE
        </div>
      </div>

      {/* Alert Cards Queue */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {filteredAlerts.map((alertItem) => {
          const isCritical = alertItem.severity === 'CRITICAL' || alertItem.severity === 'HIGH';
          const isWarning = alertItem.severity === 'MEDIUM';

          return (
            <div
              key={alertItem.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderLeft: `6px solid ${isCritical ? 'var(--status-error)' : isWarning ? 'var(--accent-orange)' : 'var(--status-success)'}`,
                padding: '20px',
                boxShadow: 'var(--shadow-hard-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <StatusBadge status={alertItem.severity} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{alertItem.id}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>● {alertItem.timeAgo}</span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  lineHeight: '1.2',
                  fontWeight: 800,
                  margin: '4px 0',
                  textTransform: 'uppercase'
                }}>
                  {alertItem.title}
                </h3>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                  LOCATION: {alertItem.location} | AFFECTED: {alertItem.affectedSystems.join(', ')}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => acknowledgeAlert(alertItem.id)}
                  style={{
                    padding: '8px 14px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 700,
                    backgroundColor: 'var(--dark-bg)',
                    color: '#FFF',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer'
                  }}
                >
                  ACKNOWLEDGE
                </button>
                <button
                  onClick={() => alert(`Investigating alert ${alertItem.id}`)}
                  style={{
                    padding: '8px 14px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 700,
                    backgroundColor: 'var(--accent-orange)',
                    color: '#FFF',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  INVESTIGATE
                </button>
                <button
                  onClick={() => acknowledgeAlert(alertItem.id)}
                  style={{
                    padding: '8px 14px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 700,
                    backgroundColor: 'var(--status-success)',
                    color: '#FFF',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  RESOLVE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
