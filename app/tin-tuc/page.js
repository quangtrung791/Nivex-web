
"use client";
// import VideoPopup from "@/components/elements/VideoPopup"
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import './style.css';

const COINS = [
    { id: "solana", symbol: "SOL", name: "Solana" },
    { id: "ripple", symbol: "XRP", name: "XRP" },
    { id: "ethereum", symbol: "ETH", name: "Ethereum" },
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
    { id: "litecoin", symbol: "LTC", name: "Litecoin" },
    { id: "shiba-inu", symbol: "SHIB", name: "Shiba Inu" }
];
const TABS = [
    { label: "View All", value: "all" },
    { label: "Learn & Earn", value: "learn" },
    { label: "Metaverse", value: "metaverse" },
    { label: "Energy", value: "energy" },
    { label: "NFT", value: "nft" },
    { label: "Gaming", value: "gaming" },
    { label: "Music", value: "music" }
];

export default function BlogDetails() {
    const [coinData, setCoinData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.map(c => c.id).join(",")}`
        )
            .then(res => res.json())
            .then(data => setCoinData(data));
    }, []);

    return (
        <>

            <Layout headerStyle={1} footerStyle={2} >
                <section className="section-news-header">
                    <div className="news-header-container">
                        <h1 className="news-title">Tin tức</h1>
                        <form className="news-search-form">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="news-search-input"
                            />
                            <button type="submit" className="news-search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" stroke="#222" strokeWidth="2" fill="none"/>
                                    <line x1="17" y1="17" x2="22" y2="22" stroke="#222" strokeWidth="2"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </section>
                    {/* coin list */}
                    <div className="coin-list-container-c">
                        <div className="coin-list-marquee">
                            <div className="coin-list-c">
                                {coinData.concat(coinData).map((coin, idx) => (
                                    <span className="coin" key={idx}>
                                        <img
                                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id === "ripple" ? 52 : coin.id === "solana" ? 5426 : coin.id === "ethereum" ? 1027 : coin.id === "bitcoin" ? 1 : coin.id === "litecoin" ? 2 : coin.id === "shiba-inu" ? 5994 : ""}.png`}
                                            alt={coin.name}
                                            style={{ width: 24, height: 24, marginRight: 8, verticalAlign: "middle" }}
                                        />
                                        <b>{coin.name}</b> ({coin.symbol.toUpperCase()}){" "}
                                        <span className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
                                            ${coin.current_price.toLocaleString()} ({coin.price_change_percentage_24h?.toFixed(2)}%)
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <section className="blog-details">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-md-12">
                                    <div className="blog-main">
                                        {/* <ul className="menu-tab menu-on-line">
                                            <li className="listing active" ><h6 className="fs-16">View All</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">Learn &amp; Earn</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">Metaverse</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">Energy</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">NFT</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">Gaming</h6></li> 
                                            <li  className="listing" ><h6 className="fs-16">Music</h6></li>
                                        </ul> */}
                                        {/* Tab menu for desktop */}

                                        <ul className="menu-tab menu-on-line">
                                            {TABS.map(tab => (
                                                <li
                                                    key={tab.value}
                                                    className={`listing${activeTab === tab.value ? " active" : ""}`}
                                                    onClick={() => setActiveTab(tab.value)}
                                                >
                                                    <h6 className="fs-16">{tab.label}</h6>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Tab menu for mobile */}
                                        <select
                                            className="menu-tab-mobile"
                                            value={activeTab}
                                            onChange={e => setActiveTab(e.target.value)}
                                        >
                                            {TABS.map(tab => (
                                                <option key={tab.value} value={tab.value}>{tab.label}</option>
                                            ))}
                                        </select>
                                        
                                        {/* <div className="meta">
                                            <Link href="#" className="category btn-action">learn &amp; earn</Link>
                                            <div className="meta-info">
                                                <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                <Link href="#" className="time">Feb 03, 2021</Link>
                                            </div>
                                        </div> */}
                                        <div className="content">
                                            
                                           
                                            <div className="box-image trigger-full-w">
                                                <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                <div className="wrap-video">
                                                    {/* <VideoPopup /> */}
                                                </div>
                                            </div>
                                            <div className="heading-title-main">
                                                <h3 className="title">
                                                    Virtual Land in the Metaverse Is Selling for Millions of Dollars
                                                </h3>
                                            </div>
                                            
                                           
                                        <div className="content-tab">
                                                <div className="content-inner row div-duoc-xem-nhieu" > 
                                                    <div className="col-md-4">
                                                        <div className="blog-box">
                                                            <div className="box-image">
                                                                <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                                <div className="wrap-video">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="box-content title-news-duoc-xem-nhieu">
                                                                {/* <Link href="#" className="category btn-action">learn &amp; earn</Link> */}
                                                                <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                                {/* <div className="meta">
                                                                    <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                                    <Link href="#" className="time">Feb 03, 2021</Link>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="blog-box">
                                                            <div className="box-image">
                                                                <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                                <div className="wrap-video">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="box-content title-news-duoc-xem-nhieu">
                                                                {/* <Link href="#" className="category btn-action">learn &amp; earn</Link> */}
                                                                <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                                {/* <div className="meta">
                                                                    <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                                    <Link href="#" className="time">Feb 03, 2021</Link>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="blog-box">
                                                            <div className="box-image">
                                                                <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                                <div className="wrap-video">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="box-content title-news-duoc-xem-nhieu">
                                                                {/* <Link href="#" className="category btn-action">learn &amp; earn</Link> */}
                                                                <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                                {/* <div className="meta">
                                                                    <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                                    <Link href="#" className="time">Feb 03, 2021</Link>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>                                           
                                                    <div className="col-md-4 mobile-only">
                                                        <div className="blog-box">
                                                            <div className="box-image">
                                                                <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                                <div className="wrap-video">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="box-content title-news-duoc-xem-nhieu">
                                                                {/* <Link href="#" className="category btn-action">learn &amp; earn</Link> */}
                                                                <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                                {/* <div className="meta">
                                                                    <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                                    <Link href="#" className="time">Feb 03, 2021</Link>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>                                           
                                                </div>
                                                

                                                {/* Được xem nhiều nhất - Lorem ipsum */}
                                                {/* <div className="col-md-12">
                                                    <div className="button-loadmore watch-more-btn">
                                                        <Link href="#">
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>

                                        {/* <div className="details-bottom">
                                            <div className="tags">
                                                <h6>Tags:</h6>
                                                <ul>
                                                    <li><Link href="/blog-grid-v1">Metaverse</Link></li>
                                                    <li><Link href="/blog-grid-v1">NFT Marketplace</Link></li>
                                                    <li><Link href="/blog-grid-v1">Virtual Land</Link></li>
                                                </ul>
                                            </div>
                                            <div className="share">
                                                <h6>Share:</h6>
                                                <ul>
                                                    <li>
                                                        <Link href="#"><i className="fa-brands fa-facebook-f" /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#"><i className="fa-brands fa-instagram" /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#"><i className="fa-brands fa-youtube" /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#"><i className="fa-brands fa-twitter" /></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                                        
                                    </div>
                                </div>

                                <div className="container-xem-them-btn-mobile-only">
                                    <div className="xem-them-btn-mobile-only">
                                        <Link href="#">
                                            Xem thêm
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-12">
                                    <div className="sidebar">
                                        <div className="widget recent mt-0">
                                            <h6 className="heading">Tin nóng</h6>
                                            
                                            <ul className="tin-nong">
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        {/* <Link href="#" className="category">LEARN &amp; EARN</Link> */}
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* <div className="widget tags">
                                            <h6 className="heading">Popular tags</h6>
                                            <ul>
                                                <li><Link href="/blog-grid-v1">Crypto</Link></li>
                                                <li><Link href="/blog-grid-v1">Virtual Land</Link></li>
                                                <li><Link href="/blog-grid-v1">Metaverse</Link></li>
                                                <li><Link href="/blog-grid-v1">NFT Marketplace</Link></li>
                                                <li><Link href="/blog-grid-v1">Token</Link></li>
                                                <li><Link href="/blog-grid-v1">NFTs</Link></li>
                                                <li><Link href="/blog-grid-v1">Bitcoin</Link></li>
                                                <li><Link href="/blog-grid-v1">Arts</Link></li>
                                                <li><Link href="/blog-grid-v1">Wallet</Link></li>
                                            </ul>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <section className="section-sale">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="block-text">
                                        <h4 className="heading">Earn up to $25 worth of crypto</h4>
                                        <p className="desc">
                                            Discover how specific cryptocurrencies work — and get a bit of
                                            each crypto to try out for yourself.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="button">
                                        <Link href="#">Create Account</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}

                    

                    <section className="duoc-xem-nhieu col-md-12">
                        <div className="title-container">
                            <h5>Được xem nhiều</h5>
                        </div>
                                            <div className="content-inner row div-duoc-xem-nhieu" > 
                                                <div className="col-md-4">
                                                    <div className="blog-box">
                                                        <div className="box-image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                            <div className="wrap-video">
                                                                 
                                                            </div>
                                                        </div>
                                                        <div className="box-content title-news-duoc-xem-nhieu">
                                                            {/* <Link href="#" className="category btn-action">learn &amp; earn</Link> */}
                                                            <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                            {/* <div className="meta">
                                                                <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                                <Link href="#" className="time">Feb 03, 2021</Link>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="blog-box">
                                                        <div className="box-image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                            <div className="wrap-video">
                                                                 
                                                            </div>
                                                        </div>
                                                        <div className="box-content title-news-duoc-xem-nhieu">
                                                            {/* <Link href="#" className="category btn-action">learn &amp; earn</Link> */}
                                                            <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                            {/* <div className="meta">
                                                                <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                                <Link href="#" className="time">Feb 03, 2021</Link>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="blog-box">
                                                        <div className="box-image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                            <div className="wrap-video">
                                                                 
                                                            </div>
                                                        </div>
                                                        <div className="box-content title-news-duoc-xem-nhieu">
                                                            {/* <Link href="#" className="category btn-action">learn &amp; earn</Link> */}
                                                            <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                            {/* <div className="meta">
                                                                <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                                <Link href="#" className="time">Feb 03, 2021</Link>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                              
                                                <div className="col-md-12">
                                                    <div className="button-loadmore">
                                                        <Link href="#" className="btn-action">
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                    </section>

            </Layout>
        </>
    )
}