import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import DetailDrawer from '../components/common/DetailDrawer';
import { FileText, Download, Share2, Eye } from 'lucide-react';

export default function ReportsModule() {
  const { reports, setSelectedReport } = useTelemetry();

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="REP / REPORTS" 
        title="INTELLIGENCE REPORTS & AUDITS" 
        subtitle="Editorial and quantitative analytical synthesis prepared for municipal directors and decision-support units."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="shadow-hard-hover"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: 'var(--accent-orange)'
            }} />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent-orange)' }}>
                  {rep.id}
                </span>
                <StatusBadge status={rep.status} size="small" />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                lineHeight: '1.15',
                fontWeight: 800,
                textTransform: 'uppercase',
                margin: '8px 0 12px 0'
              }}>
                {rep.title}
              </h3>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                {rep.summary}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
                padding: '12px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                marginBottom: '20px'
              }}>
                <div><span style={{ color: 'var(--text-muted)' }}>PUBLISHED:</span> {rep.date}</div>
                <div><span style={{ color: 'var(--text-muted)' }}>DATA POINTS:</span> {rep.dataPoints}</div>
                <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-muted)' }}>COVERAGE:</span> {rep.coverage}</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSelectedReport(rep)}
                style={{
                  flex: 1,
                  padding: '8px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  backgroundColor: 'var(--dark-bg)',
                  color: '#FFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Eye size={14} /> VIEW
              </button>
              <button
                onClick={() => alert(`Exporting ${rep.id}...`)}
                style={{
                  padding: '8px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: 'var(--accent-orange)',
                  color: '#FFF',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Download size={14} /> EXPORT
              </button>
            </div>
          </div>
        ))}
      </div>

      <DetailDrawer />
    </div>
  );
}
