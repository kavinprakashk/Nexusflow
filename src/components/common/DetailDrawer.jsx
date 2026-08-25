import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { X, Cpu, Activity, ShieldCheck, AlertTriangle, Layers, Radio, Wrench, RefreshCw } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function DetailDrawer() {
  const { 
    selectedNode, setSelectedNode, 
    selectedAsset, setSelectedAsset, 
    selectedIncident, setSelectedIncident,
    selectedReport, setSelectedReport,
    acknowledgeAlert
  } = useTelemetry();

  const activeDrawer = selectedNode ? 'node' : selectedAsset ? 'asset' : selectedIncident ? 'incident' : selectedReport ? 'report' : null;

  if (!activeDrawer) return null;

  const closeAll = () => {
    setSelectedNode(null);
    setSelectedAsset(null);
    setSelectedIncident(null);
    setSelectedReport(null);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '480px',
      backgroundColor: 'var(--dark-bg)',
      borderLeft: '3px solid var(--accent-orange)',
      boxShadow: '-8px 0px 24px rgba(0, 0, 0, 0.6)',
      zIndex: 900,
      color: 'var(--text-inverse)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'slideInRight 0.2s ease-out'
    }}>
      {/* Drawer Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-dark)',
        backgroundColor: 'var(--dark-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            padding: '4px 8px',
            backgroundColor: 'var(--accent-orange)',
            color: '#FFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700
          }}>
            INSPECTION MODE
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-inverse-muted)' }}>
            ID: {selectedNode?.id || selectedAsset?.id || selectedIncident?.id || selectedReport?.id}
          </span>
        </div>

        <button
          onClick={closeAll}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-inverse-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Drawer Content Body */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
      }}>
        {/* 1. NODE DETAIL */}
        {activeDrawer === 'node' && selectedNode && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-orange)', letterSpacing: '0.1em' }}>
                TELEMETRY SENSOR NODE
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', margin: '4px 0 10px 0' }}>
                {selectedNode.source || selectedNode.id}
              </h2>
              <StatusBadge status={selectedNode.status} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              marginBottom: '20px'
            }}>
              {[
                { label: 'LOCATION', value: selectedNode.location },
                { label: 'CATEGORY', value: selectedNode.category },
                { label: 'LATENCY', value: '42ms' },
                { label: 'THROUGHPUT', value: '1.8K req/s' },
                { label: 'UPTIME', value: '99.98%' },
                { label: 'LAST SIGNAL', value: selectedNode.timestamp },
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '10px',
                  backgroundColor: 'var(--dark-surface)',
                  border: '1px solid var(--border-dark)'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-inverse-muted)' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#FFF', marginTop: '2px' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '14px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              marginBottom: '20px'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-inverse-muted)', marginBottom: '8px' }}>
                REAL-TIME WAVEFORM SIGNAL
              </div>
              <div style={{
                height: '60px',
                border: '1px solid var(--border-dark)',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div className="pulse-line" style={{ height: '100%', width: '100%' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-orange)', position: 'relative', zIndex: 2 }}>
                  LIVE SIGNAL READOUT: {selectedNode.value}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn-brutalist" 
                style={{ flex: 1, fontSize: '13px', padding: '10px' }}
                onClick={() => alert(`Diagnostic ping dispatched to ${selectedNode.id}`)}
              >
                <RefreshCw size={14} /> PING SENSOR
              </button>
            </div>
          </div>
        )}

        {/* 2. ASSET DETAIL */}
        {activeDrawer === 'asset' && selectedAsset && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-orange)', letterSpacing: '0.1em' }}>
                URBAN INFRASTRUCTURE ASSET
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', margin: '4px 0 10px 0' }}>
                {selectedAsset.name}
              </h2>
              <StatusBadge status={selectedAsset.status} />
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                <span>ASSET HEALTH INDEX</span>
                <span style={{ color: selectedAsset.health > 85 ? 'var(--status-success)' : 'var(--status-warning)' }}>{selectedAsset.health}%</span>
              </div>
              <div style={{ height: '10px', backgroundColor: '#000', border: '1px solid var(--border-dark)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${selectedAsset.health}%`,
                  backgroundColor: selectedAsset.health > 85 ? 'var(--status-success)' : 'var(--status-warning)'
                }} />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              marginBottom: '20px'
            }}>
              {[
                { label: 'TYPE', value: selectedAsset.type },
                { label: 'LOCATION', value: selectedAsset.location },
                { label: 'LAST INSPECTED', value: selectedAsset.lastInspection },
                { label: 'SENSORS CONNECTED', value: selectedAsset.sensors },
                { label: 'CURRENT LOAD', value: selectedAsset.load },
                { label: 'SCHEDULED MAINT', value: '2026-09-15' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '10px',
                  backgroundColor: 'var(--dark-surface)',
                  border: '1px solid var(--border-dark)'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-inverse-muted)' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#FFF', marginTop: '2px' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <button 
              className="btn-brutalist" 
              style={{ width: '100%', fontSize: '13px', padding: '10px' }}
              onClick={() => alert(`Maintenance dispatch requested for ${selectedAsset.id}`)}
            >
              <Wrench size={14} /> DISPATCH FIELD TEAM
            </button>
          </div>
        )}

        {/* 3. INCIDENT DETAIL */}
        {activeDrawer === 'incident' && selectedIncident && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--status-error)', letterSpacing: '0.1em' }}>
                INCIDENT RESPONSE OVERVIEW
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', margin: '4px 0 10px 0' }}>
                {selectedIncident.title}
              </h2>
              <StatusBadge status={selectedIncident.severity} />
            </div>

            <div style={{
              padding: '14px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              marginBottom: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px'
            }}>
              <div style={{ color: 'var(--text-inverse-muted)', marginBottom: '4px' }}>LOCATION:</div>
              <div style={{ fontWeight: 700, color: '#FFF', marginBottom: '10px' }}>{selectedIncident.location}</div>
              
              <div style={{ color: 'var(--text-inverse-muted)', marginBottom: '4px' }}>ASSIGNED TEAM:</div>
              <div style={{ fontWeight: 700, color: 'var(--accent-orange)' }}>{selectedIncident.assignedTeam}</div>
            </div>

            {/* Lifecycle Timeline */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-inverse-muted)', marginBottom: '10px' }}>
                RESPONSE LIFECYCLE TIMELINE
              </div>
              {['DETECTED', 'ANALYZED', 'DISPATCHED', 'CONTAINED', 'RESOLVED'].map((step, idx) => {
                const isComplete = selectedIncident.status === 'RESOLVED' || idx < 3;
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '1px solid var(--border-dark)',
                      backgroundColor: isComplete ? 'var(--accent-orange)' : 'var(--dark-surface)',
                      color: isComplete ? '#FFF' : 'var(--text-inverse-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700
                    }}>
                      {idx + 1}
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: isComplete ? '#FFF' : 'var(--text-inverse-muted)',
                      fontWeight: isComplete ? 700 : 400
                    }}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {selectedIncident.status === 'ACTIVE' && (
              <button 
                className="btn-brutalist" 
                style={{ width: '100%', fontSize: '13px', padding: '10px' }}
                onClick={() => {
                  acknowledgeAlert(selectedIncident.id);
                  closeAll();
                }}
              >
                DECLARE INCIDENT RESOLVED
              </button>
            )}
          </div>
        )}

        {/* 4. REPORT DETAIL */}
        {activeDrawer === 'report' && selectedReport && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-orange)', letterSpacing: '0.1em' }}>
                ANALYTICAL REPORT DOCUMENT
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: '4px 0 10px 0' }}>
                {selectedReport.title}
              </h2>
              <StatusBadge status={selectedReport.status} />
            </div>

            <div style={{
              padding: '14px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              marginBottom: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div><span style={{ color: 'var(--text-inverse-muted)' }}>PUBLISHED:</span> {selectedReport.date}</div>
                <div><span style={{ color: 'var(--text-inverse-muted)' }}>CATEGORY:</span> {selectedReport.category}</div>
                <div><span style={{ color: 'var(--text-inverse-muted)' }}>DATA POINTS:</span> {selectedReport.dataPoints}</div>
                <div><span style={{ color: 'var(--text-inverse-muted)' }}>COVERAGE:</span> {selectedReport.coverage}</div>
              </div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              marginBottom: '20px',
              lineHeight: '1.6',
              fontSize: '13px'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-orange)', marginBottom: '8px' }}>
                EXECUTIVE SUMMARY
              </div>
              {selectedReport.summary}
            </div>

            <button 
              className="btn-brutalist" 
              style={{ width: '100%', fontSize: '13px', padding: '10px' }}
              onClick={() => alert(`Exporting report ${selectedReport.id} to CSV/PDF...`)}
            >
              EXPORT REPORT FILE (PDF/CSV)
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
