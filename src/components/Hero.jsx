import React from 'react';
import { Shirt, Candy, Phone, Sparkles, CheckCircle, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function Hero({ onNavigate }) {
  return (
    <section style={{ padding: '3rem 0 2rem 0' }}>
      <div className="container">
        {/* Main Hero Card */}
        <div className="glass-panel" style={{
          padding: '3rem 2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(252,231,243,0.85) 100%)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(219,39,119,0.18)'
        }}>
          {/* Decorative glowing blobs */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}></div>

          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Cashea Highlight pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FEF08A',
              color: '#854D0E',
              padding: '0.4rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 12px rgba(234,179,8,0.25)'
            }}>
              <Sparkles size={16} color="#CA8A04" />
              <span>¡Compra ahora y paga en cuotas con <strong>Cashea</strong>! 🟡🟣</span>
            </div>

            <h1 style={{
              fontSize: '2.75rem',
              fontWeight: '800',
              lineHeight: 1.15,
              marginBottom: '1rem'
            }} className="gradient-text">
              Dulce Pasión Boutique
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: 'var(--text-main)',
              fontWeight: '500',
              marginBottom: '1.75rem',
              lineHeight: 1.5
            }}>
              Pacas de ropa femenina de alta calidad y dulcería al por mayor.
              <br className="desktop-nav" />
              Surte tu negocio con los mejores precios del mercado.
            </p>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <a
                href="https://wa.me/584162939717?text=Hola!%20Deseo%20hacer%20un%20pedido%20o%20consultar%20cat%C3%A1logo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp glow-animation"
                style={{ fontSize: '1.05rem', padding: '0.85rem 1.75rem' }}
              >
                <Phone size={20} />
                <span>Pedir por WhatsApp</span>
              </a>

              <button
                onClick={() => onNavigate('pacas')}
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '0.85rem 1.5rem' }}
              >
                <Shirt size={20} />
                <span>Ver Pacas de Ropa</span>
              </button>

              <button
                onClick={() => onNavigate('golosinas')}
                className="btn-outline"
                style={{ fontSize: '1rem', padding: '0.85rem 1.5rem' }}
              >
                <Candy size={20} />
                <span>Catálogo Golosinas</span>
              </button>
            </div>

            {/* Features bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(236,72,153,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <CreditCard size={20} color="var(--primary-fuchsia)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Pago Móvil / Cashea</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <Truck size={20} color="var(--primary-fuchsia)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Envíos a Nivel Nacional</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <ShieldCheck size={20} color="var(--primary-fuchsia)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Venta Mayorista Directa</span>
              </div>
            </div>

          </div>
        </div>

        {/* Featured Banners Split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {/* Banner 1: Pacas de Ropa */}
          <div 
            onClick={() => onNavigate('pacas')}
            className="glass-card" 
            style={{
              padding: '2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(253,242,248,0.95) 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <span style={{
                background: 'rgba(219,39,119,0.12)',
                color: 'var(--primary-fuchsia)',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Colección Exclusiva
              </span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '0.75rem', color: 'var(--deep-magenta)' }}>
                Pacas de Ropa Femenina
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
                Pacas de 25 y 50 piezas con vestidos, blusas, pantalones y calzado dama.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--primary-fuchsia)', fontWeight: '700' }}>
              <span>Explorar prendas y galerías</span> &rarr;
            </div>
          </div>

          {/* Banner 2: Golosinas */}
          <div 
            onClick={() => onNavigate('golosinas')}
            className="glass-card" 
            style={{
              padding: '2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(245,243,255,0.95) 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <span style={{
                background: 'rgba(139,92,246,0.12)',
                color: 'var(--accent-purple)',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Mayorista de Dulces
              </span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '0.75rem', color: '#5B21B6' }}>
                Catálogo de Golosinas
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
                Más de 100 productos en chocolates, galletas, chicles y caramelos importados y nacionales.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--accent-purple)', fontWeight: '700' }}>
              <span>Ver más de 100 golosinas</span> &rarr;
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
