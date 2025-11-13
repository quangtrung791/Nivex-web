
"use client";
// import VideoPopup from "@/components/elements/VideoPopup"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link"
import styles2 from './BlogDetails.module.css';
import styles from '../kien-thuc-tong-quan/knowledge.module.css'
import NewsFlashNotifier from './NewsFlashNotifier';

const COINS = [
    { id: "solana", symbol: "SOL", name: "Solana" },
    { id: "ripple", symbol: "XRP", name: "XRP" },
    { id: "ethereum", symbol: "ETH", name: "Ethereum" },
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
    { id: "litecoin", symbol: "LTC", name: "Litecoin" },
    // { id: "shiba-inu", symbol: "SHIB", name: "Shiba Inu" },
];
const TABS = [
    { label: "Tin chính", value: "all" },
    { label: "Tin nhanh", value: "tin-nhanh" }
];

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export default function TinTucComponent() {
    const [coinData, setCoinData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(TABS[0].value);
    const [categories, setCategories] = useState([]);
    const [news, setNews] = useState([]);
    const [newsFlash, setNewsFlash] = useState([]); // Dữ liệu cho tab Tin nhanh
    const [mostViewedNews, setMostViewedNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [hero, setHero] = useState(null);

    const [visibleCount, setVisibleCount] = useState(3);

    const titleRef = useRef(null);
    // const [titleLines, setTitleLines] = useState(1);
    const [titleTop, setTitleTop] = useState(-10);

    useEffect(() => {
        if (titleRef.current) {
            const lineHeight = parseFloat(getComputedStyle(titleRef.current).lineHeight);
            const height = titleRef.current.offsetHeight;
            const lines = Math.round(height / lineHeight);
            // setTitleLines(lines);

            const width = window.innerWidth;
            if (width >= 1440 && width < 1920) {
                setTitleTop(lines === 1 ? 20 : -10);
            } else if (width >= 1920) {
                setTitleTop(lines === 1 ? 30 : -10);
            } else if (width <= 600) {
                setTitleTop(lines === 1 ? 30 : -80);
            }
            else {
                setTitleTop(-10);
            }
        }
    }, [hero?.title]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 900) {
                setVisibleCount(3);
            } else {
                setVisibleCount(4);
            }
        }
        handleResize(); // Gọi khi mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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

    // Hàm xử lý sau khi submit form search
    const handleSearch = (e) => {
        e.preventDefault();
    };

    // Helper: chuẩn hóa chuỗi để so sánh (lowercase + bỏ dấu)
    const normalizeString = (str = "") => {
        return String(str)
            .toLowerCase()
            .normalize('NFD')                // tách ký tự và dấu
            .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
            .trim();
    };

    useEffect(() => {
        // Chỉ set 2 tabs: Tin chính và Tin nhanh
        setCategories(TABS);
      }, []);
      

    useEffect(() => {
        const url = new URL(`${WP_BASE}/news`);
        url.searchParams.set('status', 'active');
        url.searchParams.set('page', '1');
        url.searchParams.set('per_page', '20');

        fetch(url.toString(), { cache: 'no-store' })
            .then(res => res.json())
            .then(json => {
            const arr = Array.isArray(json?.data) ? json.data : [];
            const mapped = arr.map(n => ({
                id: n.id,
                slug: n.slug,
                title: n.title,
                category_id: n.category_id ?? null,
                time_upload: n.time_upload,
                created_at: n.created_at,
                updated_at: n.updated_at,
                thumbnail_url: n.thumbnail_url || 'https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp',
                is_featured: n.is_featured,
                is_hot: n.is_hot || 0,
            }));

            setNews(mapped.slice(1)); 

            const featured = mapped
                .filter(n => n.is_featured);
                // .sort((a,b) => new Date(b.time_upload || b.created_at) - new Date(a.time_upload || a.created_at));
            setHero(featured[0] || mapped[0]);
            
            })
            .catch(() => {
                setNews([]);
                setHero(null);
            });
    }, []);

    // Fetch dữ liệu news_flash cho tab Tin nhanh
    useEffect(() => {
        const url = new URL(`${WP_BASE}/news_flash`);
        url.searchParams.set('status', 'active');
        url.searchParams.set('page', '1');
        url.searchParams.set('per_page', '35');

        fetch(url.toString(), { cache: 'no-store' })
            .then(res => res.json())
            .then(json => {
                const arr = Array.isArray(json?.data) ? json.data : [];
                const mapped = arr.map(n => ({
                    id: n.id,
                    slug: n.slug,
                    title: n.title,
                    content: n.content,
                    time_upload: n.time_upload,
                    created_at: n.created_at,
                    updated_at: n.updated_at,
                    thumbnail_url: n.thumbnail_url,
                    is_hot: n.is_hot || 0,
                }));
                setNewsFlash(mapped);
            })
            .catch(() => {
                setNewsFlash([]);
            });
    }, []);


    useEffect(() => {
        const url = new URL(`${WP_BASE}/news`);
        url.searchParams.set('status', 'active');
        url.searchParams.set('page', '1');
        url.searchParams.set('per_page', '10');
        url.searchParams.set('sort', 'view');

        fetch(url.toString(), { cache: 'no-store' })
            .then(res => res.json())
            .then(json => {
            setMostViewedNews(Array.isArray(json?.data) ? json.data : []);
            })
            .catch(() => setMostViewedNews([]));
    }, []);

    // chuẩn hóa query 1 lần để tiết kiệm hiệu năng
    const q = normalizeString(searchQuery);

    // Filter cho tab "Tin chính" - dùng dữ liệu từ news (bảng news)
    // const filteredNews = news
    //     .filter(item => !hero || item.id !== hero.id)
    //     .filter(item => {
    //         // Lọc theo danh mục
    //         let tabMatch = activeTab === "all" ? true : String(item.category_id) === String(activeTab);
    //         if (!tabMatch) return false;
            
    //         // Lọc theo từ khóa (nếu có)
    //         if (!q) return true;
    //         const title = normalizeString(item.title || "");
    //         const desc = normalizeString(item.short_desc || "");
    //         return title.includes(q) || desc.includes(q);
    //     });

    // Filter cho tab "Tin nhanh" - dùng dữ liệu từ newsFlash (bảng news_flash)
    // const filteredNewsFlash = newsFlash.filter(item => {
    //     // Lọc theo từ khóa (nếu có)
    //     if (!q) return true;
    //     const title = normalizeString(item.title || "");
    //     const desc = normalizeString(item.content || "");
    //     return title.includes(q) || desc.includes(q);
    // });

    return (
        <>
            <section className={`${styles2.sectionNewsHeader}`}>
                <div className={`${styles2.newsHeaderContainer}`}>
                    <h1 className={`${styles2.newsTitle}`}>Tin tức</h1>
                    <form className={`${styles2.newsSearchForm}`} onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className={`${styles2.newsSearchInput}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className={`${styles2.newsSearchBtn}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" stroke="#222" strokeWidth="2" fill="none" />
                                <line x1="17" y1="17" x2="22" y2="22" stroke="#222" strokeWidth="2" />
                            </svg>
                        </button>
                    </form>
                </div>
            </section>
            {/* coin list */}
            <div className={`${styles2.coinListContainerC}`}>
                <div className={`${styles2.coinListMarquee}`}>
                    <div className={`${styles2.coinListC}`}>
                        {coinData.concat(coinData).map((coin, idx) => (
                            <span className={`${styles2.coin}`} key={idx}>
                                <img
                                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id === "ripple" ? 52 : coin.id === "solana" ? 5426 : coin.id === "ethereum" ? 1027 : coin.id === "bitcoin" ? 1 : coin.id === "litecoin" ? 2 : coin.id === "shiba-inu" ? 5994 : ""}.png`}
                                    alt={coin.name}
                                    style={{ width: 24, height: 24, marginRight: 8, verticalAlign: "middle" }}
                                />
                                <b>{coin.name}</b> ({coin.symbol.toUpperCase()}){" "}
                                
                                <span className={coin.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                                    ${coin.current_price.toLocaleString()} ({coin.price_change_percentage_24h?.toFixed(2)}%)
                                </span>

                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <section className={`blog-details ${styles2.blogDetails} ${styles2.ttuc}`}>
                <div className="container">
                    <div className={`row ${styles2.row}`}>
                        <div className={`col-xl-8 col-md-12 ${styles2.colXl8} ${styles2.colMd12}`}>
                            <div className={`blog-main ${styles2.blogMain}`}>
                                {/* Tab menu for desktop */}

                                <ul className={`menu-tab ${styles2.menuTab} ${styles2.menuOnLine}`}>
                                    {categories.map(tab => (
                                        <li
                                            key={tab.value}
                                            className={`listing ${styles2.listing} ${activeTab === tab.value ? `${styles2.active} active` : ""}`}
                                            onClick={() => setActiveTab(tab.value)}
                                        >
                                            <h6 className={`fs-16 ${styles2.fs16}`}>{tab.label}</h6>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tab menu for mobile */}
                                <div className={styles.mobileDropdown + " " + styles2.mobileDropdownNewsComponent}>
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
                                                background: selectedTab === "all" || selectedTab === "tin-nhanh" ? "linear-gradient(90deg, #BCFE08, #86F969)" : undefined,
                                                color: "#111",
                                                fontWeight: "bold",
                                                border: "none",
                                                borderRadius: 25,
                                                padding: "9px 16px",
                                                minWidth: 100,
                                                textAlign: "left",
                                                width: "100%"
                                            }}
                                        >
                                            {categories.find((t) => t.value === selectedTab)?.label || "Tin chính"}
                                        </button>
                                        <span className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.open : ''}`}>
                                            <svg width="18" height="18" style={{ marginLeft: 8, verticalAlign: "middle" }} viewBox="0 0 20 20">
                                                <polyline points="5 8 10 13 15 8" fill="none" stroke="#111" strokeWidth="2" />
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
                                            {categories.map((tab) => (
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

                                {activeTab !== "tin-nhanh" && (
                                    <div className={`content ${styles2.content} ${styles2.mostHighlightNewsItemBox}`}>
                                        {hero && (
                                            <Link href={`/tin-tuc/${hero.slug}`}>
                                                <div className={`box-image ${styles2.boxImage} ${styles2.triggerFullW}`}>
                                                    <img className={`${styles2.mostFeaturedNewsHighlight}`} src={hero.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={hero.title} />
                                                    <div className={`${styles2.imageOverlay}`}></div>
                                                </div>
                                            </Link>
                                        )}

                                        {hero && (
                                            <div className={`heading-title-main ${styles2.headingTitleMain}`}>
                                                <Link href={`/tin-tuc/${hero.slug}`}>
                                                    <h3 className={`${styles2.tinTuc} ${styles2.title} ${styles2.mostHighlightTitleNewsH} title`} 
                                                    ref={titleRef} style={{ position:"relative", top:titleTop }}
                                                    >
                                                        {hero.title}
                                                    </h3>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className={`content-tab ${styles2.contentTab}`}>
                                    {activeTab === "tin-nhanh" ? (
                                        // UI Timeline cho Tab Tin nhanh với nhóm theo ngày
                                        <div className={`${styles2.timelineContainer}`}>
                                            {newsFlash.length < 0 ? (
                                                <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                                                    Không có dữ liệu
                                                </p>
                                            ) : (() => {
                                                // Nhóm tin tức theo ngày từ filteredNewsFlash (bảng news_flash)
                                                const groupedByDate = {};
                                                newsFlash.forEach((item) => {
                                                    const date = item.time_upload || item.created_at || new Date().toISOString();
                                                    const dateKey = new Date(date).toLocaleDateString('vi-VN', { 
                                                        year: 'numeric', 
                                                        month: '2-digit', 
                                                        day: '2-digit' 
                                                    });
                                                    
                                                    if (!groupedByDate[dateKey]) {
                                                        groupedByDate[dateKey] = [];
                                                    }
                                                    groupedByDate[dateKey].push(item);
                                                });

                                                // Sắp xếp các ngày từ mới đến cũ
                                                const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
                                                    return new Date(b.split('/').reverse().join('-')) - new Date(a.split('/').reverse().join('-'));
                                                });

                                                return sortedDates.map((dateKey) => (
                                                    <div key={dateKey} className={`${styles2.timelineDateGroup}`}>
                                                        <div className={`${styles2.timelineDateDisplayFlex}`}>
                                                            <div className={`${styles2.timelineDateHeaderDate}`}>{dateKey}</div>
                                                            <div className={`${styles2.timelineDateHeaderLine}`}>Tin nhanh quan trong</div>
                                                        </div>
                                                        {groupedByDate[dateKey].map((item) => (
                                                            <div className={`${styles2.timelineItem}`} key={item.id}>
                                                                <div className={`${styles2.timelineTime}`}>
                                                                    {item.time_upload 
                                                                        ? new Date(item.time_upload).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })
                                                                        : new Date(item.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                </div>
                                                                <Link href={`/tin-nhanh/${item.slug}`} className={`${styles2.timelineContent}`}>
                                                                    <div className={`${styles2.timelineTitleContainerDisplayFlex}`}>
                                                                        {item.is_hot == 1 && (
                                                                            <img 
                                                                                src="https://nivexhub.learningchain.vn/wp-content/uploads/2025/11/Hot_news_flash_post_icon.webp" 
                                                                                alt="Hot" 
                                                                                style={{ 
                                                                                    width: '29px', 
                                                                                    height: '14px', 
                                                                                    marginTop: '3px',
                                                                                    flexShrink: 0
                                                                                }} 
                                                                            />
                                                                        )}
                                                                        <div className={`${styles2.timelineTitle}`}>
                                                                            {item.title}
                                                                        </div>
                                                                    </div>
                                                                    <div className={`${styles2.timelineDescription}`} dangerouslySetInnerHTML={{ __html: item.content }}>
                                                                    </div>
                                                                    <div className={`${styles2.timelineLink}`}>
                                                                        Xem thêm
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    ) : (
                                        // UI Grid cho Tab Tin chính - dùng filteredNews từ bảng news
                                        <div className={`content-inner row ${styles2.contentInner} ${styles2.row} ${styles2.divDuocXemNhieu} ${styles2.modCssNewsAlt}`}>
                                            {news.length < 0 ? (
                                                <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                                                    Không có dữ liệu
                                                </p>
                                            ) : news.slice(0, visibleCount).map(item => (
                                                <div className={`col-md-4 ${styles2.colMd4} ${styles2.level2NewsItemBox}`} key={item.id}>
                                                   <Link href={`/tin-tuc/${item.slug}`} >
                                                        <div className={`${styles2.blogBox}`}>
                                                            <div className={`box-image ${styles2.boxImage}`}>
                                                                <img className={`${styles2.level2NewsImage}`} src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                            </div>
                                                            <div className={`box-content ${styles2.boxContent} ${styles2.titleNewsDuocXemNhieu}`}>
                                                                <div className={`${styles2.titleNews} ${styles2.headlineNews}`} >{item.title}</div>
                                                            </div>
                                                        </div>
                                                   </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`d-flex ${styles2.containerXemThemBtnMobileOnly}`}>
                            <div className={`${styles2.xemThemBtnMobileOnly}`}>
                                <Link className={`${styles2.xemThemBtnAHref}`} href="#">
                                    Xem thêm
                                </Link>
                            </div>
                        </div>

                        <div className={`col-xl-4 col-md-12 ${styles2.ttucTinNongGg} ${styles2.colXl4} ${styles2.colMd12}  ${styles2.cotBenTayPhai}`}>
                            <div className={`${styles2.sidebar}`}>
                                <div className={`widget recent mt-0  ${styles2.widget} ${styles2.recent} ${styles2.mt0}`}>
                                    <h6 className={`${styles2.heading} ${styles2.titleTinNongg12}`}>Tin nổi bật</h6>
                                    <ul className={`${styles2.tinNong} ${styles2.sideLinkRelated}`}>
                                        {(activeTab === "tin-nhanh" 
                                            ? newsFlash.filter(item => item.is_hot == 1)
                                            : news
                                        ).slice(0, 10).map(item => (
                                            <Link href={activeTab === "tin-nhanh" ? `/tin-nhanh/${item.slug}` : `/tin-tuc/${item.slug}`} key={item.id} className={`${styles2.linkHoveringtinNongTitleSimple}`}>
                                                <li className={`${styles2.liHovering} ${activeTab === "tin-nhanh" ? styles2.tinNongSimple : ""}`}>
                                                    {activeTab === "tin-nhanh" ? (
                                                        // Layout đơn giản cho tab Tin nhanh: chỉ thời gian + title
                                                        <>
                                                            <p className={`${styles2.timeStampP}`}>
                                                                {item.time_upload
                                                                    ? new Date(item.time_upload).toLocaleString('vi-VN', { hour12: false })
                                                                    : ''}
                                                            </p>
                                                            <div className={`${styles2.content}`}>
                                                                <div className={`${styles2.title} ${styles2.navigateChildNews} ${styles2.linkHoveringg} ${styles2.sideBannerLinkRelated} ${styles2.tinNongTitleSimple}`}>
                                                                    {item.title}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        // Layout đầy đủ cho tab Tin chính: ảnh + thời gian + title
                                                        <>
                                                            <div style={{ display: 'block' }}>
                                                                <p className={`${styles2.timeStampP}`}>
                                                                    {item.time_upload
                                                                        ? new Date(item.time_upload).toLocaleString('vi-VN', { hour12: false })
                                                                        : ''}
                                                                </p>
                                                                <div className={`${styles2.image}`}>
                                                                    <img className={`${styles2.imageTinLonggg12}`} src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                </div>
                                                            </div>
                                                            <div className={`${styles2.content}`}>
                                                                <div  className={`${styles2.title} ${styles2.navigateChildNews} ${styles2.linkHoveringg} ${styles2.sideBannerLinkRelated}`}>
                                                                    {item.title}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`${styles2.sidebarBottomFade}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           
            <section className={`col-md-12 ${styles2.duocXemNhieu} ${styles2.colMd12} ${styles2.ttucDuocXemNhieu}`}>
                <div className={`${styles2.titleContainer} title-container`}>
                    <h5>Được xem nhiều</h5>
                </div>
                <div className={`row content-inner ${styles.contentInner} ${styles.row} ${styles.divDuocXemNhieu}`}>
                    {Array.isArray(mostViewedNews) && mostViewedNews.slice(0, 3).map(item => (
                        <div className={`${styles2.colMd4} col-md-4`} key={item.id}>
                            <Link href={`/tin-tuc/${item.slug}`} >
                                <div className={`${styles2.blogBox} blog-box ${styles2.blogBoxTinTuc} ${styles2.level3NewsItemBox}`}>
                                    <div className={`${styles2.boxImage} box-image`}>
                                        <img className={`${styles2.level3NewsImage}`} src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                    </div>
                                    <div className={`${styles2.boxContent} ${styles2.titleNewsDuocXemNhieu} box-content title-news-duoc-xem-nhieu`}>
                                        <div className={`${styles2.title} title`}>{item.title}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <div className={`${styles2.colMd12} col-md-12`}>
                        <div className={`${styles2.buttonLoadmore}`}>
                            <Link href="/tin-tuc" className={`btn-action ${styles2.btnAction}`}>
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <NewsFlashNotifier />
        </>
    )
}