import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import DetailDrawer from '../components/common/DetailDrawer';
import { Layers, Wrench, Search, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AssetsModule() {
  const { assets, setSelectedAsset } = useTelemetry();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORY_COUNTS = [
    { label: 'ALL ASSETS', count: 12482, cat: 'ALL' },
    { label: 'ROADS', count: 4820, cat: 'ROADS' },
    { label: 'BRIDGES', count: 314, cat: 'BRIDGES' },
    { label: 'LIGHTING', count: 5410, cat: 'LIGHTING' },
    { label: 'WATER', count: 890, cat: 'WATER' },
    { label: 'POWER', count: 620, cat: 'POWER' },
    { label: 'PUBLIC FACILITIES', count: 428, cat: 'PUBLIC FACILITIES' },
  ];

  const filteredAssets = assets.filter(ast => {
    const matchesCat = selectedCategory === 'ALL' || ast.type === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      ast.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ast.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="AST / ASSETS" 
        title="URBAN ASSET NETWORK" 
        subtitle="Catalog of physical municipal infrastructure with predictive stress indicators and structural telemetry."
      />

      {/* Asset Breakdown Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}>
        {CATEGORY_COUNTS.map((catItem, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedCategory(catItem.cat)}
            style={{
              backgroundColor: selectedCategory === catItem.cat ? 'var(--dark-bg)' : 'var(--bg-surface)',
              color: selectedCategory === catItem.cat ? '#FFF' : 'var(--text-main)',
              border: `1px solid ${selectedCategory === catItem.cat ? 'var(--accent-orange)' : 'var(--border-light)'}`,
              padding: '14px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-hard-sm)',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: selectedCategory === catItem.cat ? 'var(--accent-orange)' : 'var(--text-muted)', fontWeight: 700 }}>
              {catItem.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>
              {catItem.count.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Search & Action Bar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '400px' }}>
          <Search size={18} color="var(--accent-orange)" />
          <input
            type="text"
            className="input-brutalist"
            placeholder="SEARCH ASSETS BY ID OR NAME..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
          SHOWING {filteredAssets.length} REGISTERED ASSET NODES
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className="shadow-hard-hover"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              padding: '20px',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent-orange)' }}>
                {asset.id}
              </span>
              <StatusBadge status={asset.status} />
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              lineHeight: '1.2',
              fontWeight: 800,
              margin: '0 0 8px 0',
              textTransform: 'uppercase'
            }}>
              {asset.name}
            </h3>

            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              LOCATION: {asset.location}
            </div>

            {/* Health Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                <span>STRUCTURAL HEALTH</span>
                <span style={{ fontWeight: 700, color: asset.health > 85 ? 'var(--status-success)' : 'var(--status-warning)' }}>{asset.health}%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)' }}>
                <div style={{
                  height: '100%',
                  width: `${asset.health}%`,
                  backgroundColor: asset.health > 85 ? 'var(--status-success)' : 'var(--status-warning)'
                }} />
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)'
            }}>
              <span>TYPE: {asset.type}</span>
              <span>INSPECTED: {asset.lastInspection}</span>
            </div>
          </div>
        ))}
      </div>

      <DetailDrawer />
    </div>
  );
}
