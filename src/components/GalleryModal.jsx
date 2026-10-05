import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function GalleryModal({ paca, onClose }) {
  if (!paca) return null;

  const photos = paca.fotosGaleria || [paca.imagenPrincipal];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '850px',
        maxHeight: '92vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FCE7F3 100%)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-fuchsia)' }}>
              GALERÍA DE FOTOGRAFÍAS DE PRENDAS DE MUESTRA
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
              {paca.titulo} ({paca.piezas} Piezas)
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <X size={20} color="var(--text-main)" />
          </button>
        </div>

        {/* Main Photo Display Area */}
        <div style={{
          position: 'relative',
          background: '#0F172A',
          height: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={photos[currentIndex]}
            alt={`Prenda ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                style={{
                  position: 'absolute',
                  left: '12px',
                  background: 'rgba(255,255,255,0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={24} color="#0F172A" />
              </button>

              <button
                onClick={nextPhoto}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'rgba(255,255,255,0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={24} color="#0F172A" />
              </button>
            </>
          )}

          {/* Counter Badge */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '16px',
            background: 'rgba(0,0,0,0.65)',
            color: '#fff',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: '600',
            backdropFilter: 'blur(4px)'
          }}>
            Foto {currentIndex + 1} de {photos.length}
          </div>
        </div>

        {/* Thumbnails strip */}
        <div style={{
          padding: '1rem 1.5rem',
          overflowX: 'auto',
          display: 'flex',
          gap: '0.75rem',
          background: '#F8FAFC'
        }}>
          {photos.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Miniatura ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '65px',
                height: '65px',
                objectFit: 'cover',
                borderRadius: '8px',
                cursor: 'pointer',
                border: currentIndex === idx ? '3px solid var(--primary-fuchsia)' : '2px solid transparent',
                opacity: currentIndex === idx ? 1 : 0.6,
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>

        {/* Footer info */}
        <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            * Fotografías de referencia real de prendas que puede contener la paca.
          </span>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
          >
            Cerrar Galería
          </button>
        </div>

      </div>
    </div>
  );
}
