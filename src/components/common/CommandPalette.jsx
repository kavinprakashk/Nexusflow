import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Search, X, MapPin, Layers, ShieldAlert, Radio, FileText, ArrowRight } from 'lucide-react';

export default function CommandPalette() {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    navigateTo, 
    setSelectedNode, 
    setSelectedAsset, 
    setSelectedIncident, 
    setSelectedReport,
    signals,
    assets,
    incidents,
    reports
  } = useTelemetry();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const filteredNodes = signals.filter(s => 
    s.id.toLowerCase().includes(query.toLowerCase()) || 
    s.source.toLowerCase().includes(query.toLowerCase()) ||
    s.location.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAssets = assets.filter(a => 
    a.id.toLowerCase().includes(query.toLowerCase()) || 
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.type.toLowerCase().includes(query.toLowerCase())
  );

  const filteredIncidents = incidents.filter(i => 
    i.id.toLowerCase().includes(query.toLowerCase()) || 
    i.title.toLowerCase().includes(query.toLowerCase()) ||
    i.location.toLowerCase().includes(query.toLowerCase())
  );

  const filteredReports = reports.filter(r => 
    r.id.toLowerCase().includes(query.toLowerCase()) || 
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(8, 8, 8, 0.85)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '80px',
      paddingLeft: '16px',
      paddingRight: '16px'
    }} onClick={() => setIsCommandPaletteOpen(false)}>
      <div style={{
        width: '100%',
        maxWidth: '720px',
        backgroundColor: 'var(--dark-bg)',
        border: '2px solid var(--accent-orange)',
        boxShadow: '8px 8px 0px #000',
        color: 'var(--text-inverse)',
        overflow: 'hidden'
      }} onClick={e => e.stopPropagation()}>

        {/* Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-dark)',
          backgroundColor: 'var(--dark-surface)'
        }}>
          <Search size={22} color="var(--accent-orange)" />
          <input
            type="text"
            autoFocus
            placeholder="SEARCH NODES, ASSETS, EVENTS, INCIDENTS, REPORTS..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              color: '#FFF'
            }}
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--text-inverse-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <kbd style={{
              padding: '2px 6px',
              backgroundColor: 'var(--dark-bg)',
              border: '1px solid var(--border-dark)',
              fontSize: '11px',
              color: 'var(--text-inverse-muted)'
            }}>ESC</kbd>
          </button>
        </div>

        {/* Search Results Window */}
        <div style={{
          maxHeight: '480px',
          overflowY: 'auto',
          padding: '16px 20px'
        }}>
          {/* Quick Actions Shortcuts */}
          {!query && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-inverse-muted)',
                marginBottom: '8px',
                letterSpacing: '0.1em'
              }}>
                QUICK MODULE JUMP
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  { title: 'Open Live City Map', route: '/map' },
                  { title: 'Monitor Signal Telemetry', route: '/signals' },
                  { title: 'View Urban Asset Network', route: '/assets' },
                  { title: 'Incident Control Center', route: '/incidents' },
                  { title: 'System Performance Analytics', route: '/analytics' },
                  { title: 'System Status Matrix', route: '/system' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigateTo(item.route);
                      setIsCommandPaletteOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      backgroundColor: 'var(--dark-surface)',
                      border: '1px solid var(--border-dark)',
                      color: '#FFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{item.title}</span>
                    <ArrowRight size={14} color="var(--accent-orange)" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results: NODES / SIGNALS */}
          {filteredNodes.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--accent-orange)',
                marginBottom: '8px',
                letterSpacing: '0.1em'
              }}>
                TELEMETRY NODES & SIGNALS ({filteredNodes.length})
              </div>
              {filteredNodes.slice(0, 4).map(node => (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNode(node);
                    navigateTo('/map');
                    setIsCommandPaletteOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--dark-surface)',
                    border: '1px solid var(--border-dark)',
                    marginBottom: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Radio size={14} color="var(--accent-orange)" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px' }}>{node.source}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-inverse-muted)' }}>{node.location}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--status-success)' }}>
                    {node.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results: ASSETS */}
          {filteredAssets.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--accent-orange)',
                marginBottom: '8px',
                letterSpacing: '0.1em'
              }}>
                URBAN ASSETS ({filteredAssets.length})
              </div>
              {filteredAssets.slice(0, 4).map(asset => (
                <div
                  key={asset.id}
                  onClick={() => {
                    setSelectedAsset(asset);
                    navigateTo('/assets');
                    setIsCommandPaletteOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--dark-surface)',
                    border: '1px solid var(--border-dark)',
                    marginBottom: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Layers size={14} color="#FFF" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px' }}>{asset.id}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-inverse-muted)' }}>{asset.name}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                    HEALTH: {asset.health}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results: INCIDENTS */}
          {filteredIncidents.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--accent-orange)',
                marginBottom: '8px',
                letterSpacing: '0.1em'
              }}>
                INCIDENTS ({filteredIncidents.length})
              </div>
              {filteredIncidents.slice(0, 4).map(inc => (
                <div
                  key={inc.id}
                  onClick={() => {
                    setSelectedIncident(inc);
                    navigateTo('/incidents');
                    setIsCommandPaletteOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--dark-surface)',
                    border: '1px solid var(--border-dark)',
                    marginBottom: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldAlert size={14} color="var(--status-error)" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px' }}>{inc.id}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-inverse-muted)' }}>{inc.title}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--status-warning)' }}>
                    {inc.severity}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results: REPORTS */}
          {filteredReports.length > 0 && (
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--accent-orange)',
                marginBottom: '8px',
                letterSpacing: '0.1em'
              }}>
                INTELLIGENCE REPORTS ({filteredReports.length})
              </div>
              {filteredReports.slice(0, 4).map(rep => (
                <div
                  key={rep.id}
                  onClick={() => {
                    setSelectedReport(rep);
                    navigateTo('/reports');
                    setIsCommandPaletteOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--dark-surface)',
                    border: '1px solid var(--border-dark)',
                    marginBottom: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={14} color="#FFF" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px' }}>{rep.id}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-inverse-muted)' }}>{rep.title}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-inverse-muted)' }}>
                    {rep.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--border-dark)',
          backgroundColor: 'var(--dark-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-inverse-muted)'
        }}>
          <span>NAVIGATE WITH ARROW KEYS / ENTER TO SELECT</span>
          <span>NEXUSFLOW SEARCH ENGINE</span>
        </div>
      </div>
    </div>
  );
}
