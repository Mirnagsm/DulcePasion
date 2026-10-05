import React, { useState } from 'react';
import { ShoppingBag, Candy, Shirt, Home, Phone, Menu, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, cartCount, bcvRate, logoUrl = '/logo.png' }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'golosinas', label: 'Golosinas', icon: Candy },
    { id: 'pacas', label: 'Pacas de Ropa', icon: Shirt },
  ];

  const handleNav = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLogo = logoUrl || '/logo.png';

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 0' }}>
          
          {/* LOGO SPACE */}
          <div 
            onClick={() => handleNav('inicio')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <img 
              src={currentLogo} 
              alt="Dulce Pasión Boutique" 
              style={{ 
                height: '46px', 
                width: 'auto',
                maxWidth: '120px',
                objectFit: 'contain' 
              }} 
            />
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, lineHeight: 1.1 }} className="gradient-text">
                Dulce Pasión
              </h1>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                Boutique & Dulcería
              </div>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  style={{
                    background: isActive ? 'rgba(236, 72, 153, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(236, 72, 153, 0.3)' : '1px solid transparent',
                    color: isActive ? 'var(--primary-fuchsia)' : 'var(--text-main)',
                    fontWeight: isActive ? '700' : '500',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ACTION BUTTONS & BCV RATE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* BCV Ticker */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(236, 72, 153, 0.25)',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--deep-magenta)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }} title="Tasa BCV oficial obtenida en tiempo real">
              <Sparkles size={13} color="#DB2777" />
              <span>BCV: <strong>Bs. {bcvRate.toFixed(2)}</strong></span>
            </div>

            {/* CART BUTTON */}
            <button
              onClick={() => handleNav('carrito')}
              style={{
                position: 'relative',
                background: activeTab === 'carrito' ? 'linear-gradient(135deg, #DB2777, #BE185D)' : 'rgba(236,72,153,0.1)',
                color: activeTab === 'carrito' ? '#fff' : 'var(--primary-fuchsia)',
                border: '1px solid rgba(236,72,153,0.3)',
                padding: '0.55rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: '700',
                transition: 'all 0.2s ease'
              }}
            >
              <ShoppingBag size={20} />
              <span className="cart-text">Carrito</span>
              {cartCount > 0 && (
                <span style={{
                  background: '#DB2777',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  boxShadow: '0 2px 6px rgba(219,39,119,0.5)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* WHATSAPP QUICK BTN */}
            <a
              href="https://wa.me/584162939717?text=Hola!%20Deseo%20informaci%C3%B3n%20sobre%20sus%20pacas%20de%20ropa%20y%20golosinas."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp desktop-nav"
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            >
              <Phone size={16} />
              <span>WhatsApp</span>
            </a>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary-fuchsia)',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileOpen && (
          <div style={{
            padding: '1rem 0',
            borderTop: '1px solid rgba(236,72,153,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  style={{
                    background: activeTab === item.id ? 'rgba(236, 72, 153, 0.15)' : 'transparent',
                    border: 'none',
                    color: 'var(--text-main)',
                    fontWeight: activeTab === item.id ? '700' : '500',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '1rem',
                    textAlign: 'left'
                  }}
                >
                  <Icon size={20} color="var(--primary-fuchsia)" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <a
              href="https://wa.me/584162939717?text=Hola!%20Deseo%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <Phone size={18} />
              <span>Contacto WhatsApp +58 4162939717</span>
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .cart-text { display: none; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
