import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';

export default function ProductCard({ product, bcvRate, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const priceVes = (product.precio * bcvRate).toFixed(2);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Product Image */}
      <div style={{
        height: '180px',
        width: '100%',
        position: 'relative',
        background: '#FFF5F8',
        overflow: 'hidden'
      }}>
        <img
          src={product.imagen}
          alt={product.nombre}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {product.peso && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(30, 41, 59, 0.85)',
            color: '#fff',
            padding: '0.15rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: '600'
          }}>
            {product.peso}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        gap: '1rem'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: '700' }}>
            {product.categoria}
          </span>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: 'var(--text-main)',
            marginTop: '0.2rem',
            lineHeight: 1.35
          }}>
            {product.nombre}
          </h3>
          {product.descripcion && (
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginTop: '0.35rem',
              lineHeight: 1.35
            }}>
              {product.descripcion}
            </p>
          )}
        </div>

        <div>
          {/* Price container */}
          <div style={{ marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
                ${product.precio.toFixed(2)}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>USD</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              ≈ Bs. {priceVes}
            </div>
          </div>

          {/* Add to cart btn */}
          <button
            onClick={handleAdd}
            style={{
              width: '100%',
              background: added ? '#10B981' : 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: added ? '0 4px 12px rgba(16,185,129,0.3)' : '0 4px 12px rgba(219,39,119,0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            {added ? (
              <>
                <Check size={16} />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Añadir al Carrito</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
