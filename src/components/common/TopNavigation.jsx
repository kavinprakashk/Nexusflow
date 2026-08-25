import React, { useState, useRef } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { 
  Activity, 
  Map, 
  Radio, 
  Layers, 
  BarChart3, 
  ShieldAlert, 
  Bell, 
  FileText, 
  Database, 
  Settings, 
  Server, 
  Search, 
  Menu, 
  X,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'OVERVIEW', route: '/', icon: Activity },
  { label: 'MAP', route: '/map', icon: Map },
  { label: 'SIGNALS', route: '/signals', icon: Radio },
  { label: 'ASSETS', route: '/assets', icon: Layers },
  { label: 'ANALYTICS', route: '/analytics', icon: BarChart3 },
  { label: 'INCIDENTS', route: '/incidents', icon: ShieldAlert },
  { label: 'ALERTS', route: '/alerts', icon: Bell },
  { label: 'REPORTS', route: '/reports', icon: FileText },
  { label: 'SOURCES', route: '/sources', icon: Database },
  { label: 'STATUS', route: '/system', icon: Server },
  { label: 'SETTINGS', route: '/settings', icon: Settings },
];

export default function TopNavigation() {
  const { currentRoute, navigateTo, speedMultiplier, setSpeedMultiplier, setIsCommandPaletteOpen, incidents } = useTelemetry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef(null);

  const activeAlertsCount = incidents.filter(i => i.status === 'ACTIVE').length;

  const handleScrollLeft = () => {
    if (navContainerRef.current) {
      navContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (navContainerRef.current) {
      navContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky-top-bar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--dark-bg)',
      borderBottom: '2px solid var(--accent-orange)',
      color: 'var(--text-inverse)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        height: '74px'
      }}>
        {/* Left: Brand Logo & Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div 
            onClick={() => navigateTo('/')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              backgroundColor: 'var(--accent-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #FFF',
              boxShadow: '3px 3px 0px #FFF'
            }}>
              <Zap size={22} color="#FFF" />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                lineHeight: '1',
                color: '#FFF',
                letterSpacing: '0.1em'
              }}>
                NEXUS<span style={{ color: 'var(--accent-orange)' }}>FLOW</span>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-inverse-muted)',
                letterSpacing: '0.15em',
                marginTop: '3px'
              }}>
                URBAN TELEMETRY OS v4.2
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: 'var(--dark-surface)',
            border: '1px solid var(--border-dark)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--status-success)',
            letterSpacing: '0.05em'
          }}>
            <span className="status-pulse" />
            <span>SYS_OK</span>
          </div>
        </div>

        {/* Center: Horizontally Scrollable Navigation Bar with Arrow Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '100%',
          flex: 1,
          margin: '0 16px',
          minWidth: 0
        }} className="desktop-nav">
          {/* Scroll Left Arrow Button */}
          <button
            onClick={handleScrollLeft}
            aria-label="Scroll navigation left"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              color: 'var(--accent-orange)',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '1px 1px 0px #000',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-orange)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--dark-surface)';
              e.currentTarget.style.color = 'var(--accent-orange)';
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Horizontally Scrollable Nav Container */}
          <nav 
            ref={navContainerRef}
            className="horizontal-scroll-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              flex: 1,
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => navigateTo(item.route)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '100%',
                    padding: '0 18px',
                    backgroundColor: isActive ? 'var(--accent-orange)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-inverse-muted)',
                    border: 'none',
                    borderBottom: isActive ? '3px solid #FFFFFF' : '3px solid transparent',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-inverse-muted)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Scroll Right Arrow Button */}
          <button
            onClick={handleScrollRight}
            aria-label="Scroll navigation right"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              color: 'var(--accent-orange)',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '1px 1px 0px #000',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-orange)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--dark-surface)';
              e.currentTarget.style.color = 'var(--accent-orange)';
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Right Tools: Speed Control, Search, Notifications, Operator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Telemetry Speed Controller */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid var(--border-dark)',
            backgroundColor: 'var(--dark-surface)',
            padding: '3px 4px',
            gap: '4px'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-inverse-muted)',
              padding: '0 6px'
            }}>SPEED:</span>
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                style={{
                  padding: '2px 8px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  border: 'none',
                  backgroundColor: speedMultiplier === spd ? 'var(--accent-orange)' : 'transparent',
                  color: speedMultiplier === spd ? '#FFF' : 'var(--text-inverse-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {spd}X
              </button>
            ))}
          </div>

          {/* Quick Command Button ⌘K */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              color: 'var(--text-inverse-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            <Search size={14} color="var(--accent-orange)" />
            <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>SEARCH</span>
            <kbd style={{
              padding: '1px 5px',
              backgroundColor: 'var(--dark-bg)',
              border: '1px solid var(--border-dark)',
              fontSize: '10px',
              color: 'var(--accent-orange)'
            }}>⌘K</kbd>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => navigateTo('/alerts')}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              backgroundColor: 'var(--dark-surface)',
              border: '1px solid var(--border-dark)',
              color: '#FFF',
              cursor: 'pointer'
            }}
          >
            <Bell size={16} />
            {activeAlertsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--status-error)',
                color: '#FFF',
                fontSize: '9px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                padding: '1px 4px',
                border: '1px solid var(--dark-bg)'
              }}>
                {activeAlertsCount}
              </span>
            )}
          </button>

          {/* Operator Badge */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px',
            backgroundColor: 'var(--dark-surface)',
            border: '1px solid var(--border-dark)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-inverse)',
            '@media (min-width: 1280px)': { display: 'flex' }
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'var(--accent-orange)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '10px'
            }}>OP</div>
            <span>OPERATOR_09</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              backgroundColor: 'var(--accent-orange)',
              border: 'none',
              color: '#FFF',
              cursor: 'pointer',
              '@media (min-width: 1024px)': { display: 'none' }
            }}
            className="mobile-toggle-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--dark-bg)',
          borderTop: '1px solid var(--border-dark)',
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '8px'
        }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => {
                  navigateTo(item.route);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  backgroundColor: isActive ? 'var(--accent-orange)' : 'var(--dark-surface)',
                  color: isActive ? '#FFF' : 'var(--text-inverse-muted)',
                  border: '1px solid var(--border-dark)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Inline styles for media query toggles */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
