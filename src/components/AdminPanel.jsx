import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Plus, Database, ShoppingCart, Image as ImageIcon, Key, CheckCircle, RefreshCw, Copy, Upload, X } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export default function AdminPanel({ golosinas, setGolosinas, pacas, setPacas, onShowSetupGuide }) {
  const [activeTab, setActiveTab] = useState('productos');
  const [orders, setOrders] = useState([]);
  const [copiedSql, setCopiedSql] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // New product form state
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Chocolate');
  const [peso, setPeso] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenPreview, setImagenPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const fetchOrders = async () => {
    if (isSupabaseConfigured && supabase) {
      setLoadingOrders(true);
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          setOrders(data);
          setLoadingOrders(false);
          return;
        }
      } catch (err) {
        console.warn('Error al consultar pedidos en Supabase, usando local:', err);
      }
      setLoadingOrders(false);
    }
    const stored = JSON.parse(localStorage.getItem('dpb_orders') || '[]');
    setOrders(stored);
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const handleFileProcess = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagenPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!nombre || !precio) return;

    const newProd = {
      id: `g-${Date.now()}`,
      numero: golosinas.length + 1,
      nombre,
      categoria,
      peso: peso || 'N/A',
      precio: parseFloat(precio),
      activo: true,
      imagen: imagenPreview || 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80'
    };

    setGolosinas([newProd, ...golosinas]);
    setNombre('');
    setPeso('');
    setPrecio('');
    setImagenPreview('');
    alert('¡Producto agregado correctamente al catálogo!');
  };

  const toggleStatus = (id) => {
    setGolosinas(golosinas.map(p => p.id === id ? { ...p, activo: !p.activo } : p));
  };

  const sqlSchema = `-- COPIA Y PEGA ESTE SCRIPT EN EL EDITOR SQL DE SUPABASE --

CREATE TABLE IF NOT EXISTS pedidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_code TEXT UNIQUE NOT NULL,
  cliente_nombre TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  cliente_direccion TEXT,
  metodo_pago TEXT,
  total_usd DECIMAL(10,2) NOT NULL,
  total_ves DECIMAL(10,2) NOT NULL,
  tasa_bcv DECIMAL(10,2) NOT NULL,
  detalles JSONB NOT NULL,
  estado TEXT DEFAULT 'Pendiente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <section style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        {/* Header Admin */}
        <div className="glass-panel" style={{ padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
              color: '#fff',
              padding: '0.6rem',
              borderRadius: '12px'
            }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>
                Panel Administrativo
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Gestión de productos, catálogo y consulta de pedidos
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onShowSetupGuide}
              className="btn-outline"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <Key size={16} />
              <span>Guía Conexión Supabase</span>
            </button>
            <div style={{
              background: isSupabaseConfigured ? '#D1FAE5' : '#FEF3C7',
              color: isSupabaseConfigured ? '#065F46' : '#92400E',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <Database size={14} />
              <span>{isSupabaseConfigured ? 'Supabase Conectado' : 'Almacenamiento Local'}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setActiveTab('productos')}
            className={activeTab === 'productos' ? 'btn-primary' : 'btn-outline'}
            style={{ padding: '0.6rem 1.25rem' }}
          >
            <Plus size={18} />
            <span>Gestión de Productos</span>
          </button>
          <button
            onClick={() => setActiveTab('pedidos')}
            className={activeTab === 'pedidos' ? 'btn-primary' : 'btn-outline'}
            style={{ padding: '0.6rem 1.25rem' }}
          >
            <ShoppingCart size={18} />
            <span>Pedidos Recibidos ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('base_datos')}
            className={activeTab === 'base_datos' ? 'btn-primary' : 'btn-outline'}
            style={{ padding: '0.6rem 1.25rem' }}
          >
            <Database size={18} />
            <span>Script SQL Supabase</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTOS */}
        {activeTab === 'productos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Formulario Crear Producto */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.25rem', color: 'var(--primary-dark)' }}>
                Agregar Nueva Golosina / Producto
              </h3>
              
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Nombre del Producto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Chocolate Pirulin 300g"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Categoría</label>
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', background: '#fff' }}
                    >
                      <option value="Chocolate">Chocolate</option>
                      <option value="Marshmellow">Marshmellow</option>
                      <option value="Juguete + Dulce">Juguete + Dulce</option>
                      <option value="Biscocho">Biscocho</option>
                      <option value="Galleta">Galleta</option>
                      <option value="Chicle">Chicle</option>
                      <option value="Gomita">Gomita</option>
                      <option value="Waffer">Waffer</option>
                      <option value="Bocadillo">Bocadillo</option>
                      <option value="Caramelo acido">Caramelo acido</option>
                      <option value="Combo">Combo</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Peso / Presentación</label>
                    <input
                      type="text"
                      placeholder="Ej: 24 unidades / 200gr"
                      value={peso}
                      onChange={(e) => setPeso(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Precio USD ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ej: 12.50"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                {/* CAJA DE SUBIR IMAGEN ESTILO GOOGLE LENS (DRAG & DROP) */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                    Foto del Producto
                  </label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileProcess(e.target.files[0]);
                      }
                    }}
                  />

                  {!imagenPreview ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: isDragging ? '2px dashed #DB2777' : '2px dashed #CBD5E1',
                        borderRadius: '12px',
                        padding: '1.75rem 1rem',
                        textAlign: 'center',
                        background: isDragging ? 'rgba(251, 207, 232, 0.25)' : '#F8FAFC',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.6rem'
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: '#FCE7F3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary-dark)'
                      }}>
                        <Upload size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>
                          Arrastra una imagen aquí o <span style={{ color: 'var(--primary-pink)', textDecoration: 'underline' }}>sube un archivo</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          PNG, JPG o WEBP desde tu computadora o celular
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      position: 'relative',
                      border: '1px solid #CBD5E1',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      height: '160px',
                      background: '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img
                        src={imagenPreview}
                        alt="Vista previa"
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                      <button
                        type="button"
                        onClick={() => setImagenPreview('')}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'rgba(0,0,0,0.65)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Eliminar imagen"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}>
                  <Plus size={18} />
                  <span>Guardar Producto</span>
                </button>
              </form>
            </div>

            {/* Lista de Golosinas Existentes */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>
                Lista de Golosinas en Sistema ({golosinas.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '550px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {golosinas.map((prod) => (
                  <div
                    key={prod.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      background: 'rgba(255,255,255,0.85)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid #F1F5F9'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={prod.imagen} alt="" style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{prod.nombre}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {prod.categoria} • ${prod.precio.toFixed(2)} USD • {prod.peso}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleStatus(prod.id)}
                      style={{
                        background: prod.activo ? '#D1FAE5' : '#FEE2E2',
                        color: prod.activo ? '#047857' : '#B91C1C',
                        border: 'none',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {prod.activo ? 'Activo' : 'Inactivo'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PEDIDOS */}
        {activeTab === 'pedidos' && (
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                Historial de Pedidos Registrados
              </h3>
              <button onClick={fetchOrders} className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                <RefreshCw size={14} className={loadingOrders ? 'spin' : ''} />
                <span>Actualizar</span>
              </button>
            </div>
            
            {orders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>No hay pedidos registrados aún.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map((ord) => (
                  <div
                    key={ord.id || ord.ticket_code}
                    style={{
                      padding: '1.25rem',
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(236,72,153,0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '800', color: 'var(--primary-dark)', fontSize: '1.1rem' }}>
                        {ord.ticket_code}
                      </span>
                      <span style={{ fontSize: '0.8rem', background: '#FEF3C7', color: '#92400E', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: '700' }}>
                        {ord.estado}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                      <strong>Cliente:</strong> {ord.cliente_nombre} ({ord.cliente_telefono})
                      <br />
                      <strong>Pago:</strong> {ord.metodo_pago} | <strong>Total:</strong> ${Number(ord.total_usd).toFixed(2)} USD (Bs. {Number(ord.total_ves).toFixed(2)})
                    </div>

                    <div style={{ fontSize: '0.8rem', background: '#F8FAFC', padding: '0.5rem', borderRadius: '6px' }}>
                      <strong>Items:</strong> {Array.isArray(ord.detalles) ? ord.detalles.map(i => `${i.nombre} (x${i.cantidad})`).join(', ') : 'Detalles de pedido'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BASE DE DATOS SQL */}
        {activeTab === 'base_datos' && (
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                  Esquema de Tablas para Supabase
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Ejecuta estas sentencias en el SQL Editor de tu proyecto Supabase para crear la base de datos automáticamente.
                </p>
              </div>
              <button onClick={copySql} className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                <Copy size={16} />
                <span>{copiedSql ? '¡Copiado!' : 'Copiar Código SQL'}</span>
              </button>
            </div>

            <pre style={{
              background: '#0F172A',
              color: '#F8FAFC',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              overflowX: 'auto',
              fontFamily: 'monospace',
              lineHeight: 1.5
            }}>
              {sqlSchema}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
}
