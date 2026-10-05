import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, Send, CheckCircle2, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveOrderToDatabase } from '../lib/supabase';

export default function CartModal({ cart, setCart, bcvRate, onContinueShopping }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pago Móvil');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const totalUsd = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalVes = totalUsd * bcvRate;

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.cantidad + delta;
            return newQty > 0 ? { ...item, cantidad: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const generateTicketCode = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `DPB-${yyyy}-${mm}${dd}-${randomHex}`;
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Por favor ingresa tu Nombre y Teléfono para procesar el pedido.');
      return;
    }

    setIsSubmitting(true);
    const ticketCode = generateTicketCode();

    const orderData = {
      ticketCode,
      customerName,
      customerPhone,
      customerAddress: customerAddress || 'Retiro / Por coordinar',
      paymentMethod,
      totalUsd,
      totalVes,
      bcvRate,
      items: cart
    };

    // Save to database
    await saveOrderToDatabase(orderData);

    // Launch confetti animation
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    setCompletedOrder(orderData);

    // Build WhatsApp message
    let message = `*¡NUEVO PEDIDO - DULCE PASIÓN BOUTIQUE!* 🛍️✨\n`;
    message += `*Ticket:* ${ticketCode}\n`;
    message += `*Cliente:* ${customerName}\n`;
    message += `*Teléfono:* ${customerPhone}\n`;
    if (customerAddress) message += `*Dirección:* ${customerAddress}\n`;
    message += `*Método de Pago:* ${paymentMethod}\n`;
    message += `----------------------------------------\n`;
    message += `*RESUMEN DE PRODUCTOS:*\n`;

    cart.forEach((item, index) => {
      const subUsd = (item.precio * item.cantidad).toFixed(2);
      message += `${index + 1}. ${item.nombre} x${item.cantidad} = $${subUsd}\n`;
    });

    message += `----------------------------------------\n`;
    message += `*TOTAL A PAGAR:*\n`;
    message += `💵 USD: *$${totalUsd.toFixed(2)}*\n`;
    message += `🇻🇪 VES (Tasa BCV ${bcvRate.toFixed(2)}): *Bs. ${totalVes.toFixed(2)}*\n\n`;
    message += `Quedo atento(a) para recibir los datos de pago y coordinar el despacho.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/584162939717?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setCart([]);
      setIsSubmitting(false);
    }, 600);
  };

  if (completedOrder) {
    return (
      <div className="container" style={{ padding: '3rem 0' }}>
        <div className="glass-panel" style={{ maxWidth: '650px', margin: '0 auto', padding: '2.5rem', textAlign: 'center' }}>
          <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }} className="gradient-text">
            ¡Pedido Generado Exitosamente!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Se ha abierto WhatsApp para enviar el resumen del pedido a nuestro equipo.
          </p>

          <div style={{
            background: 'rgba(255, 241, 242, 0.8)',
            border: '2px dashed var(--primary-pink)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            margin: '1.5rem 0',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700' }}>TICKET DE ATENCIÓN:</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', letterSpacing: '0.05em' }}>
              {completedOrder.ticketCode}
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
              <strong>Total USD:</strong> ${completedOrder.totalUsd.toFixed(2)}
              <br />
              <strong>Total VES (BCV):</strong> Bs. {completedOrder.totalVes.toFixed(2)}
              <br />
              <strong>Método de pago:</strong> {completedOrder.paymentMethod}
            </div>
          </div>

          <button
            onClick={() => {
              setCompletedOrder(null);
              onContinueShopping();
            }}
            className="btn-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }}>
          <ShoppingBag size={56} color="var(--primary-pink)" style={{ opacity: 0.6, marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Tu Carrito está Vacío</h2>
          <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem 0' }}>
            Explora nuestras pacas de ropa femenina o nuestra variedad de golosinas mayoristas.
          </p>
          <button
            onClick={onContinueShopping}
            className="btn-primary"
          >
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <section style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem' }} className="gradient-text">
          Tu Carrito de Pedido
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {/* ITEMS LIST */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
              Productos Seleccionados ({cart.reduce((a, c) => a + c.cantidad, 0)})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.85rem',
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(236,72,153,0.15)'
                  }}
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                  />

                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: 1.3 }}>
                      {item.nombre}
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: '700', marginTop: '0.2rem' }}>
                      ${item.precio.toFixed(2)} USD
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{
                        background: '#F1F5F9',
                        border: 'none',
                        borderRadius: '6px',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: '800', fontSize: '0.95rem', minWidth: '20px', textAlign: 'center' }}>
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{
                        background: '#F1F5F9',
                        border: 'none',
                        borderRadius: '6px',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem' }}
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CHECKOUT FORM & SUMMARY */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
                Datos de Confirmación
              </h3>

              <form onSubmit={handleConfirmOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: María Pérez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(236,72,153,0.3)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                    Teléfono WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 04141234567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(236,72,153,0.3)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                    Dirección de Envío / Ciudad
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Valencia, Carabobo (o retiro)"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(236,72,153,0.3)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                    Método de Pago Preferido
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(236,72,153,0.3)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="Pago Móvil">Pago Móvil (Bolívares Tasa BCV)</option>
                    <option value="Cashea">Cashea (Cuotas)</option>
                    <option value="Zelle / Efectivo USD">Zelle / Efectivo USD</option>
                  </select>
                </div>

                {/* TOTALS SUMMARY */}
                <div style={{
                  background: 'linear-gradient(135deg, #FFF1F2 0%, #FCE7F3 100%)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                    <span>Subtotal USD:</span>
                    <strong>${totalUsd.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>Tasa BCV oficial:</span>
                    <span>Bs. {bcvRate.toFixed(2)}</span>
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(236,72,153,0.2)', margin: '0.5rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>Total USD:</span>
                    <span style={{ fontWeight: '800', fontSize: '1.6rem', color: 'var(--primary-dark)' }}>
                      ${totalUsd.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.2rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--deep-magenta)' }}>Total Bolívares:</span>
                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--deep-magenta)' }}>
                      Bs. {totalVes.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-whatsapp glow-animation"
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    fontSize: '1.05rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <Send size={20} />
                  <span>{isSubmitting ? 'Procesando...' : 'Confirmar Pedido por WhatsApp'}</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
