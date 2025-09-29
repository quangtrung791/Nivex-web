
"use client";
// import VideoPopup from "@/components/elements/VideoPopup"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import './style.css';
import styles from '../kien-thuc-tong-quan/knowledge.module.css'
import { usePathname } from "next/navigation";


const COINS = [
    { id: "solana", symbol: "SOL", name: "Solana" },
    { id: "ripple", symbol: "XRP", name: "XRP" },
    { id: "ethereum", symbol: "ETH", name: "Ethereum" },
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
    { id: "litecoin", symbol: "LTC", name: "Litecoin" },
    { id: "shiba-inu", symbol: "SHIB", name: "Shiba Inu" }
];
const TABS = [
    { label: "Tất cả", value: "all" },
    { label: "Metaverse", value: "learn" },
    { label: "Giải trí", value: "metaverse" },
    { label: "Năng lượng", value: "energy" },
    { label: "NFT", value: "nft" },
    { label: "Trò chơi", value: "gaming" },
    { label: "Âm nhạc", value: "music" }
];

export default function BlogDetails() {
    const [coinData, setCoinData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [showMobileTabs, setShowMobileTabs] = useState(false);
    const [activeCategory, setActiveCategory] = useState('blockchain')
    const [activeDifficulty, setActiveDifficulty] = useState('easy')
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(TABS[0].value);
    const [categories, setCategories] = useState([]);
    const [news, setNews] = useState([]);
    const [hotNews, setHotNews] = useState([]);
    const { id } = useParams()
    const pathname = usePathname();

    
    useEffect(() => {
        document.title = "Tin tức"
    }, []);
    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.map(c => c.id).join(",")}`
        )
            .then(res => res.json())
            .then(data => setCoinData(data));
    }, []);


    // useEffect(() => {
    //     // Lấy danh mục từ API
    //     fetch('/api/category_news')
    //         .then(res => res.json())
    //         .then(data => {
    //             // data là mảng [{ id, name }]
    //             setCategories([
    //                 { label: "Tất cả", value: "all" }, 
    //                 ...data.map(cat => ({
    //                     label: cat.name,
    //                     value: cat.id
    //                 }))
    //             ])
    //         })
    // }, []);

    useEffect(() => {
        // Lấy danh mục từ API
        fetch('/api/category_news')
            .then(res => res.json())
            .then(data => {
                // data.data là mảng [{ id, name }]
                setCategories([
                    { label: "Tất cả", value: "all" }, // Thêm tab "Tất cả"
                    ...(Array.isArray(data.data) ? data.data.map(cat => ({
                        label: cat.name,
                        value: cat.id
                    })) : [])
                ])
            })
    }, []);

    useEffect(() => {
        // Lấy danh sách bài viết từ API
        fetch('/api/news')
            .then(res => res.json())
            .then(data => setNews(Array.isArray(data.data) ? data.data : []))
    }, []);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/news/${id}`)
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
        // Fetch danh sách tin nóng
        fetch('/api/news?hot=1')
            .then(res => res.json())
            .then(data => setHotNews(data));
    }, [id]);

    useEffect(() => {
        fetch('/api/news?hot=1')
            .then(res => res.json())
            .then(data => setHotNews(data));
    }, []);

    const filteredNews = activeTab === "all"
    ? news
    : news.filter(item => String(item.category_id) === String(activeTab));
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
                                        {/* Tab menu for desktop */}

                                        <ul className="menu-tab menu-on-line">
                                            {categories.map(tab => (
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
                                       
                                        <div className={styles.mobileDropdown} style={{ width: "30%" }}>
                                            <div
                                                className={styles.mobileDropdownInnerFlex}
                                                onClick={() => setIsDropdownOpen((v) => !v)}
                                                tabIndex={0}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <button
                                                    type="button"
                                                    className={styles.dropdownToggle}
                                                    aria-expanded={isDropdownOpen}
                                                    aria-haspopup="listbox"
                                                    style={{
                                                        background: selectedTab === "all" ? "linear-gradient(90deg, #BCFE08, #86F969)" : undefined,
                                                        color: "#111",
                                                        fontWeight: "bold",
                                                        border: "none",
                                                        borderRadius: 4,
                                                        padding: "10px 16px",
                                                        minWidth: 100,
                                                        textAlign: "left",
                                                        width: "100%"
                                                    }}
                                                >
                                                    {TABS.find((t) => t.value === selectedTab)?.label}
                                                </button>
                                                <span className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.open : ''}`}>
                                                    <svg width="18" height="18" style={{ marginLeft: 8, verticalAlign: "middle" }} viewBox="0 0 20 20">
                                                        <polyline points="5 8 10 13 15 8" fill="none" stroke="#111" strokeWidth="2"/>
                                                    </svg>
                                                </span>
                                            </div>
                                            {isDropdownOpen && (
                                                <ul className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`} role="listbox"
                                                    style={{
                                                        position: "absolute",
                                                        marginTop: 4,
                                                        background: "#181818",
                                                        borderRadius: 6,
                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                                        zIndex: 10,
                                                        minWidth: 120,
                                                        padding: 0,
                                                        listStyle: "none",
                                                        width: "50%"
                                                    }}
                                                >
                                                    {TABS.map((tab) => (
                                                        <li
                                                            key={tab.value}
                                                            role="option"
                                                            aria-selected={selectedTab === tab.value}
                                                            className={`${styles.categoryMenuItem} ${selectedTab === tab.value ? styles.active : ''}`}
                                                            onClick={() => {
                                                                setSelectedTab(tab.value);
                                                                setIsDropdownOpen(false);
                                                                setActiveTab(tab.value); // Nếu muốn đồng bộ với tab hiện tại
                                                            }}
                                                            style={{
                                                                padding: "10px 16px",
                                                                cursor: "pointer",
                                                                background: selectedTab === tab.value ? "linear-gradient(90deg, #BCFE08, #86F969)" : "transparent",
                                                                color: selectedTab === tab.value ? "#111" : "#fff",
                                                                fontWeight: selectedTab === tab.value ? "bold" : "normal",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            {tab.label}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        
                                        <div className="content">
                                            {news[0] && (
                                                <div className="box-image trigger-full-w">
                                                    <img src={news[0].thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={news[0].title} />
                                                    <div className="wrap-video">
                                                        {/* <VideoPopup /> */}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {news[0] && (
                                                    <div className="heading-title-main">
                                                        <Link href={`/tin-tuc/${news[0].id}`}>
                                                            <h3 className="tin-tuc">
                                                                {news[0].title}
                                                            </h3>
                                                        </Link>
                                                    </div>
                                            )}
                                            
                                           
                                        <div className="content-tab">
                                                <div className="content-inner row div-duoc-xem-nhieu">
                                                    {filteredNews.length === 0 ? (
                                                        <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                                                            Không có dữ liệu
                                                        </p>
                                                    ) : filteredNews.slice(0, 3).map(item => (
                                                        <div className="col-md-4" key={item.id}>
                                                            <div className="blog-box">
                                                                <div className="box-image">
                                                                    <img src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                    <div className="wrap-video"></div>
                                                                </div>
                                                                <div className="box-content title-news-duoc-xem-nhieu">
                                                                    <Link href={`/tin-tuc/${item.id}`} className="title-news">{item.title}</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                        
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
    {news.slice(0, 10).map(item => (
        <li key={item.id}>
            <div style={{ display: 'block' }}>
                <p className="time-stamp-p">
                    {item.time_upload
                        ? new Date(item.time_upload).toLocaleString('vi-VN', { hour12: false })
                        : ''}
                </p>
                <div className="image">
                    <img src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                </div>
            </div>
            <div className="content">
                {/* <Link href="#" className="category">{item.category_name}</Link> */}
                <Link href={`/tin-tuc/${item.id}`} className="title navigate-child-news">
                    {item.title}
                </Link>
            </div>
        </li>
    ))}
</ul>
                                        </div>


                                        <div className="sidebar-bottom-fade" />
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
                                            <div className="content-inner row div-duoc-xem-nhieu">
                                                {Array.isArray(news) && news.slice(0, 3).map(item => (
                                                    <div className="col-md-4" key={item.id}>
                                                        <div className="blog-box">
                                                            <div className="box-image">
                                                                <img src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                <div className="wrap-video"></div>
                                                            </div>
                                                            <div className="box-content title-news-duoc-xem-nhieu">
                                                                <Link href={`/tin-tuc/${item.id}`} className="title">{item.title}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="col-md-12">
                                                    <div className="button-loadmore">
                                                        <Link href="/tin-tuc" className="btn-action">
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