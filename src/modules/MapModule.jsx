import React from 'react';
import PageHeader from '../components/common/PageHeader';
import TelemetryStrip from '../components/common/TelemetryStrip';
import LiveCityMap from '../components/visualizers/LiveCityMap';
import DetailDrawer from '../components/common/DetailDrawer';

export default function MapModule() {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        code="GEO / INDIA SPATIAL GRID" 
        title="INDIA LIVE SPATIAL INTELLIGENCE MAP" 
        subtitle="Real-time telemetry across Indian metros (NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, GIFT City), Golden Quadrilateral grid interconnects, and interstate freight corridors."
      />

      <TelemetryStrip />

      <LiveCityMap fullScreen={true} />

      <DetailDrawer />
    </div>
  );
}
