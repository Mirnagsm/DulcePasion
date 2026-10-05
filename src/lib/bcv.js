/**
 * BCV Rate Fetcher with fallback mechanism
 */
export async function getBcvRate() {
  const DEFAULT_RATE = 48.50; // Fallback rate if offline or API is updating

  try {
    // Try primary Pabilo API
    const res = await fetch('https://pabilo-bcv-api.vercel.app/api/bcv', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rate) {
        return parseFloat(data.rate);
      }
    }
  } catch (e) {
    console.log('Primary BCV API failed, checking secondary API...', e);
  }

  try {
    // Secondary DolarApi VE
    const res2 = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2 && data2.promedio) {
        return parseFloat(data2.promedio);
      }
    }
  } catch (e) {
    console.log('Secondary BCV API failed, using fallback rate', e);
  }

  return DEFAULT_RATE;
}
