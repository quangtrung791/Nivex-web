// app/api/coins/static/route.js
// API route cho static coin data - tiết kiệm edge requests
export const revalidate = 86400; // Cache 24h vì data ít thay đổi

export async function GET() {
  // Static coin data sẽ không thay đổi thường xuyên
  const staticCoinData = {
    coinIcons: {
      // Metaverse coins
      'SAND': 'https://s2.coinmarketcap.com/static/img/coins/64x64/6210.png',
      'MANA': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1966.png',
      'APE': 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
      'AXS': 'https://s2.coinmarketcap.com/static/img/coins/64x64/6783.png',
      'EGLD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/6892.png',
      'WEMIX': 'https://s2.coinmarketcap.com/static/img/coins/64x64/7548.png',
      'VIRTUAL': 'https://s2.coinmarketcap.com/static/img/coins/64x64/33407.png',
      'ILV': 'https://s2.coinmarketcap.com/static/img/coins/64x64/8719.png',
      
      // Entertainment coins
      'THETA': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2416.png',
      'TFUEL': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3822.png',
      'YGG': 'https://s2.coinmarketcap.com/static/img/coins/64x64/10688.png',
      'WAXP': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2300.png',
      'LPT': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3640.png',
      'VRA': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3816.png',
      'BabyDoge': 'https://s2.coinmarketcap.com/static/img/coins/64x64/10186.png',
      
      // Energy coins
      'POWR': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2132.png',
      'EWT': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5268.png',
      'EPX': 'https://s2.coinmarketcap.com/static/img/coins/64x64/4023.png',
      
      // Agriculture coins
      'FSW': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5656.png',
      'CEEK': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2468.png',
    },
    
    tradingUrls: {
      'SAND': 'https://trade.example.com/SAND',
      'MANA': 'https://trade.example.com/MANA',
      'APE': 'https://trade.example.com/APE',
      'THETA': 'https://trade.example.com/THETA',
      'TFUEL': 'https://trade.example.com/TFUEL',
      'POWR': 'https://trade.example.com/POWR',
      'EWT': 'https://trade.example.com/EWT',
      'BabyDoge': 'https://trade.example.com/BabyDoge',
      'CEEK': 'https://trade.example.com/CEEK',
    }
  };

  return new Response(JSON.stringify(staticCoinData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=172800', // Cache 24h, stale 48h
      'CDN-Cache-Control': 's-maxage=172800', // Cache CDN 48h
      'Vercel-CDN-Cache-Control': 's-maxage=604800' // Cache Vercel 7 ngày
    }
  });
}
