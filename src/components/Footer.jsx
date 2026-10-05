import React from 'react';
import { Phone, Heart, ShieldCheck, Sparkles, Home, Candy, Shirt } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      background: 'rgba(255, 255, 255, 0.9)',
      borderTop: '1px solid rgba(236, 72, 153, 0.2)',
      padding: '3rem 0 1.5rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          
          {/* Col 1 */}
          <div>
            <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo-footer.png"
                alt="Dulce Pasión Boutique"
                style={{
                  height: '70px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
            <h3 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem' }}>
              Dulce Pasión Boutique
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Venta mayorista de pacas de ropa femenina de alta calidad y más de 100 golosinas importadas y nacionales.
            </p>
            <div className="cashea-badge">
              ¡Paga en cuotas con Cashea! 🟡🟣
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.85rem' }}>
              Navegación Rápida
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li>
                <button onClick={() => onNavigate('inicio')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pacas')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Pacas de Ropa Femenina
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('golosinas')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Catálogo de Golosinas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.85rem' }}>
              Contacto Directo
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              Atención personalizada vía WhatsApp para pedidos mayoristas.
            </p>
            <a
              href="https://wa.me/584162939717?text=Hola!%20Deseo%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}
            >
              <Phone size={16} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.85rem' }}>
              Métodos de Pago
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ background: '#F1F5F9', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                Pago Móvil
              </span>
              <span style={{ background: '#FEF08A', color: '#854D0E', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                Cashea
              </span>
              <span style={{ background: '#F1F5F9', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                Zelle
              </span>
              <span style={{ background: '#F1F5F9', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                Efectivo USD
              </span>
            </div>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid rgba(236,72,153,0.15)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          © {new Date().getFullYear()} Distribuidora Dulce Pasión Boutique. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
