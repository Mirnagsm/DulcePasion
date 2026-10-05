import React, { useState } from 'react';
import { ShoppingBag, Eye, Shirt, Check } from 'lucide-react';

export default function PacaCard({ paca, bcvRate, onAddToCart, onOpenGallery }) {
  const [added, setAdded] = useState(false);
  const priceVes = (paca.precio * bcvRate).toFixed(2);
  const photoCount = (paca.fotosGaleria || []).length;

  const handleAdd = () => {
    onAddToCart({
      id: paca.id,
      nombre: paca.titulo,
      precio: paca.precio,
      imagen: paca.imagenPrincipal,
      tipo: 'Paca',
      piezas: paca.piezas
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Paca Image */}
      <div style={{
        height: '240px',
        width: '100%',
        position: 'relative',
        background: '#FFF5F8',
        overflow: 'hidden'
      }}>
        <img
          src={paca.imagenPrincipal}
          alt={paca.titulo}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Piece Count Tag */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'linear-gradient(135deg, #EC4899, #BE185D)',
          color: '#ffffff',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: '800',
          boxShadow: '0 4px 10px rgba(219,39,119,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <Shirt size={14} />
          <span>{paca.piezas} PIEZAS</span>
        </div>

        {/* Gallery Trigger Pill */}
        <button
          onClick={() => onOpenGallery(paca)}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '0.4rem 0.85rem',
            fontSize: '0.8rem',
            fontWeight: '700',
            color: 'var(--primary-dark)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <Eye size={15} />
          <span>Ver Galería ({photoCount} fotos)</span>
        </button>
      </div>

      {/* Content */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        gap: '1.25rem'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary-fuchsia)', fontWeight: '800', textTransform: 'uppercase' }}>
            {paca.tipo}
          </span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.2rem' }}>
            {paca.titulo}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.5rem', lineHeight: 1.45 }}>
            {paca.descripcion}
          </p>
        </div>

        <div>
          {/* Price */}
          <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(255,241,242,0.6)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
                ${paca.precio.toFixed(2)}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>USD</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              ≈ Bs. {priceVes} <span style={{ fontSize: '0.7rem' }}>(Tasa BCV)</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => onOpenGallery(paca)}
              className="btn-outline"
              style={{ flex: '1', padding: '0.65rem 0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}
            >
              <Eye size={16} />
              <span>Fotos</span>
            </button>

            <button
              onClick={handleAdd}
              style={{
                flex: '2',
                background: added ? '#10B981' : 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 14px rgba(219,39,119,0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>¡Agregado!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Añadir Paca</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
