import React from 'react';
import { X, CheckCircle, Database, Cloud, ExternalLink, ShieldCheck } from 'lucide-react';

export default function SupabaseGuideModal({ onClose }) {
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
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }} className="gradient-text">
          Guía de Configuración: Supabase y Cloudinary
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Instrucciones simples paso a paso para habilitar tu Base de Datos gratuita y la Subida de Imágenes.
        </p>

        {/* SECTION 1: SUPABASE */}
        <div style={{
          background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
          border: '1px solid #86EFAC',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Database size={24} color="#166534" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#166534' }}>
              1. Configuración de Supabase (Base de Datos Gratis)
            </h3>
          </div>

          <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.6, fontSize: '0.9rem', color: '#14532D' }}>
            <li>Ingresa a <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{ fontWeight: '700', color: '#166534' }}>supabase.com</a> y crea una cuenta gratuita.</li>
            <li>Haz clic en <strong>"New Project"</strong>, ponle el nombre <code>DulcePasionDB</code> y asigna una contraseña segura.</li>
            <li>En el panel lateral izquierdo, entra en <strong>SQL Editor</strong>.</li>
            <li>Haz clic en <strong>"New Query"</strong>, pega el código SQL que está en el <em>Panel Admin &gt; Script SQL Supabase</em> de esta página y presiona <strong>Run</strong>.</li>
            <li>Entra en <strong>Project Settings &gt; API</strong> y copia los valores:
              <ul style={{ marginTop: '0.3rem' }}>
                <li><code>Project URL</code></li>
                <li><code>anon public key</code></li>
              </ul>
            </li>
            <li>Pega estos valores en tu archivo de variables de entorno <code>.env</code>:
              <pre style={{ background: '#052E16', color: '#86EFAC', padding: '0.5rem 0.75rem', borderRadius: '6px', marginTop: '0.3rem' }}>
{`VITE_SUPABASE_URL=tu_project_url_aqui
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui`}
              </pre>
            </li>
          </ol>
        </div>

        {/* SECTION 2: CLOUDINARY */}
        <div style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          border: '1px solid #93C5FD',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Cloud size={24} color="#1E40AF" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E40AF' }}>
              2. Configuración de Cloudinary (Imágenes Rápidas u Optimizadas)
            </h3>
          </div>

          <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.6, fontSize: '0.9rem', color: '#1E3A8A' }}>
            <li>Regístrate gratis en <a href="https://cloudinary.com" target="_blank" rel="noreferrer" style={{ fontWeight: '700', color: '#1E40AF' }}>cloudinary.com</a>.</li>
            <li>En tu Dashboard, copia tu <strong>Cloud Name</strong> (Ej: <code>dulcepasion-cloud</code>).</li>
            <li>Crea una carpeta llamada <code>dulce_pasion_productos</code> en la sección <strong>Media Library</strong>.</li>
            <li>Sube las imágenes de tus pacas de ropa y golosinas a esta carpeta.</li>
            <li>Copia el enlace público optimizado de la imagen y pégalo directamente en el formulario del Panel Admin de tu catálogo.</li>
          </ol>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            Entendido, Cerrar Guía
          </button>
        </div>

      </div>
    </div>
  );
}
