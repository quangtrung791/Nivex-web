
'use client'
import Link from "next/link"
import ChatList from "../chart/ChatList"
import { useState, useEffect } from "react"
export default function Crypto1() {
    const [flatTabs, setFlatTabs] = useState(1)
    const [cryptoData, setCryptoData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Define specific coins we want to display
    const targetCoins = ['bitcoin', 'ethereum', 'tether', 'binancecoin']

    const fetchCryptoData = async () => {
        try {
            const response = await fetch('/api/coins?vs_currency=usd&per_page=250&page=1&price_change_percentage=24h&sparkline=true')
            const data = await response.json()
            
            // Filter and order data to match our target coins
            const filteredData = targetCoins.map(coinId => 
                data.find(coin => coin.id === coinId)
            ).filter(Boolean)
            
            setCryptoData(filteredData)
            setError(null)
        } catch (err) {
            console.error('Error fetching crypto data:', err)
            setError('Failed to fetch data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCryptoData()
        const interval = setInterval(fetchCryptoData, 30000) // Update every 30 seconds
        return () => clearInterval(interval)
    }, [])

    // Helper function to format price
    const formatPrice = (price) => {
        if (price >= 1) {
            return price.toFixed(2)
        } else {
            return price.toFixed(6)
        }
    }

    // Helper function to get coin data by ID
    const getCoinData = (coinId) => {
        return cryptoData.find(coin => coin.id === coinId) || {}
    }

    const handleFlatTabs = (index) => {
        setFlatTabs(index)
    }

    return (
        <>

            <section className="crypto" data-aos="fade-up" data-aos-duration={1000}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="crypto__main">
                                <div className="flat-tabs">
                                    <div className="content-tab">
                                        <div className="content-inner" style={{ display: `${flatTabs === 1 ? "flex" : "none"}` }}>
                                            
                                            <div className="crypto-box active">
                                                <div className="flex">
                                                    <div>
                                                        <div className="top">
                                                            <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                                {/* <span>Bitcoin</span> */}
                                                                {/* <span className="unit">BTC/USD</span> */}
                                                            </Link>
                                                        </div>
                                                         <span>Bitcoin</span>
                                                    </div>
                                                    <div className="flex-content">
                                                        <div className="chart-container">
                                                            <ChatList 
                                                                sparkline={getCoinData('bitcoin').sparkline_in_7d ? getCoinData('bitcoin').sparkline_in_7d.price : null}
                                                                isUp={getCoinData('bitcoin').price_change_percentage_24h >= 0}
                                                            />
                                                        </div>
                                                        <div className="bottom">
                                                            {/* <p>{getCoinData('bitcoin').market_cap ? 
                                                                `$${getCoinData('bitcoin').market_cap.toLocaleString()}` : 
                                                                '36,641.20'}</p> */}
                                                            <p className={`sale ${getCoinData('bitcoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                                {getCoinData('bitcoin').price_change_percentage_24h ? 
                                                                    `${getCoinData('bitcoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                    '-0.79%'}
                                                            </p><br></br>
                                                        </div><span className="unit">BTC</span>
                                                    </div>
                                                </div>
                                                <h6 className="price">
                                                            USD ${getCoinData('bitcoin').current_price ? formatPrice(getCoinData('bitcoin').current_price) : '46,168.95'}
                                                </h6>
                                            </div>


                                            <div className="crypto-box active">
                                                <div className="flex">
                                                    <div>
                                                        <div className="top">
                                                            <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" />
                                                                <span className="path3" /><span className="path4" /></span>
                                                                {/* <span>Ethereum</span> */}
                                                                {/* <span className="unit">ETH/USD</span> */}
                                                            </Link>
                                                        </div>
                                                        <span>Ethereum</span>
                                                        {/* <h6 className="price">
                                                            USD ${getCoinData('ethereum').current_price ? formatPrice(getCoinData('ethereum').current_price) : '3,480.04'}
                                                        </h6> */}
                                                    </div>
                                                    <div className="flex-content add-position-right special-coin">
                                                        <div className="chart-container">
                                                            <ChatList 
                                                                sparkline={getCoinData('ethereum').sparkline_in_7d ? getCoinData('ethereum').sparkline_in_7d.price : null}
                                                                isUp={getCoinData('ethereum').price_change_percentage_24h >= 0}
                                                            />
                                                        </div>
                                                        <div className="bottom">
                                                            {/* <p>{getCoinData('ethereum').market_cap ? 
                                                                `$${getCoinData('ethereum').market_cap.toLocaleString()}` : 
                                                                '36,641.20'}</p> */}
                                                            <p className={`sale ${getCoinData('ethereum').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                                {getCoinData('ethereum').price_change_percentage_24h ? 
                                                                    `${getCoinData('ethereum').price_change_percentage_24h.toFixed(2)}%` : 
                                                                    '+10.55%'}
                                                            </p><br></br>
                                                        </div><span className="unit">ETH</span>
                                                    </div>
                                                </div>
                                                <h6 className="price">
                                                            USD ${getCoinData('ethereum').current_price ? formatPrice(getCoinData('ethereum').current_price) : '3,480.04'}
                                                </h6>
                                            </div>


                                            <div className="crypto-box active">
                                                <div className="flex">
                                                    <div>
                                                        <div className="top">
                                                            <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span>
                                                                {/* <span>Tether</span>
                                                                <span className="unit">USDT/USD</span> */}
                                                            </Link>
                                                        </div>
                                                        <span>Tether</span>
                                                        {/* <h6 className="price">
                                                            USD {getCoinData('tether').current_price ? formatPrice(getCoinData('tether').current_price) : '1.00'}
                                                        </h6> */}
                                                    </div>
                                                    <div className="flex-content ">
                                                        <div className="chart-container">
                                                            <ChatList 
                                                                sparkline={getCoinData('tether').sparkline_in_7d ? getCoinData('tether').sparkline_in_7d.price : null}
                                                                isUp={getCoinData('tether').price_change_percentage_24h >= 0}
                                                            />
                                                        </div>
                                                        <div className="bottom">
                                                            {/* <p>{getCoinData('tether').market_cap ? 
                                                                `$${getCoinData('tether').market_cap.toLocaleString()}` : 
                                                                '36,641.20'}</p> */}
                                                            <div className={`sale ${getCoinData('tether').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                                {getCoinData('tether').price_change_percentage_24h ? 
                                                                    `${getCoinData('tether').price_change_percentage_24h.toFixed(2)}%` : 
                                                                    '-0.01%'}
                                                            </div><br></br>
                                                        </div><span className="unit">USDT</span>
                                                    </div>
                                                </div>
                                                <h6 className="price">
                                                            USD {getCoinData('tether').current_price ? formatPrice(getCoinData('tether').current_price) : '1.00'}
                                                </h6>
                                            </div>



                                            <div className="crypto-box active">
                                                <div className="flex">
                                                    <div>
                                                        <div className="top">
                                                            <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span>
                                                                {/* <span>BNB</span> */}
                                                                {/* <span className="unit">BNB/USD</span> */}
                                                            </Link>
                                                        </div>
                                                        <span>BNB</span>
                                                        {/* <h6 className="price">
                                                            USD {getCoinData('binancecoin').current_price ? formatPrice(getCoinData('binancecoin').current_price) : '443.56'}
                                                        </h6> */}
                                                    </div>
                                                    <div className="flex-content add-position-right">
                                                        <div className="chart-container">
                                                            <ChatList 
                                                                sparkline={getCoinData('binancecoin').sparkline_in_7d ? getCoinData('binancecoin').sparkline_in_7d.price : null}
                                                                isUp={getCoinData('binancecoin').price_change_percentage_24h >= 0}
                                                            />
                                                        </div>
                                                        <div className="bottom">
                                                            {/* <p>{getCoinData('binancecoin').market_cap ? 
                                                                `$${getCoinData('binancecoin').market_cap.toLocaleString()}` : 
                                                                '36,641.20'}</p> */}
                                                            <div className={`sale ${getCoinData('binancecoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                                {getCoinData('binancecoin').price_change_percentage_24h ? 
                                                                    `${getCoinData('binancecoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                    '-1.24%'}
                                                            </div><br></br>
                                                        </div><span className="unit">BNB</span>
                                                    </div>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('binancecoin').current_price ? formatPrice(getCoinData('binancecoin').current_price) : '443.56'}
                                                </h6>
                                            </div>
                                        </div>

                                        {/* cac the khac */}
                                        <div className="content-inner" style={{ display: `${flatTabs === 2 ? "flex" : "none"}` }}>
                                            <div className="crypto-box">
                                                <div>
                                                    <div className="top">
                                                        <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                            <span>Bitcoin</span>
                                                            <span className="unit">BTC/USD</span></Link>
                                                    </div>
                                                    <h6 className="price">
                                                        USD ${getCoinData('bitcoin').current_price ? formatPrice(getCoinData('bitcoin').current_price) : '46,168.95'}
                                                    </h6>
                                                </div>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('bitcoin').market_cap ? 
                                                            `$${getCoinData('bitcoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <p className={`sale ${getCoinData('bitcoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('bitcoin').price_change_percentage_24h ? 
                                                                `${getCoinData('bitcoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.79%'}
                                                        </p>
                                                    </div>
                                                    <div className="chart-container">
                                                        <ChatList 
                                                            sparkline={getCoinData('bitcoin').sparkline_in_7d ? getCoinData('bitcoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('bitcoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box active">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                        <span className="unit">ETH/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('ethereum').current_price ? formatPrice(getCoinData('ethereum').current_price) : '3,480.04'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('ethereum').market_cap ? 
                                                            `$${getCoinData('ethereum').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('ethereum').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('ethereum').price_change_percentage_24h ? 
                                                                `${getCoinData('ethereum').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '+10.55%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('ethereum').sparkline_in_7d ? getCoinData('ethereum').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('ethereum').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                        <span className="unit">USDT/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('tether').current_price ? formatPrice(getCoinData('tether').current_price) : '1.00'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('tether').market_cap ? 
                                                            `$${getCoinData('tether').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('tether').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('tether').price_change_percentage_24h ? 
                                                                `${getCoinData('tether').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.01%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('tether').sparkline_in_7d ? getCoinData('tether').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('tether').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span> <span className="unit">BNB/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('binancecoin').current_price ? formatPrice(getCoinData('binancecoin').current_price) : '443.56'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('binancecoin').market_cap ? 
                                                            `$${getCoinData('binancecoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('binancecoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('binancecoin').price_change_percentage_24h ? 
                                                                `${getCoinData('binancecoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-1.24%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('binancecoin').sparkline_in_7d ? getCoinData('binancecoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('binancecoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 3 ? "flex" : "none"}` }}>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                        <span>Bitcoin</span>
                                                        <span className="unit">BTC/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('bitcoin').current_price ? formatPrice(getCoinData('bitcoin').current_price) : '46,168.95'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('bitcoin').market_cap ? 
                                                            `$${getCoinData('bitcoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <p className={`sale ${getCoinData('bitcoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('bitcoin').price_change_percentage_24h ? 
                                                                `${getCoinData('bitcoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.79%'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('bitcoin').sparkline_in_7d ? getCoinData('bitcoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('bitcoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box active">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                        <span className="unit">ETH/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('ethereum').current_price ? formatPrice(getCoinData('ethereum').current_price) : '3,480.04'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('ethereum').market_cap ? 
                                                            `$${getCoinData('ethereum').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('ethereum').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('ethereum').price_change_percentage_24h ? 
                                                                `${getCoinData('ethereum').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '+10.55%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('ethereum').sparkline_in_7d ? getCoinData('ethereum').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('ethereum').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                        <span className="unit">USDT/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('tether').current_price ? formatPrice(getCoinData('tether').current_price) : '1.00'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('tether').market_cap ? 
                                                            `$${getCoinData('tether').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('tether').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('tether').price_change_percentage_24h ? 
                                                                `${getCoinData('tether').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.01%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('tether').sparkline_in_7d ? getCoinData('tether').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('tether').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span> <span className="unit">BNB/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('binancecoin').current_price ? formatPrice(getCoinData('binancecoin').current_price) : '443.56'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('binancecoin').market_cap ? 
                                                            `$${getCoinData('binancecoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('binancecoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('binancecoin').price_change_percentage_24h ? 
                                                                `${getCoinData('binancecoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-1.24%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('binancecoin').sparkline_in_7d ? getCoinData('binancecoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('binancecoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 4 ? "flex" : "none"}` }}>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                        <span>Bitcoin</span>
                                                        <span className="unit">BTC/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('bitcoin').current_price ? formatPrice(getCoinData('bitcoin').current_price) : '46,168.95'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('bitcoin').market_cap ? 
                                                            `$${getCoinData('bitcoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <p className={`sale ${getCoinData('bitcoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('bitcoin').price_change_percentage_24h ? 
                                                                `${getCoinData('bitcoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.79%'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('bitcoin').sparkline_in_7d ? getCoinData('bitcoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('bitcoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box active">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                        <span className="unit">ETH/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('ethereum').current_price ? formatPrice(getCoinData('ethereum').current_price) : '3,480.04'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('ethereum').market_cap ? 
                                                            `$${getCoinData('ethereum').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('ethereum').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('ethereum').price_change_percentage_24h ? 
                                                                `${getCoinData('ethereum').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '+10.55%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('ethereum').sparkline_in_7d ? getCoinData('ethereum').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('ethereum').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                        <span className="unit">USDT/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('tether').current_price ? formatPrice(getCoinData('tether').current_price) : '1.00'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('tether').market_cap ? 
                                                            `$${getCoinData('tether').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('tether').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('tether').price_change_percentage_24h ? 
                                                                `${getCoinData('tether').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.01%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('tether').sparkline_in_7d ? getCoinData('tether').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('tether').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span> <span className="unit">BNB/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('binancecoin').current_price ? formatPrice(getCoinData('binancecoin').current_price) : '443.56'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('binancecoin').market_cap ? 
                                                            `$${getCoinData('binancecoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('binancecoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('binancecoin').price_change_percentage_24h ? 
                                                                `${getCoinData('binancecoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-1.24%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('binancecoin').sparkline_in_7d ? getCoinData('binancecoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('binancecoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 5 ? "flex" : "none"}` }}>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                        <span>Bitcoin</span>
                                                        <span className="unit">BTC/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('bitcoin').current_price ? formatPrice(getCoinData('bitcoin').current_price) : '46,168.95'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('bitcoin').market_cap ? 
                                                            `$${getCoinData('bitcoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <p className={`sale ${getCoinData('bitcoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('bitcoin').price_change_percentage_24h ? 
                                                                `${getCoinData('bitcoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.79%'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('bitcoin').sparkline_in_7d ? getCoinData('bitcoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('bitcoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box active">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                        <span className="unit">ETH/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('ethereum').current_price ? formatPrice(getCoinData('ethereum').current_price) : '3,480.04'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('ethereum').market_cap ? 
                                                            `$${getCoinData('ethereum').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('ethereum').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('ethereum').price_change_percentage_24h ? 
                                                                `${getCoinData('ethereum').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '+10.55%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('ethereum').sparkline_in_7d ? getCoinData('ethereum').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('ethereum').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                        <span className="unit">USDT/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('tether').current_price ? formatPrice(getCoinData('tether').current_price) : '1.00'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('tether').market_cap ? 
                                                            `$${getCoinData('tether').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('tether').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('tether').price_change_percentage_24h ? 
                                                                `${getCoinData('tether').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.01%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('tether').sparkline_in_7d ? getCoinData('tether').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('tether').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span> <span className="unit">BNB/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('binancecoin').current_price ? formatPrice(getCoinData('binancecoin').current_price) : '443.56'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('binancecoin').market_cap ? 
                                                            `$${getCoinData('binancecoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('binancecoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('binancecoin').price_change_percentage_24h ? 
                                                                `${getCoinData('binancecoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-1.24%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('binancecoin').sparkline_in_7d ? getCoinData('binancecoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('binancecoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 6 ? "flex" : "none"}` }}>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                        <span>Bitcoin</span>
                                                        <span className="unit">BTC/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('bitcoin').current_price ? formatPrice(getCoinData('bitcoin').current_price) : '46,168.95'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('bitcoin').market_cap ? 
                                                            `$${getCoinData('bitcoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <p className={`sale ${getCoinData('bitcoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('bitcoin').price_change_percentage_24h ? 
                                                                `${getCoinData('bitcoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.79%'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('bitcoin').sparkline_in_7d ? getCoinData('bitcoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('bitcoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box active">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                        <span className="unit">ETH/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('ethereum').current_price ? formatPrice(getCoinData('ethereum').current_price) : '3,480.04'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('ethereum').market_cap ? 
                                                            `$${getCoinData('ethereum').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('ethereum').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('ethereum').price_change_percentage_24h ? 
                                                                `${getCoinData('ethereum').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '+10.55%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('ethereum').sparkline_in_7d ? getCoinData('ethereum').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('ethereum').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                        <span className="unit">USDT/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('tether').current_price ? formatPrice(getCoinData('tether').current_price) : '1.00'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('tether').market_cap ? 
                                                            `$${getCoinData('tether').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('tether').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('tether').price_change_percentage_24h ? 
                                                                `${getCoinData('tether').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.01%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('tether').sparkline_in_7d ? getCoinData('tether').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('tether').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span> <span className="unit">BNB/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('binancecoin').current_price ? formatPrice(getCoinData('binancecoin').current_price) : '443.56'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('binancecoin').market_cap ? 
                                                            `$${getCoinData('binancecoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('binancecoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('binancecoin').price_change_percentage_24h ? 
                                                                `${getCoinData('binancecoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-1.24%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('binancecoin').sparkline_in_7d ? getCoinData('binancecoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('binancecoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-inner" style={{ display: `${flatTabs === 7 ? "flex" : "none"}` }}>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-btc"><span className="path1" /><span className="path2" /></span>
                                                        <span>Bitcoin</span>
                                                        <span className="unit">BTC/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('bitcoin').current_price ? formatPrice(getCoinData('bitcoin').current_price) : '46,168.95'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('bitcoin').market_cap ? 
                                                            `$${getCoinData('bitcoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <p className={`sale ${getCoinData('bitcoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('bitcoin').price_change_percentage_24h ? 
                                                                `${getCoinData('bitcoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.79%'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('bitcoin').sparkline_in_7d ? getCoinData('bitcoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('bitcoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box active">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-eth"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></span><span>Ethereum</span>
                                                        <span className="unit">ETH/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD ${getCoinData('ethereum').current_price ? formatPrice(getCoinData('ethereum').current_price) : '3,480.04'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('ethereum').market_cap ? 
                                                            `$${getCoinData('ethereum').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('ethereum').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('ethereum').price_change_percentage_24h ? 
                                                                `${getCoinData('ethereum').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '+10.55%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('ethereum').sparkline_in_7d ? getCoinData('ethereum').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('ethereum').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-tether"><span className="path1" /><span className="path2" /></span><span>Tether</span>
                                                        <span className="unit">USDT/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('tether').current_price ? formatPrice(getCoinData('tether').current_price) : '1.00'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('tether').market_cap ? 
                                                            `$${getCoinData('tether').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('tether').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('tether').price_change_percentage_24h ? 
                                                                `${getCoinData('tether').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-0.01%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('tether').sparkline_in_7d ? getCoinData('tether').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('tether').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="crypto-box">
                                                <div className="top">
                                                    <Link href="#"><span className="icon-bnb"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></span><span>BNB</span> <span className="unit">BNB/USD</span></Link>
                                                </div>
                                                <h6 className="price">
                                                    USD {getCoinData('binancecoin').current_price ? formatPrice(getCoinData('binancecoin').current_price) : '443.56'}
                                                </h6>
                                                <div className="flex-content">
                                                    <div className="bottom">
                                                        <p>{getCoinData('binancecoin').market_cap ? 
                                                            `$${getCoinData('binancecoin').market_cap.toLocaleString()}` : 
                                                            '36,641.20'}</p>
                                                        <div className={`sale ${getCoinData('binancecoin').price_change_percentage_24h >= 0 ? 'success' : 'critical'}`}>
                                                            {getCoinData('binancecoin').price_change_percentage_24h ? 
                                                                `${getCoinData('binancecoin').price_change_percentage_24h.toFixed(2)}%` : 
                                                                '-1.24%'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <ChatList 
                                                            sparkline={getCoinData('binancecoin').sparkline_in_7d ? getCoinData('binancecoin').sparkline_in_7d.price : null}
                                                            isUp={getCoinData('binancecoin').price_change_percentage_24h >= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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
