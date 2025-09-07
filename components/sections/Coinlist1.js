
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
export default function Coinlist1() {
    const [flatTabs, setFlatTabs] = useState(1)

    const [coins, setCoins] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        // 1. Định nghĩa một hàm để lấy dữ liệu
        const fetchData = async () => {
            try {
                const res = await fetch('/api/coins?currency=usd&perPage=10');
                if (!res.ok) {
                    throw new Error(`Lỗi: ${res.status}`);
                }
                const data = await res.json();
                setCoins(data);
                setErr(""); // Xóa lỗi nếu lấy dữ liệu thành công
            } catch (error) {
                console.error("Không thể lấy dữ liệu coins:", error);
                setErr(error.message);
            }
        };

        // 2. Lấy dữ liệu ngay lần đầu tiên khi component được tải
        fetchData();

        // 3. Thiết lập một interval để gọi lại hàm fetchData sau mỗi 5 giây
        const intervalId = setInterval(fetchData, 30000); // 5000 milliseconds = 5 giây

        // 4. Quan trọng: Dọn dẹp interval khi component bị hủy
        //    Điều này giúp tránh rò rỉ bộ nhớ và các lỗi không mong muốn.
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
                                 <h3 className="heading">Nắm Bắt Mọi Cơ Hội <span style={{'color':'#BCFE08'}}>Giao Dịch</span></h3>
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
                                                    <tr><td colSpan={8} style={{padding:20, color:'#ef4444'}}>Lỗi: {err}</td></tr>
                                                )}
                                                {coins?.map((c, i) => (
                                                    <tr key={c.id ?? i}>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <Link href="#">
                                                            <div style={{display:'flex',alignItems:'center',gap:10}}>
                                                                {/* Dùng <img> để khỏi cấu hình next/image domains */}
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
                                                        <td><Link href="#" className="btn">Trade</Link></td>
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
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                                <span>Bitcoin</span>
                                                                <span className="unit">BTC</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                                <span className="unit">ETH</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-5.12%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span>
                                                                <span className="unit">BNB/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-3.75%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                                <span className="unit">USDT/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>Solana</span>
                                                                <span className="unit">SOL</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>XRP</span> <span className="unit">XRP</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-2.22%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>Cardano</span>
                                                                <span className="unit">ADA</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+0.8%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Avalanche</span>
                                                                <span className="unit">AVAX</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.41%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
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
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                                <span>Bitcoin</span>
                                                                <span className="unit">BTC</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                                <span className="unit">ETH</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-5.12%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span>
                                                                <span className="unit">BNB/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-3.75%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                                <span className="unit">USDT/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>Solana</span>
                                                                <span className="unit">SOL</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>XRP</span> <span className="unit">XRP</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-2.22%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>Cardano</span>
                                                                <span className="unit">ADA</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+0.8%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Avalanche</span>
                                                                <span className="unit">AVAX</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.41%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
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
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                                <span>Bitcoin</span>
                                                                <span className="unit">BTC</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                                <span className="unit">ETH</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-5.12%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span>
                                                                <span className="unit">BNB/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-3.75%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                                <span className="unit">USDT/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>Solana</span>
                                                                <span className="unit">SOL</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>XRP</span> <span className="unit">XRP</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-2.22%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>Cardano</span>
                                                                <span className="unit">ADA</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+0.8%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Avalanche</span>
                                                                <span className="unit">AVAX</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.41%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
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
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                                <span>Bitcoin</span>
                                                                <span className="unit">BTC</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                                <span className="unit">ETH</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-5.12%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span>
                                                                <span className="unit">BNB/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-3.75%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                                <span className="unit">USDT/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>Solana</span>
                                                                <span className="unit">SOL</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>XRP</span> <span className="unit">XRP</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-2.22%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>Cardano</span>
                                                                <span className="unit">ADA</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+0.8%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Avalanche</span>
                                                                <span className="unit">AVAX</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.41%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
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
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                                <span>Bitcoin</span>
                                                                <span className="unit">BTC</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                                <span className="unit">ETH</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-5.12%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span>
                                                                <span className="unit">BNB/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-3.75%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                                <span className="unit">USDT/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>Solana</span>
                                                                <span className="unit">SOL</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>XRP</span> <span className="unit">XRP</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-2.22%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>Cardano</span>
                                                                <span className="unit">ADA</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+0.8%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Avalanche</span>
                                                                <span className="unit">AVAX</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.41%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
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
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                                <span>Bitcoin</span>
                                                                <span className="unit">BTC</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>2</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                                <span className="unit">ETH</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-5.12%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>3</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span>
                                                                <span className="unit">BNB/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-3.75%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>4</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                                <span className="unit">USDT/USD</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>5</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-sol"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /></span><span>Solana</span>
                                                                <span className="unit">SOL</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.45%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>6</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span><span>XRP</span> <span className="unit">XRP</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="down">-2.22%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={2} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>7</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-ada"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /><span className="path7" /><span className="path8" /><span className="path9" /></span><span>Cardano</span>
                                                                <span className="unit">ADA</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+0.8%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><IconStar /></th>
                                                        <td>8</td>
                                                        <td>
                                                            <Link href="#"><span className="icon-avax"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Avalanche</span>
                                                                <span className="unit">AVAX</span></Link>
                                                        </td>
                                                        <td className="boild">$56,623.54</td>
                                                        <td className="up">+1.41%</td>
                                                        <td className="boild">$880,423,640,582</td>
                                                        <td>
                                                            <ChatList color={1} />
                                                        </td>
                                                        <td><Link href="#" className="btn">Trade</Link></td>
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
