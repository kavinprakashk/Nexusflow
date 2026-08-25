import React, { createContext, useContext, useState, useEffect } from 'react';

const TelemetryContext = createContext();

const MOCK_SIGNALS = [
  { id: 'SIG-0421', source: 'NODE-042', category: 'TRAFFIC', location: 'CENTRAL DISTRICT', value: '72%', change: '+4.2%', status: 'OPERATIONAL', timestamp: '12 SEC AGO', rawValue: 72 },
  { id: 'SIG-0422', source: 'NODE-184', category: 'AIR', location: 'NORTH SECTOR', value: '88 AQI', change: '-1.5%', status: 'OPERATIONAL', timestamp: '18 SEC AGO', rawValue: 88 },
  { id: 'SIG-0423', source: 'NODE-092', category: 'ENERGY', location: 'SUBSTATION 4', value: '4.2 MW', change: '+0.8%', status: 'OPERATIONAL', timestamp: '24 SEC AGO', rawValue: 4.2 },
  { id: 'SIG-0424', source: 'NODE-311', category: 'WATER', location: 'VALLEY RESERVOIR', value: '1.4K L/s', change: '+2.1%', status: 'WARNING', timestamp: '31 SEC AGO', rawValue: 1400 },
  { id: 'SIG-0425', source: 'NODE-502', category: 'INFRASTRUCTURE', location: 'HARBOR BRIDGE', value: 'LOAD 41%', change: '0.0%', status: 'OPERATIONAL', timestamp: '45 SEC AGO', rawValue: 41 },
  { id: 'SIG-0426', source: 'NODE-019', category: 'WEATHER', location: 'METEO STATION A', value: '28°C / 64% RH', change: '+0.5°C', status: 'OPERATIONAL', timestamp: '52 SEC AGO', rawValue: 28 },
  { id: 'SIG-0427', source: 'NODE-773', category: 'PUBLIC SAFETY', location: 'EAST TUNNEL', value: 'DENSITY HIGH', change: '+12%', status: 'CRITICAL', timestamp: '1 MIN AGO', rawValue: 92 },
  { id: 'SIG-0428', source: 'NODE-105', category: 'TRAFFIC', location: 'WEST EXPRESSWAY', value: '54 KM/H', change: '-3.4%', status: 'OPERATIONAL', timestamp: '1 MIN AGO', rawValue: 54 },
];

const MOCK_EVENTS = [
  { id: 'EVT-901', time: '21:14:08', title: 'Traffic congestion detected', zone: 'CENTRAL DISTRICT', node: 'NODE-042', severity: 'WARNING' },
  { id: 'EVT-902', time: '21:13:41', title: 'Air quality sensor threshold exceeded', zone: 'NORTH SECTOR', node: 'AQ-184', severity: 'CRITICAL' },
  { id: 'EVT-903', time: '21:12:59', title: 'Infrastructure maintenance completed', zone: 'HARBOR DISTRICT', node: 'BR-092', severity: 'OPERATIONAL' },
  { id: 'EVT-904', time: '21:11:15', title: 'Power grid load balancer activated', zone: 'EAST ZONE', node: 'PWR-710', severity: 'OPERATIONAL' },
  { id: 'EVT-905', time: '21:09:44', title: 'Water pressure drop registered', zone: 'VALLEY BASIN', node: 'WTR-311', severity: 'WARNING' },
];

const MOCK_ASSETS = [
  { id: 'AST-ROD-092', name: 'Central Highway Segment 4', type: 'ROADS', location: 'Central District (Lat 37.77, Lng -122.41)', health: 94, lastInspection: '2026-08-01', status: 'OPERATIONAL', sensors: 24, load: '78%' },
  { id: 'AST-BRG-014', name: 'Skyway Suspension Bridge', type: 'BRIDGES', location: 'Harbor Transit Bay', health: 82, lastInspection: '2026-07-15', status: 'WARNING', sensors: 68, load: '89%' },
  { id: 'AST-LGT-481', name: 'Smart LED Mesh Zone B', type: 'LIGHTING', location: 'Metro Square', health: 99, lastInspection: '2026-08-10', status: 'OPERATIONAL', sensors: 512, load: '34%' },
  { id: 'AST-WTR-305', name: 'Main Intake Pumping Station', type: 'WATER', location: 'Valley River Reservoir', health: 88, lastInspection: '2026-07-28', status: 'OPERATIONAL', sensors: 42, load: '62%' },
  { id: 'AST-PWR-112', name: 'High Voltage Transformer 8', type: 'POWER', location: 'East Substation', health: 76, lastInspection: '2026-06-30', status: 'WARNING', sensors: 18, load: '91%' },
  { id: 'AST-FAC-009', name: 'Municipal Data Dispatch Hub', type: 'PUBLIC FACILITIES', location: 'Civic Center Complex', health: 100, lastInspection: '2026-08-12', status: 'OPERATIONAL', sensors: 140, load: '22%' },
];

const MOCK_INCIDENTS = [
  { id: 'INC-0421', title: 'Traffic Bottleneck & Signal Delay', location: 'Central District Blvd', severity: 'HIGH', status: 'ACTIVE', timeAgo: '04 MIN AGO', assignedTeam: 'ALPHA DISPATCH', affectedSystems: ['TRAFFIC_CTRL_04', 'COMM_MESH'] },
  { id: 'INC-0420', title: 'Transformer Temperature Warning', location: 'Substation 4 East', severity: 'MEDIUM', status: 'ACTIVE', timeAgo: '18 MIN AGO', assignedTeam: 'GRID TECH 2', affectedSystems: ['GRID_MONITOR'] },
  { id: 'INC-0419', title: 'Air Sensor Calibration Drift', location: 'North Industrial Sector', severity: 'LOW', status: 'ACTIVE', timeAgo: '42 MIN AGO', assignedTeam: 'ENV SENSORS', affectedSystems: ['AQ_GRID'] },
  { id: 'INC-0418', title: 'Water Main Pressure Spike', location: 'Valley Basin Sector 3', severity: 'CRITICAL', status: 'RESOLVED', timeAgo: '2 HRS AGO', assignedTeam: 'WATER PIPELINE A', affectedSystems: ['SCADA_VALVE_09'] },
  { id: 'INC-0417', title: 'Public Lighting Relay Outage', location: 'Metro Commercial Corridor', severity: 'LOW', status: 'RESOLVED', timeAgo: '5 HRS AGO', assignedTeam: 'CITY LIGHTING', affectedSystems: ['LIGHTING_NODE'] },
];

const MOCK_REPORTS = [
  { id: 'REP-2026-08', title: 'City Performance Summary — August 2026', category: 'EXECUTIVE', date: '2026-08-13', coverage: 'ALL SECTORS (1,284 NODES)', dataPoints: '74.2M', status: 'PUBLISHED', summary: 'Comprehensive analysis of city infrastructure throughput, power distribution efficiency (+3.1%), and emergency response latency improvements (-12.4%).' },
  { id: 'REP-W32-NET', title: 'Network Health & Telemetry Audit — Week 32', category: 'TELEMETRY', date: '2026-08-10', coverage: 'COMMUNICATION MESH', dataPoints: '18.9M', status: 'PUBLISHED', summary: 'Audit of sensor latency across 5G CBRS backhaul nodes. Average packet loss maintained below 0.002% with zero unhandled downtime.' },
  { id: 'REP-TRF-JUL', title: 'Urban Traffic Flow & Congestion Heatmap', category: 'MOBILITY', date: '2026-07-31', coverage: 'METROPOLITAN ROADWAYS', dataPoints: '112.5M', status: 'PUBLISHED', summary: 'Deep dive into peak hour corridor friction points. Dynamic adaptive signal timing reduced wait cycles by 14.2 minutes per vehicle daily.' },
  { id: 'REP-INF-Q3', title: 'Infrastructure Longevity & Risk Projection Q3', category: 'ASSETS', date: '2026-07-15', coverage: 'BRIDGES, POWER, WATER', dataPoints: '32.1M', status: 'PUBLISHED', summary: 'Predictive stress analytics identified 3 bridge joint dampeners requiring preventive maintenance before winter thermal contraction.' },
];

const MOCK_SOURCES = [
  { id: 'SRC-01', name: 'Traffic Mesh Sensors', type: 'MQTT / LoRaWAN', nodes: 1284, status: 'CONNECTED', latency: '14ms', throughput: '4.2K req/s', dataQuality: '99.98%' },
  { id: 'SRC-02', name: 'National Weather Telemetry', type: 'REST API / Webhook', nodes: 48, status: 'ACTIVE', latency: '42ms', throughput: '120 req/s', dataQuality: '100.0%' },
  { id: 'SRC-03', name: 'Smart Power Grid SCADA', type: 'DNP3 / Industrial', nodes: 312, status: 'ACTIVE', latency: '8ms', throughput: '1.8K req/s', dataQuality: '99.94%' },
  { id: 'SRC-04', name: 'Municipal Water Sensor Network', type: 'Modbus / Cellular', nodes: 520, status: 'CONNECTED', latency: '26ms', throughput: '850 req/s', dataQuality: '99.89%' },
  { id: 'SRC-05', name: 'Air Quality Monitoring Mesh', type: 'CoAP / Wireless', nodes: 982, status: 'CONNECTED', latency: '19ms', throughput: '1.4K req/s', dataQuality: '99.95%' },
  { id: 'SRC-06', name: 'Emergency Dispatch Feed', type: 'WebSocket / Real-Time', nodes: 14, status: 'ACTIVE', latency: '4ms', throughput: '310 req/s', dataQuality: '100.0%' },
];

export function TelemetryProvider({ children }) {
  // Navigation State
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  // Speed Simulation Multiplier (1X, 2X, 4X)
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Command Palette State (Ctrl+K)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Drawer / Inspection States
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  // Telemetry Metrics State
  const [metrics, setMetrics] = useState({
    activeNodes: 1284,
    throughput: 8.4,
    systemHealth: 99.9,
    activeEvents: 42,
    networkCoverage: 97.8,
    lastSync: '21:14:08',
  });

  const [signals, setSignals] = useState(MOCK_SIGNALS);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [assets] = useState(MOCK_ASSETS);
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);
  const [reports] = useState(MOCK_REPORTS);
  const [sources, setSources] = useState(MOCK_SOURCES);

  // Hash Navigation Listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentRoute(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Telemetry Live Update Ticker
  useEffect(() => {
    const intervalMs = Math.max(500, 2500 / speedMultiplier);
    
    const timer = setInterval(() => {
      // Fluctuate metrics
      setMetrics(prev => {
        const throughputDelta = (Math.random() * 0.4 - 0.2).toFixed(1);
        const newThroughput = Math.max(7.2, Math.min(9.8, parseFloat((prev.throughput + parseFloat(throughputDelta)).toFixed(1))));
        const eventDelta = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const now = new Date();
        const formattedTime = now.toTimeString().split(' ')[0];

        return {
          ...prev,
          throughput: newThroughput,
          activeEvents: Math.max(35, Math.min(50, prev.activeEvents + eventDelta)),
          lastSync: formattedTime,
        };
      });

      // Update signal timestamps and values
      setSignals(prevSignals => {
        return prevSignals.map((sig, idx) => {
          if (idx === Math.floor(Math.random() * prevSignals.length)) {
            const delta = Math.floor(Math.random() * 5) - 2;
            const newRaw = Math.max(10, sig.rawValue + delta);
            return {
              ...sig,
              rawValue: newRaw,
              value: sig.category === 'TRAFFIC' ? `${newRaw}%` : sig.category === 'AIR' ? `${newRaw} AQI` : sig.value,
              timestamp: 'JUST NOW',
            };
          }
          return sig;
        });
      });

    }, intervalMs);

    return () => clearInterval(timer);
  }, [speedMultiplier]);

  const acknowledgeAlert = (id) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'RESOLVED' } : inc));
  };

  return (
    <TelemetryContext.Provider
      value={{
        currentRoute,
        navigateTo,
        speedMultiplier,
        setSpeedMultiplier,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        selectedNode,
        setSelectedNode,
        selectedAsset,
        setSelectedAsset,
        selectedIncident,
        setSelectedIncident,
        selectedReport,
        setSelectedReport,
        metrics,
        signals,
        events,
        assets,
        incidents,
        reports,
        sources,
        acknowledgeAlert,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
}
