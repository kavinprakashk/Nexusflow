import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { Settings, Key, Bell, Shield, Sliders, Database, Map } from 'lucide-react';

export default function SettingsModule() {
  const [activeTab, setActiveTab] = useState('ACCOUNT');

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="CFG / SETTINGS" 
        title="SYSTEM CONFIGURATION MATRIX" 
        subtitle="Operator parameters, security roles, API key dispatchers, and map rendering engines."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Left Vertical Brutalist Nav Tabs */}
        <div style={{
          backgroundColor: 'var(--dark-bg)',
          border: '1px solid var(--border-dark)',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {[
            'ACCOUNT & OPERATOR',
            'NOTIFICATIONS & WEBHOOKS',
            'DATA SOURCES & PIPELINES',
            'DASHBOARD PREFERENCES',
            'MAP RENDERING ENGINE',
            'SECURITY & ROLE ACCESS',
            'API TOKEN KEYS',
            'SYSTEM TELEMETRY',
          ].map((tabLabel) => {
            const key = tabLabel.split(' ')[0];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '12px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textAlign: 'left',
                  backgroundColor: isActive ? 'var(--accent-orange)' : 'var(--dark-surface)',
                  color: isActive ? '#FFF' : 'var(--text-inverse-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tabLabel}
              </button>
            );
          })}
        </div>

        {/* Right Form Configuration Area */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          padding: '28px',
          boxShadow: 'var(--shadow-hard-md)'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '26px',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
            borderBottom: '2px solid var(--accent-orange)',
            paddingBottom: '8px'
          }}>
            {activeTab} PARAMETERS
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
                OPERATOR IDENTIFIER CODE
              </label>
              <input type="text" className="input-brutalist" defaultValue="OPERATOR_09_ALPHA" />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
                PRIMARY COMMAND DOMAIN
              </label>
              <input type="text" className="input-brutalist" defaultValue="telemetry.nexusflow.city.gov" />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
                TELEMETRY REFRESH FREQUENCY (MS)
              </label>
              <input type="number" className="input-brutalist" defaultValue="2500" />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
                WEBHOOK DISPATCH ENDPOINT
              </label>
              <input type="text" className="input-brutalist" defaultValue="https://api.nexusflow.io/v4/webhooks/dispatch" />
            </div>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: 'var(--dark-bg)',
            color: '#FFF',
            border: '1px solid var(--border-dark)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            marginBottom: '24px'
          }}>
            <div style={{ color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '6px' }}>ACTIVE API ACCESS TOKEN</div>
            <div style={{ padding: '8px', backgroundColor: '#000', border: '1px solid var(--border-dark)', color: 'var(--status-success)' }}>
              nxf_live_99a8b7c6d5e4f3a2b1c0_prod_telemetry_bearer
            </div>
          </div>

          <button
            className="btn-brutalist"
            onClick={() => alert('System preferences updated.')}
          >
            SAVE SYSTEM CONFIGURATION
          </button>
        </div>
      </div>
    </div>
  );
}
