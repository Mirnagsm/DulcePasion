import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Saves an order to Supabase if configured, or stores in localStorage as fallback
 */
export async function saveOrderToDatabase(orderData) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .insert([
          {
            ticket_code: orderData.ticketCode,
            cliente_nombre: orderData.customerName,
            cliente_telefono: orderData.customerPhone,
            cliente_direccion: orderData.customerAddress,
            metodo_pago: orderData.paymentMethod,
            total_usd: orderData.totalUsd,
            total_ves: orderData.totalVes,
            tasa_bcv: orderData.bcvRate,
            detalles: orderData.items,
            estado: 'Pendiente'
          }
        ])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase save error, fallback to local storage:', err);
    }
  }

  // Fallback Local Storage saving
  const existingOrders = JSON.parse(localStorage.getItem('dpb_orders') || '[]');
  const newOrder = {
    id: Date.now(),
    ticket_code: orderData.ticketCode,
    cliente_nombre: orderData.customerName,
    cliente_telefono: orderData.customerPhone,
    cliente_direccion: orderData.customerAddress,
    metodo_pago: orderData.paymentMethod,
    total_usd: orderData.totalUsd,
    total_ves: orderData.totalVes,
    tasa_bcv: orderData.bcvRate,
    detalles: orderData.items,
    created_at: new Date().toISOString(),
    estado: 'Pendiente'
  };
  
  existingOrders.unshift(newOrder);
  localStorage.setItem('dpb_orders', JSON.stringify(existingOrders));
  return { success: true, data: [newOrder], fallback: true };
}
