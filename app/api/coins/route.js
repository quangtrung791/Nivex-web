// app/api/coins/route.js
export const revalidate = 300; // cache 5 minutes (ISR) - tiết kiệm edge requests

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const currency = (searchParams.get('currency') || 'usd').toLowerCase();
  const perPage = Math.min(parseInt(searchParams.get('perPage') || '10', 10), 250);

  const url = new URL('https://api.coingecko.com/api/v3/coins/markets');
  url.searchParams.set('vs_currency', currency);
  url.searchParams.set('order', 'market_cap_desc');
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', '1');
  url.searchParams.set('sparkline', 'true');
  url.searchParams.set('price_change_percentage', '1h,24h,7d');

  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'CoinGecko failed', status: res.status }), { status: 500 });
  }
  const data = await res.json();
  
  // Thêm Cache-Control headers để tối ưu CDN caching
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600', // Cache 5 phút, stale 10 phút
      'CDN-Cache-Control': 's-maxage=600', // Cache CDN 10 phút
      'Vercel-CDN-Cache-Control': 's-maxage=1800' // Cache Vercel 30 phút
    }
  });
}
