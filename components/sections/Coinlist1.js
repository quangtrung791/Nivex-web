
'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import ChatList from "../chart/ChatList"
import IconStar from "../elements/IconStar"
function money(v, cur='usd'){
  try { 
    return new Intl.NumberFormat(cur==='vnd'?'vi-VN':'en-US', {
      style:'currency', currency: cur.toUpperCase(),
      maximumFractionDigits: cur==='vnd'?0:2
    }).format(v??0);
  } catch { 
    return `${cur.toUpperCase()} ${(v??0).toLocaleString(cur==='vnd'?'vi-VN':'en-US')}`;
  }
}
const pctClass = (v)=> (typeof v==='number' && v>=0 ? 'up' : 'down');

// Function to get trading pair URL
const getTradingUrl = (coinId, symbol) => {
    // Map coin IDs and symbols to trading pairs
    const tradingPairs = {
        'bitcoin': 'btc_usdt',
        'ethereum': 'eth_usdt', 
        'binancecoin': 'bnb_usdt',
        'tether': 'usdt_usdt',
        'solana': 'sol_usdt',
        'ripple': 'xrp_usdt',
        'cardano': 'ada_usdt',
        'avalanche-2': 'avax_usdt',
        'polkadot': 'dot_usdt',
        'chainlink': 'link_usdt',
        'polygon': 'matic_usdt',
        'litecoin': 'ltc_usdt',
        'cosmos': 'atom_usdt',
        'dogecoin': 'doge_usdt',
        'shiba-inu': 'shib_usdt'
    };
    
    // Get trading pair or use symbol_usdt as fallback
    const pair = tradingPairs[coinId] || `${(symbol || '').toLowerCase()}_usdt`;
    return `https://nivex0.one/klinechart/${pair}`;
};

// Function to get trading URL for static coins
const getStaticTradingUrl = (coinName) => {
    const staticTradingPairs = {
        'Bitcoin': 'btc_usdt',
        'Ethereum': 'eth_usdt',
        'BNB': 'bnb_usdt',
        'Tether': 'usdt_usdt',
        'Solana': 'sol_usdt',
        'XRP': 'xrp_usdt',
        'Cardano': 'ada_usdt',
        'Avalanche': 'avax_usdt'
    };
    
    const pair = staticTradingPairs[coinName] || 'btc_usdt';
    return `https://nivex0.one/klinechart/${pair}`;
};

// Trading button component
const TradeButton = ({ coinName }) => (
    <Link href={getStaticTradingUrl(coinName)} target="_blank" className="btn">
        Trade
    </Link>
);

export default function Coinlist1() {
    const generateSparklineData = (isUp = true, points = 20) => {
        const data = [];
        let price = 100 + Math.random() * 50; 
        
        for (let i = 0; i < points; i++) {
            const change = (Math.random() - 0.5) * 10;
            const trend = isUp ? 0.5 : -0.5; //
            price = Math.max(1, price + change + trend);
            data.push(parseFloat(price.toFixed(2)));
        }
        
        return data;
    };

    const getCoinIconUrl = (symbol) => {
        const coinIcons = {
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
            'STAR': 'https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png',
            'DIONE': 'https://s2.coinmarketcap.com/static/img/coins/64x64/22123.png',
            'SNC': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2553.png',
            'GRID': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5604.png',
            'WPR': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2494.png',
            'MWAT': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2682.png',
            
            // NFT coins
            'IMX': 'https://s2.coinmarketcap.com/static/img/coins/64x64/10603.png',
            'FLOW': 'https://s2.coinmarketcap.com/static/img/coins/64x64/4558.png',
            'ENJ': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2130.png',
            'CHZ': 'https://s2.coinmarketcap.com/static/img/coins/64x64/4066.png',
            'RARE': 'https://s2.coinmarketcap.com/static/img/coins/64x64/11294.png',
            'RARI': 'https://s2.coinmarketcap.com/static/img/coins/64x64/6717.png',
            'OCEAN': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3911.png',
            'FND': 'https://s2.coinmarketcap.com/static/img/coins/64x64/8662.png',
            
            // Gaming coins
            'RENDER': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5690.png',
            'GALA': 'https://s2.coinmarketcap.com/static/img/coins/64x64/7080.png',
            'SUPER': 'https://s2.coinmarketcap.com/static/img/coins/64x64/8290.png',
            'BEAM': 'https://s2.coinmarketcap.com/static/img/coins/64x64/28298.png',
            'BIGTIME': 'https://s2.coinmarketcap.com/static/img/coins/64x64/26942.png',
            'PIXEL': 'https://s2.coinmarketcap.com/static/img/coins/64x64/28850.png',
            'WILD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/8921.png',
            'GMT': 'https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png',
            
            // Music coins
            'AUDIO': 'https://s2.coinmarketcap.com/static/img/coins/64x64/7455.png',
            'LMWR': 'https://s2.coinmarketcap.com/static/img/coins/64x64/21158.png',
            'OPUL': 'https://s2.coinmarketcap.com/static/img/coins/64x64/11824.png',
            'CEEK': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3662.png',
            'JAM': 'https://s2.coinmarketcap.com/static/img/coins/64x64/15085.png',
            'BONDLY': 'https://s2.coinmarketcap.com/static/img/coins/64x64/8075.png',
            'BEAT': 'https://s2.coinmarketcap.com/static/img/coins/64x64/20631.png',
            'MUSIC': 'https://s2.coinmarketcap.com/static/img/coins/64x64/26829.png'
        };
        
        return coinIcons[symbol] || 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'; // Fallback to Bitcoin icon
    };

    const [flatTabs, setFlatTabs] = useState(1)

    const [coins, setCoins] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/coins?currency=usd&perPage=10');
                if (!res.ok) {
                    throw new Error(`Lá»—i: ${res.status}`);
                }
                const data = await res.json();
                setCoins(data);
                setErr(""); 
            } catch (error) {
                console.error("KhÃ´ng thá»ƒ láº¥y dá»¯ liá»‡u coins:", error);
                setErr(error.message);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 60000); 

        return () => {
            clearInterval(intervalId);
        };

    }, []); 

    const handleFlatTabs = (index) => {
        setFlatTabs(index)
    }

    return (
        <>

            <section className="coin-list">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                           <div className="block-text">
                                {/* <h3 className="heading">Market Update</h3> */}
                                 <h3 className="heading">NẮM BẮT MỌI CƠ HỘI <span style={{'color':'#BCFE08'}}>GIAO DỊCH</span></h3>
                                {/* <Link className="btn-action-2" href="#">See All Coins</Link> */}
                            </div>
                            <div className="coin-list__main">
                                <div className="flat-tabs">
                                    <ul className="menu-tab">
                                        <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}>
                                            <h6 className="fs-16">View All</h6>
                                        </li>
                                        <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}>
                                            <h6 className="fs-16">Metaverse</h6>
                                        </li>
                                        <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}>
                                            <h6 className="fs-16">Entertainment</h6>
                                        </li>
                                        <li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabs(4)}>
                                            <h6 className="fs-16">Energy</h6>
                                        </li>
                                        <li className={flatTabs === 5 ? "active" : ""} onClick={() => handleFlatTabs(5)}>
                                            <h6 className="fs-16">NFT</h6>
                                        </li>
                                        <li className={flatTabs === 6 ? "active" : ""} onClick={() => handleFlatTabs(6)}>
                                            <h6 className="fs-16">Gaming</h6>
                                        </li>
                                        <li className={flatTabs === 7 ? "active" : ""} onClick={() => handleFlatTabs(7)}>
                                            <h6 className="fs-16">Music</h6>
                                        </li>
                                    </ul>
                                    <div className="content-tab">
                                        <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" />
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Last Price</th>
                                                        <th scope="col">24h %</th>
                                                        <th scope="col">Market Cap</th>
                                                        <th scope="col">Last 7 Days</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                           <tbody>
                                                {!coins && !err && (
                                                    <tr><td colSpan={8} style={{padding:20, opacity:.7}}>Đang tải dữ liệu…</td></tr>
                                                )}
                                                {err && (
                                                    <tr><td colSpan={8} style={{padding:20, color:'#ef4444'}}>Lỗi mạng...</td></tr>
                                                )}
                                                {coins?.map((c, i) => (
                                                    <tr key={c.id ?? i}>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <Link href="#">
                                                            <div style={{display:'flex',alignItems:'center',gap:10}}>
                                                                {/* DÃ¹ng <img> Ä‘á»ƒ khá»i cáº¥u hÃ¬nh next/image domains */}
                                                                <img src={c.image} alt={c.symbol} width={20} height={20} style={{borderRadius:4}} />
                                                                <div>
                                                                <span>{c.name}</span>
                                                                <span className="unit">{(c.symbol||'').toUpperCase()}</span>
                                                                </div>
                                                            </div>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">{money(c.current_price, 'usd')}</td>
                                                        <td className={pctClass(c.price_change_percentage_24h)}>
                                                            {(c.price_change_percentage_24h ?? 0).toFixed(2)}%
                                                        </td>
                                                        <td className="boild">{money(c.market_cap, 'usd')}</td>
                                                        <td>
                                                            {c.sparkline_in_7d?.price && (
                                                                <ChatList
                                                                    sparkline={c.sparkline_in_7d.price}
                                                                    isUp={(c.price_change_percentage_24h ?? 0) >= 0}
                                                                />
                                                            )}
                                                        </td>
                                                        <td><Link href={getTradingUrl(c.id, c.symbol)} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                ))}
                                                </tbody>

                                            </table>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" />
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Last Price</th>
                                                        <th scope="col">24h %</th>
                                                        <th scope="col">Market Cap</th>
                                                        <th scope="col">Last 7 Days</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>1</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('SAND')} alt="The Sandbox" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>The Sandbox</span>
                                                                <span className="unit">SAND</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$0.2908</td>
                                                        <td className="up">+1.92%</td>
                                                        <td className="boild">$749,163,246</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('SAND')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('MANA')} alt="Decentraland" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>Decentraland</span>
                                                                <span className="unit">MANA</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$0.3250</td>
                                                        <td className="up">+15.22%</td>
                                                        <td className="boild">$640,663,049</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('MANA')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('APE')} alt="ApeCoin" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>ApeCoin</span>
                                                                <span className="unit">APE</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$0.5846</td>
                                                        <td className="up">+5.35%</td>
                                                        <td className="boild">$440,526,819</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('APE')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('AXS')} alt="Axie Infinity" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>Axie Infinity</span>
                                                                <span className="unit">AXS</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$2.45</td>
                                                        <td className="up">+1.24%</td>
                                                        <td className="boild">$409,793,170</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('AXS')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('EGLD')} alt="MultiversX" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>MultiversX</span>
                                                                <span className="unit">EGLD</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$13.75</td>
                                                        <td className="down">-0.96%</td>
                                                        <td className="boild">$393,562,317</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(false)} isUp={false} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('EGLD')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('WEMIX')} alt="WEMIX" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>WEMIX</span>
                                                                <span className="unit">WEMIX</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$0.7637</td>
                                                        <td className="up">+5.25%</td>
                                                        <td className="boild">$348,052,650</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('WEMIX')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('VIRTUAL')} alt="Virtuals Protocol" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>Virtuals Protocol</span>
                                                                <span className="unit">VIRTUAL</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$1.17</td>
                                                        <td className="up">+9.07%</td>
                                                        <td className="boild">$772,776,242</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('VIRTUAL')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('ILV')} alt="Illuvium" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>Illuvium</span>
                                                                <span className="unit">ILV</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$14.38</td>
                                                        <td className="up">+2.15%</td>
                                                        <td className="boild">$287,456,832</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('ILV')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" />
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Last Price</th>
                                                        <th scope="col">24h %</th>
                                                        <th scope="col">Market Cap</th>
                                                        <th scope="col">Last 7 Days</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>1</td>
                                                        <td>
                                                            <Link href="#">
                                                                <img src={getCoinIconUrl('THETA')} alt="Theta Network" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} />
                                                                <span>Theta Network</span>
                                                                <span className="unit">THETA</span>
                                                            </Link>
                                                        </td>
                                                        <td className="boild">$0.7933</td>
                                                        <td className="up">+2.45%</td>
                                                        <td className="boild">$793,300,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('THETA')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('APE')} alt="ApeCoin" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>ApeCoin</span>
                                                                <span className="unit">APE</span></Link>
                                                        </td>
                                                        <td className="boild">$0.5847</td>
                                                        <td className="up">+5.35%</td>
                                                        <td className="boild">$440,526,819</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('APE')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('TFUEL')} alt="Theta Fuel" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Theta Fuel</span>
                                                                <span className="unit">TFUEL</span></Link>
                                                        </td>
                                                        <td className="boild">$0.03398</td>
                                                        <td className="up">+1.89%</td>
                                                        <td className="boild">$226,876,340</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('TFUEL')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('YGG')} alt="Yield Guild Games" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Yield Guild Games</span>
                                                                <span className="unit">YGG</span></Link>
                                                        </td>
                                                        <td className="boild">$0.1498</td>
                                                        <td className="up">+3.25%</td>
                                                        <td className="boild">$149,800,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('YGG')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('WAXP')} alt="WAX" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>WAX</span>
                                                                <span className="unit">WAXP</span></Link>
                                                        </td>
                                                        <td className="boild">$0.01963</td>
                                                        <td className="up">+2.15%</td>
                                                        <td className="boild">$78,520,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('WAXP')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('LPT')} alt="Livepeer" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Livepeer</span> <span className="unit">LPT</span></Link>
                                                        </td>
                                                        <td className="boild">$8.94</td>
                                                        <td className="up">+1.78%</td>
                                                        <td className="boild">$268,200,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('LPT')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('VRA')} alt="Verasity" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Verasity</span>
                                                                <span className="unit">VRA</span></Link>
                                                        </td>
                                                        <td className="boild">$0.001332</td>
                                                        <td className="up">+5.49%</td>
                                                        <td className="boild">$133,200,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('VRA')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('BabyDoge')} alt="Baby Doge Coin" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Baby Doge Coin</span>
                                                                <span className="unit">BabyDoge</span></Link>
                                                        </td>
                                                        <td className="boild">$0.081272</td>
                                                        <td className="up">+4.44%</td>
                                                        <td className="boild">$3,380,000,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('BabyDoge')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 4 ? "block" : "none"}` }}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" />
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Last Price</th>
                                                        <th scope="col">24h %</th>
                                                        <th scope="col">Market Cap</th>
                                                        <th scope="col">Last 7 Days</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>1</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('POWR')} alt="Power Ledger" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Power Ledger</span>
                                                                <span className="unit">POWR</span></Link>
                                                        </td>
                                                        <td className="boild">$0.1585</td>
                                                        <td className="up">+3.24%</td>
                                                        <td className="boild">$79,250,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('POWR')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('EWT')} alt="Energy Web Token" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Energy Web Token</span>
                                                                <span className="unit">EWT</span></Link>
                                                        </td>
                                                        <td className="boild">$1.21</td>
                                                        <td className="up">+2.54%</td>
                                                        <td className="boild">$36,300,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('EWT')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('STAR')} alt="Starname" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>STAR</span>
                                                                <span className="unit">STAR</span></Link>
                                                        </td>
                                                        <td className="boild">$0.06552</td>
                                                        <td className="up">+1.89%</td>
                                                        <td className="boild">$26,208,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('STAR')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('DIONE')} alt="Dione Protocol" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Dione Protocol</span>
                                                                <span className="unit">DIONE</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0007695</td>
                                                        <td className="up">+4.12%</td>
                                                        <td className="boild">$15,390,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('DIONE')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('SNC')} alt="SunContract" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>SunContract</span>
                                                                <span className="unit">SNC</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0234</td>
                                                        <td className="up">+1.78%</td>
                                                        <td className="boild">$2,808,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('SNC')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('GRID')} alt="Grid+" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Grid+</span> <span className="unit">GRID</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0456</td>
                                                        <td className="up">+2.34%</td>
                                                        <td className="boild">$1,824,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('GRID')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('WPR')} alt="WePower" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>WePower</span>
                                                                <span className="unit">WPR</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0089</td>
                                                        <td className="down">-1.12%</td>
                                                        <td className="boild">$712,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(false)} isUp={false} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('WPR')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('MWAT')} alt="Restart Energy" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Restart Energy</span>
                                                                <span className="unit">MWAT</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0012</td>
                                                        <td className="up">+3.45%</td>
                                                        <td className="boild">$360,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('MWAT')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 5 ? "block" : "none"}` }}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" />
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Last Price</th>
                                                        <th scope="col">24h %</th>
                                                        <th scope="col">Market Cap</th>
                                                        <th scope="col">Last 7 Days</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>1</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('BTC')} alt="Bitcoin" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Immutable</span>
                                                                <span className="unit">IMX</span></Link>
                                                        </td>
                                                        <td className="boild">$0.5218</td>
                                                        <td className="up">+4.39%</td>
                                                        <td className="boild">$1,012,347,737</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('IMX')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('FLOW')} alt="Flow" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Flow</span>
                                                                <span className="unit">FLOW</span></Link>
                                                        </td>
                                                        <td className="boild">$0.3974</td>
                                                        <td className="up">+1.52%</td>
                                                        <td className="boild">$638,700,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('FLOW')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('ENJ')} alt="Enjin Coin" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Enjin Coin</span>
                                                                <span className="unit">ENJ</span></Link>
                                                        </td>
                                                        <td className="boild">$0.06629</td>
                                                        <td className="up">+0.79%</td>
                                                        <td className="boild">$125,900,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('ENJ')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('CHZ')} alt="Chiliz" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Chiliz</span>
                                                                <span className="unit">CHZ</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0534</td>
                                                        <td className="up">+2.89%</td>
                                                        <td className="boild">$534,000,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('CHZ')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('RARE')} alt="SuperRare" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>SuperRare</span>
                                                                <span className="unit">RARE</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0456</td>
                                                        <td className="up">+1.78%</td>
                                                        <td className="boild">$34,200,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('RARE')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('RARI')} alt="Rarible" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Rarible</span> <span className="unit">RARI</span></Link>
                                                        </td>
                                                        <td className="boild">$1.23</td>
                                                        <td className="up">+3.45%</td>
                                                        <td className="boild">$30,750,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('RARI')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('OCEAN')} alt="Ocean Protocol" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>OpenSea</span>
                                                                <span className="unit">OCEAN</span></Link>
                                                        </td>
                                                        <td className="boild">$0.3456</td>
                                                        <td className="down">-1.23%</td>
                                                        <td className="boild">$345,600,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(false)} isUp={false} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('OCEAN')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('FND')} alt="Foundation" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Foundation</span>
                                                                <span className="unit">FND</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0789</td>
                                                        <td className="up">+2.34%</td>
                                                        <td className="boild">$23,670,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('FND')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 6 ? "block" : "none"}` }}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" />
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Last Price</th>
                                                        <th scope="col">24h %</th>
                                                        <th scope="col">Market Cap</th>
                                                        <th scope="col">Last 7 Days</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>1</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('BTC')} alt="Bitcoin" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Render</span>
                                                                <span className="unit">RENDER</span></Link>
                                                        </td>
                                                        <td className="boild">$3.54</td>
                                                        <td className="up">+6.44%</td>
                                                        <td className="boild">$1,839,868,106</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('RENDER')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('GALA')} alt="Gala" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Gala</span>
                                                                <span className="unit">GALA</span></Link>
                                                        </td>
                                                        <td className="boild">$0.01647</td>
                                                        <td className="up">+4.37%</td>
                                                        <td className="boild">$756,327,418</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('GALA')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('SUPER')} alt="SuperVerse" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>SuperVerse</span>
                                                                <span className="unit">SUPER</span></Link>
                                                        </td>
                                                        <td className="boild">$0.5854</td>
                                                        <td className="up">+4.84%</td>
                                                        <td className="boild">$362,545,830</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('SUPER')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('BEAM')} alt="Beam" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Beam</span>
                                                                <span className="unit">BEAM</span></Link>
                                                        </td>
                                                        <td className="boild">$0.007117</td>
                                                        <td className="up">+4.05%</td>
                                                        <td className="boild">$352,091,464</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('BEAM')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('BIGTIME')} alt="Big Time" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Big Time</span>
                                                                <span className="unit">BIGTIME</span></Link>
                                                        </td>
                                                        <td className="boild">$0.05</td>
                                                        <td className="up">+2.56%</td>
                                                        <td className="boild">$50,000,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('BIGTIME')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('PIXEL')} alt="Pixels" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Pixels</span> <span className="unit">PIXEL</span></Link>
                                                        </td>
                                                        <td className="boild">$0.03</td>
                                                        <td className="up">+1.89%</td>
                                                        <td className="boild">$30,000,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('PIXEL')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('WILD')} alt="Wilder World" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Wilder World</span>
                                                                <span className="unit">WILD</span></Link>
                                                        </td>
                                                        <td className="boild">$0.34</td>
                                                        <td className="up">+3.45%</td>
                                                        <td className="boild">$34,000,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('WILD')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('GMT')} alt="STEPN" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>GMT</span>
                                                                <span className="unit">GMT</span></Link>
                                                        </td>
                                                        <td className="boild">$0.04</td>
                                                        <td className="up">+2.15%</td>
                                                        <td className="boild">$40,000,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('GMT')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 7 ? "block" : "none"}` }}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" />
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Last Price</th>
                                                        <th scope="col">24h %</th>
                                                        <th scope="col">Market Cap</th>
                                                        <th scope="col">Last 7 Days</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>1</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('AUDIO')} alt="Audius" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Audius</span>
                                                                <span className="unit">AUDIO</span></Link>
                                                        </td>
                                                        <td className="boild">$0.06173</td>
                                                        <td className="down">-0.15%</td>
                                                        <td className="boild">$83,559,480</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(false)} isUp={false} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('AUDIO')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('LMWR')} alt="Limewire" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Limewire</span>
                                                                <span className="unit">LMWR</span></Link>
                                                        </td>
                                                        <td className="boild">$0.07494</td>
                                                        <td className="down">-4.20%</td>
                                                        <td className="boild">$27,418,395</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(false)} isUp={false} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('LMWR')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('OPUL')} alt="Opulous" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Opulous</span>
                                                                <span className="unit">OPUL</span></Link>
                                                        </td>
                                                        <td className="boild">$0.03168</td>
                                                        <td className="up">+13.32%</td>
                                                        <td className="boild">$13,363,708</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('OPUL')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('CEEK')} alt="CEEK VR" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>CEEK VR</span>
                                                                <span className="unit">CEEK</span></Link>
                                                        </td>
                                                        <td className="boild">$0.009480</td>
                                                        <td className="down">-1.61%</td>
                                                        <td className="boild">$7,638,696</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(false)} isUp={false} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('CEEK')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('JAM')} alt="JAM" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Tune.FM</span>
                                                                <span className="unit">JAM</span></Link>
                                                        </td>
                                                        <td className="boild">$0.00006089</td>
                                                        <td className="up">+1.05%</td>
                                                        <td className="boild">$1,809,255</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('JAM')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('BONDLY')} alt="Bondly" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Forj (Bondly)</span> <span className="unit">BONDLY</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0009119</td>
                                                        <td className="up">+2.36%</td>
                                                        <td className="boild">$897,011</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('BONDLY')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('BEAT')} alt="BeatBind" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>MetaBeat</span>
                                                                <span className="unit">BEAT</span></Link>
                                                        </td>
                                                        <td className="boild">$0.0002066</td>
                                                        <td className="up">+28.32%</td>
                                                        <td className="boild">$277,568</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('BEAT')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><img src={getCoinIconUrl('MUSIC')} alt="Music Protocol" style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px'}} /><span>Gala Music</span>
                                                                <span className="unit">MUSIC</span></Link>
                                                        </td>
                                                        <td className="boild">$0.01</td>
                                                        <td className="up">+5.23%</td>
                                                        <td className="boild">$10,000,000</td>
                                                        <td>
                                                            <ChatList sparkline={generateSparklineData(true)} isUp={true} />
                                                        </td>
                                                        <td><Link href={getStaticTradingUrl('MUSIC')} target="_blank" className="btn">Trade</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}





