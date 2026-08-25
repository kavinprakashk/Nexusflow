import React, { useRef, useEffect, useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { 
  Plus, 
  Minus, 
  Navigation, 
  Activity, 
  Radio, 
  Cpu, 
  Sliders, 
  Search,
  MapPin,
  Globe,
  Compass
} from 'lucide-react';

// Regional Camera Presets for India Spatial Map
const INDIA_REGION_PRESETS = [
  { id: 'NATIONAL', label: 'PAN INDIA OVERVIEW', x: 0, y: 20, zoom: 0.85 },
  { id: 'NORTH', label: 'NORTHERN COMMAND (NCR)', x: -60, y: -200, zoom: 1.6 },
  { id: 'WEST', label: 'WESTERN CORRIDOR (MUMBAI / GIFT CITY)', x: -240, y: 40, zoom: 1.5 },
  { id: 'SOUTH', label: 'SOUTHERN TECH TRIANGLE (BLR / HYD / MAA)', x: -50, y: 240, zoom: 1.5 },
  { id: 'EAST', label: 'EASTERN HUB (KOLKATA)', x: 260, y: -10, zoom: 1.6 },
];

// Real-Time Spatial Sensor Nodes for Major Indian Metros
const INDIA_SPATIAL_NODES = [
  { id: 'DEL-01', name: 'New Delhi NCR SCADA', city: 'NEW DELHI', category: 'ENERGY', x: -50, y: -220, status: 'OPERATIONAL', type: 'hex', value: '4.8 GW LOAD', latency: '4ms' },
  { id: 'BOM-02', name: 'Mumbai Port Logistics Mesh', city: 'MUMBAI', category: 'SECURITY', x: -240, y: 80, status: 'OPERATIONAL', type: 'hex', value: '14.2K TEU/D', latency: '8ms' },
  { id: 'BLR-03', name: 'Bengaluru Quantum Tech Grid', city: 'BENGALURU', category: 'TRAFFIC', x: -110, y: 280, status: 'OPERATIONAL', type: 'diamond', value: '99.99% UPTIME', latency: '3ms' },
  { id: 'HYD-04', name: 'Hyderabad Cyberabad SCADA', city: 'HYDERABAD', category: 'INFRASTRUCTURE', x: 10, y: 150, status: 'OPERATIONAL', type: 'hex', value: '1.2 TB/S', latency: '5ms' },
  { id: 'MAA-05', name: 'Chennai Subsea Cable Landing', city: 'CHENNAI', category: 'INFRASTRUCTURE', x: -10, y: 320, status: 'OPERATIONAL', type: 'diamond', value: '84 TBPS FIBER', latency: '6ms' },
  { id: 'CCU-06', name: 'Kolkata Freight Terminal', city: 'KOLKATA', category: 'SECURITY', x: 280, y: -20, status: 'WARNING', type: 'hex', value: 'CONGESTION', latency: '42ms' },
  { id: 'AMD-07', name: 'GIFT City Financial SCADA', city: 'AHMEDABAD', category: 'ENERGY', x: -260, y: -40, status: 'OPERATIONAL', type: 'diamond', value: 'SOLAR 1.8GW', latency: '7ms' },
  { id: 'PUN-08', name: 'Pune Automotive IoT Grid', city: 'PUNE', category: 'TRAFFIC', x: -210, y: 120, status: 'OPERATIONAL', type: 'hex', value: '74 KM/H AVG', latency: '9ms' },
  { id: 'JAI-09', name: 'Jaipur Smart Grid Beacon', city: 'JAIPUR', category: 'ENVIRONMENT', x: -140, y: -160, status: 'OPERATIONAL', type: 'diamond', value: '38 AQI', latency: '12ms' },
  { id: 'VTZ-10', name: 'Visakhapatnam Deepwater SCADA', city: 'VIZAG', category: 'SECURITY', x: 140, y: 180, status: 'CRITICAL', type: 'hex', value: 'STORM ALERT', latency: '88ms' },
];

// Layer A: Golden Quadrilateral & National Power Grid Lines
const NATIONAL_GRID_EDGES = [
  { from: 'DEL-01', to: 'JAI-09', broken: false },
  { from: 'JAI-09', to: 'AMD-07', broken: false },
  { from: 'AMD-07', to: 'BOM-02', broken: false },
  { from: 'BOM-02', to: 'PUN-08', broken: false },
  { from: 'PUN-08', to: 'BLR-03', broken: false },
  { from: 'BLR-03', to: 'MAA-05', broken: false },
  { from: 'MAA-05', to: 'VTZ-10', broken: true }, // Broken Edge with Health Pulse
  { from: 'VTZ-10', to: 'CCU-06', broken: true },
  { from: 'DEL-01', to: 'HYD-04', broken: false },
  { from: 'HYD-04', to: 'BLR-03', broken: false },
  { from: 'HYD-04', to: 'MAA-05', broken: false },
  { from: 'DEL-01', to: 'CCU-06', broken: false },
];

// Layer C: Interstate Freight & High-Speed Transit Corridors
const NATIONAL_FREIGHT_CORRIDORS = [
  { id: 'DEL-BOM-CORR', name: 'Western Dedicated Freight Corridor', points: [{x: -50, y: -220}, {x: -140, y: -160}, {x: -260, y: -40}, {x: -240, y: 80}], velocity: 95, color: '#00ffcc' },
  { id: 'BOM-BLR-CORR', name: 'Industrial Tech Transit Route', points: [{x: -240, y: 80}, {x: -210, y: 120}, {x: -110, y: 280}], velocity: 80, color: '#00ffcc' },
  { id: 'BLR-HYD-CORR', name: 'Deccan Cyber Expressway', points: [{x: -110, y: 280}, {x: 10, y: 150}, {x: -50, y: -220}], velocity: 90, color: '#00ffcc' },
  { id: 'MAA-VTZ-CORR', name: 'Eastern Coastal Logistics Line', points: [{x: -10, y: 320}, {x: 140, y: 180}, {x: 280, y: -20}], velocity: 35, color: '#ffaa00' },
];

// Layer D: Incident Hotspots in India
const NATIONAL_INCIDENT_HOTSPOTS = [
  { id: 'INC-IND-01', name: 'Bay of Bengal Cyclonic Weather Surge', x: 140, y: 180, severity: 0.92, radius: 65, color: '#ff0055' },
  { id: 'INC-IND-02', name: 'Eastern Freight Port Clearance Bottleneck', x: 280, y: -20, severity: 0.72, radius: 45, color: '#ffaa00' },
  { id: 'INC-IND-03', name: 'NCR High Density Traffic Gridlock', x: -50, y: -220, severity: 0.65, radius: 40, color: '#ffaa00' }
];

export default function LiveCityMap({ fullScreen = false }) {
  const { setSelectedNode, metrics, speedMultiplier } = useTelemetry();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Camera State with smooth lerp
  const [camera, setCamera] = useState({ x: 0, y: 20, zoom: 0.85 });
  const [targetCamera, setTargetCamera] = useState({ x: 0, y: 20, zoom: 0.85 });
  const [activeRegion, setActiveRegion] = useState('NATIONAL');

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(60);
  const [searchQuery, setSearchQuery] = useState('');

  // Layer Toggles
  const [layers, setLayers] = useState({
    INFRA: true,      // Layer A: National Infrastructure Interconnects
    SENSORS: true,    // Layer B: Metro Sensor Grid
    VECTORS: true,    // Layer C: Interstate Freight Corridors
    HOTSPOTS: true,   // Layer D: Critical Regional Hotspots
  });

  const toggleLayer = (key) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // One-click Transition for Regional Views
  const applyRegionPreset = (preset) => {
    setActiveRegion(preset.id);
    setTargetCamera({ x: preset.x, y: preset.y, zoom: preset.zoom });
  };

  // EXPLICIT BUTTON-ONLY ZOOM CONTROLS (Touchpad wheel scrolling disabled)
  const handleZoomIn = () => {
    setTargetCamera(prev => ({
      ...prev,
      zoom: Math.min(2.8, +(prev.zoom + 0.25).toFixed(2))
    }));
  };

  const handleZoomOut = () => {
    setTargetCamera(prev => ({
      ...prev,
      zoom: Math.max(0.4, +(prev.zoom - 0.25).toFixed(2))
    }));
  };

  const handleResetCamera = () => {
    setActiveRegion('NATIONAL');
    setTargetCamera({ x: 0, y: 20, zoom: 0.85 });
  };

  // Mouse Panning
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = (e.clientX - dragStart.x) / camera.zoom;
    const dy = (e.clientY - dragStart.y) / camera.zoom;
    setCamera(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    setTargetCamera(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Render Engine (60FPS Hardware Accelerated)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Main 60FPS Render Engine Loop
    const render = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      frameCount++;
      if (time - fpsTimer >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        fpsTimer = time;
      }

      // Smooth Cubic Camera Interpolation (non-linear ease)
      setCamera(prev => {
        const lerpFactor = 0.14; // smooth transition curve
        return {
          x: prev.x + (targetCamera.x - prev.x) * lerpFactor,
          y: prev.y + (targetCamera.y - prev.y) * lerpFactor,
          zoom: prev.zoom + (targetCamera.zoom - prev.zoom) * lerpFactor
        };
      });

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const cx = width / 2 + camera.x * camera.zoom;
      const cy = height / 2 + camera.y * camera.zoom;

      // 1. BASE MAP BACKDROP (#06080d Deep Slate)
      ctx.fillStyle = '#06080d';
      ctx.fillRect(0, 0, width, height);

      // 2. GEOSPATIAL VECTOR GRID & RADAR CONCENTRIC RINGS
      ctx.save();
      const gridSize = 50 * camera.zoom;
      const offsetX = (cx % gridSize);
      const offsetY = (cy % gridSize);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Latitude / Longitude Radar Rings
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.06)';
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, 300 * camera.zoom, 0, Math.PI * 2);
      ctx.arc(cx, cy, 520 * camera.zoom, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(camera.zoom, camera.zoom);

      const sec = time / 1000 * speedMultiplier;

      // =========================================================================
      // INDIA MAP VECTOR BOUNDARY OUTLINE & COASTLINE GEOMETRY
      // =========================================================================
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.22)';
      ctx.fillStyle = 'rgba(0, 255, 204, 0.015)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 255, 204, 0.3)';

      // High-Contrast Stylized India Boundary Path
      ctx.beginPath();
      // Northern Boundary (Kashmir / Ladakh / HP)
      ctx.moveTo(-90, -380);
      ctx.lineTo(-40, -420);
      ctx.lineTo(20, -390);
      ctx.lineTo(40, -330);
      ctx.lineTo(100, -290);
      // North East Region
      ctx.lineTo(260, -260);
      ctx.lineTo(360, -220);
      ctx.lineTo(380, -140);
      ctx.lineTo(300, -110);
      ctx.lineTo(280, -20);
      // Eastern Coastline (Bay of Bengal down to Kanyakumari)
      ctx.lineTo(240, 60);
      ctx.lineTo(140, 180);
      ctx.lineTo(-10, 320);
      ctx.lineTo(-40, 420); // Southern Tip (Kanyakumari)
      // Western Coastline (Arabian Sea up to Gujarat)
      ctx.lineTo(-110, 280);
      ctx.lineTo(-210, 120);
      ctx.lineTo(-240, 80);
      ctx.lineTo(-260, -40);
      ctx.lineTo(-340, -60); // Rann of Kutch
      ctx.lineTo(-280, -140);
      // Rajasthan / Punjab / NW Border back to Kashmir
      ctx.lineTo(-180, -180);
      ctx.lineTo(-140, -270);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // =========================================================================
      // LAYER A: NATIONAL INFRASTRUCTURE INTERCONNECTS (Golden Quadrilateral Grid)
      // =========================================================================
      if (layers.INFRA) {
        NATIONAL_GRID_EDGES.forEach(edge => {
          const fromNode = INDIA_SPATIAL_NODES.find(n => n.id === edge.from);
          const toNode = INDIA_SPATIAL_NODES.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return;

          if (edge.broken) {
            // Smooth Health Breathing Pulse on degraded links
            const alpha = 0.35 + 0.55 * ((Math.sin(sec * 2.2) + 1) / 2);
            ctx.strokeStyle = `rgba(255, 0, 85, ${alpha.toFixed(2)})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 6]);
          } else {
            ctx.strokeStyle = 'rgba(0, 255, 204, 0.25)';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([]);
          }

          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // =========================================================================
      // LAYER C: INTERSTATE FREIGHT & TRANSIT CORRIDORS (Kinetic Comet Particles)
      // =========================================================================
      if (layers.VECTORS && camera.zoom >= 0.45) {
        NATIONAL_FREIGHT_CORRIDORS.forEach(corr => {
          const pts = corr.points;
          if (pts.length < 2) return;

          ctx.lineWidth = 2.5;
          ctx.strokeStyle = `${corr.color}35`;
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
          }
          ctx.stroke();

          // Particle Stream
          const totalLen = pts.length * 150;
          const count = 7;
          const speed = (corr.velocity / 100) * 70 * speedMultiplier;

          for (let p = 0; p < count; p++) {
            const progress = ((sec * speed + (p * (totalLen / count))) % totalLen) / totalLen;
            const totalSegs = pts.length - 1;
            const segIdx = Math.min(Math.floor(progress * totalSegs), totalSegs - 1);
            const segProgress = (progress * totalSegs) - segIdx;

            const p1 = pts[segIdx];
            const p2 = pts[segIdx + 1];
            if (!p1 || !p2) continue;

            const px = p1.x + (p2.x - p1.x) * segProgress;
            const py = p1.y + (p2.y - p1.y) * segProgress;

            ctx.fillStyle = '#FFFFFF';
            ctx.shadowBlur = 10;
            ctx.shadowColor = corr.color;
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = corr.color;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      }

      // =========================================================================
      // LAYER D: CRITICAL REGIONAL HOTSPOTS (Bay of Bengal Storms / Grid surgers)
      // =========================================================================
      if (layers.HOTSPOTS) {
        NATIONAL_INCIDENT_HOTSPOTS.forEach(inc => {
          const grad = ctx.createRadialGradient(inc.x, inc.y, 2, inc.x, inc.y, inc.radius);
          grad.addColorStop(0, `${inc.color}45`);
          grad.addColorStop(0.6, `${inc.color}15`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(inc.x, inc.y, inc.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `${inc.color}BB`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(inc.x, inc.y, inc.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          const pulse = (Math.sin(sec * 3) + 1) / 2;
          ctx.fillStyle = inc.color;
          ctx.beginPath();
          ctx.arc(inc.x, inc.y, 4 + pulse * 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // =========================================================================
      // LAYER B: METRO SENSOR NODES (India Smart Cities)
      // =========================================================================
      if (layers.SENSORS) {
        INDIA_SPATIAL_NODES.forEach(node => {
          if (searchQuery && !node.name.toLowerCase().includes(searchQuery.toLowerCase()) && !node.city.toLowerCase().includes(searchQuery.toLowerCase()) && !node.id.toLowerCase().includes(searchQuery.toLowerCase())) {
            return;
          }

          const isCritical = node.status === 'CRITICAL';
          const isWarning = node.status === 'WARNING';
          const nodeColor = isCritical ? '#ff0055' : isWarning ? '#ffaa00' : '#00ffcc';

          ctx.save();
          ctx.translate(node.x, node.y);

          // Outer Ring
          ctx.strokeStyle = `${nodeColor}66`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.stroke();

          // Vector Shape
          ctx.fillStyle = '#06080d';
          ctx.strokeStyle = nodeColor;
          ctx.lineWidth = 1.8;
          ctx.shadowBlur = 10;
          ctx.shadowColor = nodeColor;

          if (node.type === 'hex') {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const hx = 10 * Math.cos(angle);
              const hy = 10 * Math.sin(angle);
              if (i === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(0, -11);
            ctx.lineTo(9, 0);
            ctx.lineTo(0, 11);
            ctx.lineTo(-9, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }

          // Center Core Dot
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // City Label & Telemetry Value
          if (camera.zoom >= 0.6) {
            ctx.font = '800 10px "Archivo Narrow", sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.fillText(node.city, 0, 24);

            ctx.font = '700 8px "IBM Plex Mono", monospace';
            ctx.fillStyle = nodeColor;
            ctx.fillText(node.value, 0, 34);
          }

          ctx.restore();
        });
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [camera, targetCamera, layers, speedMultiplier, searchQuery]);

  // Click Canvas Handler
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;
    const cx = width / 2 + camera.x * camera.zoom;
    const cy = height / 2 + camera.y * camera.zoom;

    const worldX = (clickX - cx) / camera.zoom;
    const worldY = (clickY - cy) / camera.zoom;

    const hitNode = INDIA_SPATIAL_NODES.find(n => {
      const dx = n.x - worldX;
      const dy = n.y - worldY;
      return Math.sqrt(dx * dx + dy * dy) <= 22;
    });

    if (hitNode) {
      setSelectedNode(hitNode);
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: fullScreen ? 'calc(100vh - 190px)' : '650px',
        backgroundColor: '#06080d',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.85)',
        overflow: 'hidden',
        color: '#FFFFFF',
        fontFamily: 'var(--font-body)',
        userSelect: 'none'
      }}
    >
      {/* 
        60FPS Hardware Accelerated India Spatial Map Canvas
        Touchpad/Wheel Zoom disabled: Zooming is strictly controlled via explicit UI buttons (+ / -).
      */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: isDragging ? 'grabbing' : 'crosshair'
        }}
      />

      {/* TOP HEADER BAR: INDIA REGIONAL SECTOR TRANSITIONS */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        right: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 18px',
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={18} color="var(--neon-cyan)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 800, letterSpacing: '0.08em', color: '#FFF' }}>
              INDIA SPATIAL INTELLIGENCE GRID
            </span>
          </div>

          {/* Regional Camera Transition Selector Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {INDIA_REGION_PRESETS.map((preset) => {
              const isActive = activeRegion === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyRegionPreset(preset)}
                  style={{
                    padding: '5px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    backgroundColor: isActive ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#FFFFFF' : 'var(--neon-cyan)',
                    border: `1px solid ${isActive ? 'var(--accent-orange)' : 'rgba(0, 255, 204, 0.3)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={14} color="var(--neon-cyan)" />
            <span style={{ color: 'var(--text-inverse-muted)' }}>ENGINE:</span>
            <span style={{ color: '#00ffcc', fontWeight: 700 }}>{fps} FPS (WEBGL/CANVAS)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text-inverse-muted)' }}>ZOOM:</span>
            <span style={{ color: '#FFF', fontWeight: 700 }}>{(camera.zoom * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* LEFT TOOLBAR: BUTTON-ONLY ZOOM CONTROLS */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 20
      }}>
        <button
          onClick={handleZoomIn}
          title="Zoom In (+)"
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--glass-border)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out (-)"
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--glass-border)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Minus size={18} />
        </button>
        <button
          onClick={handleResetCamera}
          title="Reset Camera (Pan India)"
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--glass-border)',
            color: 'var(--neon-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Navigation size={18} />
        </button>
      </div>

      {/* RIGHT HUD PANEL: INDIA NATIONAL TELEMETRY */}
      <div style={{
        position: 'absolute',
        top: '80px',
        right: '16px',
        width: '280px',
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        padding: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        zIndex: 20
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--neon-cyan)',
          marginBottom: '14px',
          borderBottom: '1px solid rgba(0, 255, 204, 0.2)',
          paddingBottom: '8px'
        }}>
          <span>NATIONAL TELEMETRY</span>
          <Globe size={14} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'METRO SMART NODES', val: '10 CITIES', col: 'var(--neon-cyan)' },
            { label: 'FREIGHT VELOCITY', val: '92.4 KM/H', col: 'var(--neon-cyan)' },
            { label: 'REGIONAL ALERTS', val: `${metrics.activeEvents} ACTIVE`, col: 'var(--neon-magenta)' },
            { label: 'NATIONAL POWER GRID', val: '99.4% OPTIMAL', col: '#00ffcc' },
            { label: 'SUBSEA FIBER TRAFFIC', val: '84.2 TBPS', col: '#FFF' },
          ].map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px'
            }}>
              <span style={{ color: 'var(--text-inverse-muted)' }}>{item.label}</span>
              <span style={{ fontWeight: 700, color: item.col }}>{item.val}</span>
            </div>
          ))}
        </div>

        {/* City Search Filter */}
        <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', padding: '6px 10px' }}>
            <Search size={14} color="var(--neon-cyan)" />
            <input
              type="text"
              placeholder="SEARCH CITY / METRO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px'
              }}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM LAYER TOGGLE BAR */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        right: '16px',
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-inverse-muted)', fontWeight: 700 }}>
          <Sliders size={14} color="var(--neon-cyan)" />
          <span>NATIONAL SPATIAL LAYERS:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { key: 'INFRA', label: 'POWER & FIBER GRID', color: 'var(--neon-cyan)' },
            { key: 'SENSORS', label: 'METRO SENSORS', color: 'var(--neon-cyan)' },
            { key: 'VECTORS', label: 'FREIGHT CORRIDORS', color: 'var(--neon-amber)' },
            { key: 'HOTSPOTS', label: 'WEATHER & GRID HOTSPOTS', color: 'var(--neon-magenta)' },
          ].map((l) => {
            const active = layers[l.key];
            return (
              <button
                key={l.key}
                onClick={() => toggleLayer(l.key)}
                style={{
                  padding: '5px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  backgroundColor: active ? l.color : 'rgba(255,255,255,0.05)',
                  color: active ? '#000' : 'var(--text-inverse-muted)',
                  border: `1px solid ${active ? l.color : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
