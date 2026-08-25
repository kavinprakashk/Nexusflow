import React from 'react';
import { TelemetryProvider, useTelemetry } from './context/TelemetryContext';
import TopNavigation from './components/common/TopNavigation';
import CommandPalette from './components/common/CommandPalette';

// 12 Production Modules
import OverviewModule from './modules/OverviewModule';
import MapModule from './modules/MapModule';
import SignalsModule from './modules/SignalsModule';
import AssetsModule from './modules/AssetsModule';
import AnalyticsModule from './modules/AnalyticsModule';
import IncidentsModule from './modules/IncidentsModule';
import AlertsModule from './modules/AlertsModule';
import ReportsModule from './modules/ReportsModule';
import SourcesModule from './modules/SourcesModule';
import SettingsModule from './modules/SettingsModule';
import StatusModule from './modules/StatusModule';

function AppContent() {
  const { currentRoute } = useTelemetry();

  const renderModule = () => {
    switch (currentRoute) {
      case '/map':
        return <MapModule />;
      case '/signals':
        return <SignalsModule />;
      case '/assets':
        return <AssetsModule />;
      case '/analytics':
        return <AnalyticsModule />;
      case '/incidents':
        return <IncidentsModule />;
      case '/alerts':
        return <AlertsModule />;
      case '/reports':
        return <ReportsModule />;
      case '/sources':
        return <SourcesModule />;
      case '/settings':
        return <SettingsModule />;
      case '/system':
        return <StatusModule />;
      case '/':
      default:
        return <OverviewModule />;
    }
  };

  return (
    <div className="app-container brutalist-grid">
      {/* Sticky Top Navigation Bar */}
      <TopNavigation />

      {/* Main Content Area */}
      <main className="main-content">
        {renderModule()}
      </main>

      {/* Global OS Command Palette Modal */}
      <CommandPalette />

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--dark-bg)',
        borderTop: '2px solid var(--accent-orange)',
        color: 'var(--text-inverse-muted)',
        padding: '20px 24px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <strong style={{ color: '#FFF' }}>NEXUSFLOW</strong> — CITY-SCALE INTELLIGENCE TELEMETRY OPERATING SYSTEM
          </div>
          <div>
            SECURITY CLEARANCE: <span style={{ color: 'var(--accent-orange)' }}>LEVEL 4</span> | LAT 37.7749° N / LNG 122.4194° W
          </div>
          <div>
            STATUS: <span style={{ color: 'var(--status-success)' }}>OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TelemetryProvider>
      <AppContent />
    </TelemetryProvider>
  );
}
