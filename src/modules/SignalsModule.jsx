import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import SignalPulseStream from '../components/visualizers/SignalPulseStream';
import { Search, Filter, RefreshCw, Radio } from 'lucide-react';

export default function SignalsModule() {
  const { signals, setSelectedNode, navigateTo } = useTelemetry();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSignals = signals.filter(sig => {
    const matchesCategory = categoryFilter === 'ALL' || sig.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || sig.status === statusFilter;
    const matchesQuery = searchQuery === '' || 
      sig.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sig.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesQuery;
  });

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="SIG / SIGNALS" 
        title="SIGNAL INTELLIGENCE STREAM" 
        subtitle="Continuous telemetry ingest pipeline monitoring urban sensor vectors across all municipal domains."
      />

      {/* Waveform Pulse Stream Visualizer */}
      <SignalPulseStream />

      {/* Filtering & Search Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-light)',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-hard-sm)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '260px' }}>
          <Search size={18} color="var(--accent-orange)" />
          <input
            type="text"
            className="input-brutalist"
            placeholder="FILTER SIGNALS BY ID, SOURCE OR ZONE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, alignSelf: 'center', marginRight: '6px' }}>
            CATEGORY:
          </span>
          {['ALL', 'TRAFFIC', 'ENERGY', 'AIR', 'WATER', 'INFRASTRUCTURE', 'PUBLIC SAFETY'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '5px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: categoryFilter === cat ? 'var(--accent-orange)' : 'var(--bg-surface-alt)',
                color: categoryFilter === cat ? '#FFF' : 'var(--text-main)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, alignSelf: 'center', marginRight: '6px' }}>
            STATUS:
          </span>
          {['ALL', 'OPERATIONAL', 'WARNING', 'CRITICAL'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '5px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: statusFilter === st ? 'var(--dark-bg)' : 'var(--bg-surface-alt)',
                color: statusFilter === st ? 'var(--accent-orange)' : 'var(--text-main)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Technical Signals Table */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-hard-md)',
        overflowX: 'auto'
      }}>
        <table className="table-brutalist">
          <thead>
            <tr>
              <th>SIGNAL ID</th>
              <th>SOURCE NODE</th>
              <th>CATEGORY</th>
              <th>LOCATION</th>
              <th>READOUT VALUE</th>
              <th>STATUS</th>
              <th>DELTA</th>
              <th>TIMESTAMP</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredSignals.map((sig) => (
              <tr key={sig.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-orange)' }}>
                  {sig.id}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {sig.source}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  {sig.category}
                </td>
                <td>{sig.location}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800 }}>
                  {sig.value}
                </td>
                <td>
                  <StatusBadge status={sig.status} />
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: sig.change.startsWith('+') ? 'var(--status-success)' : 'var(--status-warning)' }}>
                  {sig.change}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {sig.timestamp}
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedNode(sig);
                      navigateTo('/map');
                    }}
                    style={{
                      padding: '4px 8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      backgroundColor: 'var(--dark-bg)',
                      color: '#FFF',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    INSPECT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
