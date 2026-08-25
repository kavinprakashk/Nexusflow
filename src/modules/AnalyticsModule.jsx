import React from 'react';
import PageHeader from '../components/common/PageHeader';
import TelemetryChart from '../components/visualizers/TelemetryChart';
import { BarChart3, TrendingUp, Clock, Zap, ShieldCheck } from 'lucide-react';

export default function AnalyticsModule() {
  const KPI_CARDS = [
    { label: 'AVERAGE RESPONSE TIME', value: '1.42s', delta: '-12.4%', sub: 'FROM LAST 24H', icon: Clock, isGood: true },
    { label: 'NETWORK EFFICIENCY', value: '94.8%', delta: '+3.1%', sub: 'TARGET: 95.0%', icon: Zap, isGood: true },
    { label: 'DATA COMPLETENESS', value: '99.94%', delta: '+0.02%', sub: 'PACKET LOSS: 0.002%', icon: ShieldCheck, isGood: true },
    { label: 'INCIDENT RESOLUTION RATE', value: '88.4%', delta: '+5.2%', sub: 'AVG TIME: 14 MIN', icon: TrendingUp, isGood: true },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="ANL / ANALYTICS" 
        title="SYSTEM ANALYTICS & TELEMETRY" 
        subtitle="High-density quantitative telemetry models and municipal efficiency metrics across time domains."
      />

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {KPI_CARDS.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                padding: '20px',
                boxShadow: 'var(--shadow-hard-md)',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                backgroundColor: 'var(--accent-orange)'
              }} />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {kpi.label}
                </span>
                <Icon size={18} color="var(--accent-orange)" />
              </div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '36px',
                lineHeight: '1',
                fontWeight: 800,
                color: 'var(--text-main)'
              }}>
                {kpi.value}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px'
              }}>
                <span style={{ fontWeight: 700, color: 'var(--status-success)' }}>{kpi.delta}</span>
                <span style={{ color: 'var(--text-muted)' }}>{kpi.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytical Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <TelemetryChart title="CITY NETWORK HEALTH & LATENCY PROFILE" height={280} />
        <TelemetryChart title="TRAFFIC CONGESTION & SPEED CORRIDOR VECTOR" height={280} />
        <TelemetryChart title="SUBSTATION POWER GRID CONSUMPTION CURVE" height={280} />
        <TelemetryChart title="ENVIRONMENTAL AQI & EMISSION DENSITY PROFILE" height={280} />
      </div>
    </div>
  );
}
