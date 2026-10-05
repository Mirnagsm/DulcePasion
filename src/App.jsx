import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import PacaCard from './components/PacaCard';
import GalleryModal from './components/GalleryModal';
import CartModal from './components/CartModal';
import AdminPanel from './components/AdminPanel';
import SupabaseGuideModal from './components/SupabaseGuideModal';
import Footer from './components/Footer';

import { INITIAL_GOLOSINAS, INITIAL_PACAS } from './data/initialData';
import { getBcvRate } from './lib/bcv';
import { Search, Filter, Candy, Shirt } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [bcvRate, setBcvRate] = useState(48.50);
  const [cart, setCart] = useState([]);
  
  const [golosinas, setGolosinas] = useState(INITIAL_GOLOSINAS);
  const [pacas, setPacas] = useState(INITIAL_PACAS);

  // Filters for Golosinas
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Gallery Modal
  const [selectedPacaGallery, setSelectedPacaGallery] = useState(null);

  // Setup Guide Modal
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  // Logo URL
  const [logoUrl, setLogoUrl] = useState('/logo.png');

  // Admin access control (hidden from public)
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');

  useEffect(() => {
    // Check if URL contains secret hash e.g. #admin
    if (window.location.hash === '#admin') {
      setActiveTab('admin');
    }
  }, []);

  useEffect(() => {
    // Fetch BCV Rate on load
    getBcvRate().then((rate) => {
      setBcvRate(rate);
    });
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  // Filtered Golosinas
  const filteredGolosinas = golosinas.filter((item) => {
    if (!item.activo) return false;
    const term = searchTerm.toLowerCase();
    const matchesSearch = (item.nombre && item.nombre.toLowerCase().includes(term)) ||
                          (item.categoria && item.categoria.toLowerCase().includes(term)) ||
                          (item.marca && item.marca.toLowerCase().includes(term));
    const matchesCategory = selectedCategory === 'Todas' || item.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Todas', ...Array.from(new Set(golosinas.map(g => g.categoria).filter(Boolean)))];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        bcvRate={bcvRate}
        logoUrl={logoUrl}
      />

      <main style={{ flexGrow: 1 }}>
        {/* TAB 1: INICIO */}
        {activeTab === 'inicio' && (
          <>
            <Hero onNavigate={setActiveTab} />
            
            {/* Featured Golosinas on Home */}
            <section style={{ padding: '2rem 0 4rem 0' }}>
              <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }} className="gradient-text">
                      Golosinas Destacadas al Mayor
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Productos de mayor rotación y mejor margen para tu negocio
                    </p>
                  </div>
                  <button onClick={() => setActiveTab('golosinas')} className="btn-outline">
                    Ver Catálogo Completo &rarr;
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {golosinas.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      bcvRate={bcvRate}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Pacas on Home */}
            <section style={{ padding: '2rem 0 4rem 0', background: 'rgba(255, 241, 242, 0.4)' }}>
              <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }} className="gradient-text">
                      Pacas de Ropa Femenina Disponible
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Pacas listas para despacho inmediato con ropa de calidad Grado A+
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2rem'
                }}>
                  {pacas.map((paca) => (
                    <PacaCard
                      key={paca.id}
                      paca={paca}
                      bcvRate={bcvRate}
                      onAddToCart={handleAddToCart}
                      onOpenGallery={(p) => setSelectedPacaGallery(p)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB 2: GOLOSINAS */}
        {activeTab === 'golosinas' && (
          <section style={{ padding: '2.5rem 0 4rem 0' }}>
            <div className="container">
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.4rem' }} className="gradient-text">
                  Catálogo Mayorista de Golosinas
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                  Explora nuestra variedad en chocolates, chupetas, galletas, chicles y más. Precios en USD con conversión automática a BCV.
                </p>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                  
                  {/* Search input */}
                  <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
                    <Search size={18} color="var(--primary-pink)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Buscar por nombre o marca (ej: Pirulin, Bon Bon Bum...)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 1rem 0.65rem 2.4rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(236,72,153,0.3)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        background: '#fff'
                      }}
                    />
                  </div>

                  {/* Category Pills */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          background: selectedCategory === cat ? 'linear-gradient(135deg, #EC4899, #DB2777)' : 'rgba(255,255,255,0.8)',
                          color: selectedCategory === cat ? '#fff' : 'var(--text-main)',
                          border: selectedCategory === cat ? 'none' : '1px solid rgba(236,72,153,0.2)',
                          padding: '0.4rem 0.9rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                </div>
              </div>

              {/* PRODUCTS GRID */}
              {filteredGolosinas.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                  <Candy size={48} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                  <h3>No se encontraron productos</h3>
                  <p style={{ fontSize: '0.9rem' }}>Intenta cambiar el término de búsqueda o la categoría elegida.</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {filteredGolosinas.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      bcvRate={bcvRate}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: PACAS DE ROPA */}
        {activeTab === 'pacas' && (
          <section style={{ padding: '2.5rem 0 4rem 0' }}>
            <div className="container">
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.4rem' }} className="gradient-text">
                  Pacas de Ropa Femenina & Calzado
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                  Selecciones exclusivas de 25 y 50 piezas. Haz clic en "Ver Galería" para explorar ejemplos de las prendas reales que incluye cada paca.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '2rem'
              }}>
                {pacas.map((paca) => (
                  <PacaCard
                    key={paca.id}
                    paca={paca}
                    bcvRate={bcvRate}
                    onAddToCart={handleAddToCart}
                    onOpenGallery={(p) => setSelectedPacaGallery(p)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: CARRITO */}
        {activeTab === 'carrito' && (
          <CartModal
            cart={cart}
            setCart={setCart}
            bcvRate={bcvRate}
            onContinueShopping={() => setActiveTab('golosinas')}
          />
        )}

        {/* TAB 5: PANEL ADMIN (PROTEGIDO) */}
        {activeTab === 'admin' && (
          !isAdminAuth ? (
            <div style={{ maxWidth: '420px', margin: '4rem auto', padding: '2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Acceso Administrativo</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Esta sección es privada para el personal de Dulce Pasión.</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (adminPasswordInput === 'admin123' || adminPasswordInput === 'dulce2026') {
                  setIsAdminAuth(true);
                } else {
                  alert('Contraseña incorrecta');
                }
              }}>
                <input
                  type="password"
                  placeholder="Introduce la contraseña"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem', marginBottom: '1rem' }}
                />
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}>
                  Ingresar al Panel
                </button>
              </form>
            </div>
          ) : (
            <AdminPanel
              golosinas={golosinas}
              setGolosinas={setGolosinas}
              pacas={pacas}
              setPacas={setPacas}
              onShowSetupGuide={() => setShowSetupGuide(true)}
            />
          )
        )}
      </main>

      {/* GALLERY MODAL */}
      {selectedPacaGallery && (
        <GalleryModal
          paca={selectedPacaGallery}
          onClose={() => setSelectedPacaGallery(null)}
        />
      )}

      {/* SUPABASE SETUP GUIDE MODAL */}
      {showSetupGuide && (
        <SupabaseGuideModal
          onClose={() => setShowSetupGuide(false)}
        />
      )}

      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
