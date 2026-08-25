import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import DetailDrawer from '../components/common/DetailDrawer';
import { ShieldAlert, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export default function IncidentsModule() {
  const { incidents, setSelectedIncident } = useTelemetry();

  const activeCount = incidents.filter(i => i.status === 'ACTIVE').length;
  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL' || i.severity === 'HIGH').length;
  const resolvedCount = incidents.filter(i => i.status === 'RESOLVED').length;

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="INC / CONTROL" 
        title="INCIDENT CONTROL & DISPATCH" 
        subtitle="Centralized command matrix for evaluating municipal anomalies, field dispatches, and active containment."
      />

      {/* Incident Status Metric Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {[
          { label: 'ACTIVE INCIDENTS', val: activeCount, color: 'var(--status-warning)', icon: AlertTriangle },
          { label: 'HIGH / CRITICAL SEVERITY', val: criticalCount, color: 'var(--status-error)', icon: ShieldAlert },
          { label: 'RESOLVED TODAY', val: resolvedCount, color: 'var(--status-success)', icon: CheckCircle },
          { label: 'AVG CONTAINMENT TIME', val: '14.2 MIN', color: 'var(--text-main)', icon: ShieldAlert },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--dark-bg)',
                border: '1px solid var(--border-dark)',
                color: '#FFF',
                padding: '18px',
                boxShadow: 'var(--shadow-hard-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-inverse-muted)' }}>
                <span>{item.label}</span>
                <Icon size={16} color={item.color} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: item.color }}>
                {item.val}
              </div>
            </div>
          );
        })}
      </div>

      {/* Incident Table */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-hard-md)',
        overflowX: 'auto',
        marginBottom: '32px'
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '2px solid var(--accent-orange)',
          backgroundColor: 'var(--dark-bg)',
          color: '#FFF',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>COMMAND INCIDENT DISPATCH QUEUE</span>
          <span>STATION: CENTRAL DISPATCH 01</span>
        </div>

        <table className="table-brutalist">
          <thead>
            <tr>
              <th>INCIDENT ID</th>
              <th>TITLE / ANOMALY</th>
              <th>LOCATION ZONE</th>
              <th>SEVERITY</th>
              <th>STATUS</th>
              <th>TIME AGO</th>
              <th>ASSIGNED DISPATCH</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc) => (
              <tr key={inc.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-orange)' }}>
                  {inc.id}
                </td>
                <td style={{ fontWeight: 600 }}>{inc.title}</td>
                <td>{inc.location}</td>
                <td>
                  <StatusBadge status={inc.severity} />
                </td>
                <td>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: inc.status === 'ACTIVE' ? 'var(--status-warning)' : 'var(--status-success)'
                  }}>
                    {inc.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {inc.timeAgo}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  {inc.assignedTeam}
                </td>
                <td>
                  <button
                    onClick={() => setSelectedIncident(inc)}
                    style={{
                      padding: '5px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: 'var(--accent-orange)',
                      color: '#FFF',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    COMMAND OVERVIEW
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DetailDrawer />
    </div>
  );
}
