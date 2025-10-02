'use client'
import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import './style.css';
import styles from '../kien-thuc-tong-quan/knowledge.module.css';
import { useParams } from "next/navigation"

export default function SuKienAlt() {
    const TABS = [
        { label: "Tất cả", value: "all" },
        { label: "Đang diễn ra", value: "happening" },
        { label: "Sắp diễn ra", value: "will" },
        { label: "Đã kết thúc", value: "ended" }
    ];

    const [flatTabs, setFlatTabs] = useState(1);
    const [activeTab, setActiveTab] = useState("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(TABS[0].value);
    const { id } = useParams();
    const [news, setNews] = useState([]);
    const [hotNews, setHotNews] = useState([]);

    const handleFlatTabs = (index) => {
        setFlatTabs(index)
    }
    useEffect(() => {
        document.title = "Sự kiện"
    }, []);

    useEffect(() => {
        // Lấy danh sách event từ API
        fetch('/api/joined_events')
            .then(res => res.json())
            .then(data => setNews(Array.isArray(data.data) ? data.data : []))
    }, []);

    // useEffect(() => {
    //     if (!id) return;
    //     setLoading(true);
    //     fetch(`/api/joined_events/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setNews(data);
    //             setLoading(false);
    //         })
    //         .catch(() => setLoading(false));
    //     // Fetch danh sách tin nóng
    //     fetch('/api/joined_events?hot=1')
    //         .then(res => res.json())
    //         .then(data => setHotNews(data));
    // }, [id]);

    useEffect(() => {
        fetch('/api/joined_events?hot=1')
            .then(res => res.json())
            .then(data => setHotNews(data));
    }, []);

        const today = new Date();
        const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const filteredNews = news.filter(item => {
            const eventDate = new Date(item.time_event);
            const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            if (activeTab === "all") return true;
            if (activeTab === "happening") return eventDay.getTime() === todayDay.getTime();
            if (activeTab === "will") return eventDay.getTime() > todayDay.getTime();
            if (activeTab === "ended") return eventDay.getTime() < todayDay.getTime();
            return true;
        });
    console.log(news)
    return (
        <>

            <Layout headerStyle={1} footerStyle={2} >
                <div>
                    <section className="section-news-header">
                        <div className="news-header-container">
                            <h1 className="news-title">Trung tâm <span className="gradient-text">sự kiện Nivex</span></h1>
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
                    <section className="blog-grid su-kien-tg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
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
                                    <div className="flat-tabs">
                                        <h2 className="cung-nivex-heading">Nivex tham gia <span className="gradient-text">sự kiện toàn cầu</span></h2>
                                        <div className="content-tab">
                                            <div className="content-inner row" style={{ display: `${flatTabs === 1 ? "flex" : "none"}` }}>
                                                {filteredNews.length === 0 ? (
                                                    <div className="col-md-12">
                                                        <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                                                            Không có dữ liệu
                                                        </p>
                                                    </div>
                                                ) : (
                                                    filteredNews.map(item => {
                                                        const eventDate = new Date(item.time_event);
                                                        const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
                                                        let statusText = "";
                                                        if (eventDay.getTime() === todayDay.getTime()) {
                                                            statusText = "Đang diễn ra";
                                                        } else if (eventDay.getTime() > todayDay.getTime()) {
                                                            statusText = "Sắp diễn ra";
                                                        } else {
                                                            statusText = "Đã kết thúc";
                                                        }
                                                        return (
                                                            <div className="col-md-6" key={item.id}>
                                                                <div className="blog-box">
                                                                    <div className="tag-status">
                                                                        <p>{item.type || "Online"}</p>
                                                                    </div>
                                                                    <div className="box-image">
                                                                        <img src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt="" />
                                                                    </div>
                                                                    <div className="box-content">
                                                                        <div>
                                                                            <Link href={`/su-kien-tham-gia/${item.id}`} className="title">{item.title}</Link>
                                                                            <p className="text-desc-su-kien">{item.short_desc}</p>
                                                                        </div>
                                                                        <div className="event-meta-row">
                                                                            <div className="event-meta-info">
                                                                                <div className="event-time-date">
                                                                                    <span className="event-time">{item.time_from_and_to || "Unknown"}</span>
                                                                                    <span className="event-date">{eventDate.toLocaleDateString("vi-VN")}</span>
                                                                                </div>
                                                                                <div className="event-tags">
                                                                                    <span>{item.tag1 || "Hợp đồng"}</span>
                                                                                    <span>{item.tag2 || "Spot"}</span>
                                                                                    <span>{item.tag3 || "CopyTrade"}</span>
                                                                                </div>
                                                                            </div>
                                                                            <Link href={`/su-kien-tham-gia/${item.id}`} className="event-btn">Xem thêm</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                                {/* <div className="col-md-6">
                                                    <div className="blog-box" >
                                                        <div className="tag-status">
                                                            <p>Online</p>
                                                        </div>
                                                        <div className="box-image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                        <div className="box-content">
                                                            <div>
                                                                <Link href="#" className="title">Nivex Dẫn Dắt Tương Lai Giao Dịch AI tại PopMax Summit 2025</Link>
                                                                <p className="text-desc-su-kien">Tháng 9/2025, sự kiện blockchain quốc tế PopMax Summit tại Bali đã chứng kiến sự hiện diện của Nivex - sàn giao dịch tiên phong ứng dụng Trí tuệ nhân tạo (AI) vào giao dịch crypto.</p>
                                                            </div>
                                                            <div className="event-meta-row">
                                                                <div className="event-meta-info">
                                                                    <div className="event-time-date">
                                                                        <span className="event-time">15:00 – 16:30</span>
                                                                        <span className="event-date">06/09/2025</span>
                                                                    </div>
                                                                    <div className="event-tags">
                                                                        <span>Hợp đồng</span>
                                                                        <span>Spot</span>
                                                                        <span>CopyTrade</span>
                                                                    </div>
                                                                </div>
                                                                <a href="#" className="event-btn">Xem thêm</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="blog-box">
                                                        <div className="tag-status">
                                                            <p>Online</p>
                                                        </div>
                                                        <div className="box-image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                        <div className="box-content">
                                                            <div>
                                                                <Link href="#" className="title">Nivex Dẫn Dắt Tương Lai Giao Dịch AI tại PopMax Summit 2025</Link>
                                                                <p className="text-desc-su-kien">Tháng 9/2025, sự kiện blockchain quốc tế PopMax Summit tại Bali đã chứng kiến sự hiện diện của Nivex - sàn giao dịch tiên phong ứng dụng Trí tuệ nhân tạo (AI) vào giao dịch crypto.</p>
                                                            </div>
                                                            <div className="event-meta-row">
                                                                <div className="event-meta-info">
                                                                    <div className="event-time-date">
                                                                        <span className="event-time">15:00 – 16:30</span>
                                                                        <span className="event-date">06/09/2025</span>
                                                                    </div>
                                                                    <div className="event-tags">
                                                                        <span>Hợp đồng</span>
                                                                        <span>Spot</span>
                                                                        <span>CopyTrade</span>
                                                                    </div>
                                                                </div>
                                                                <a href="#" className="event-btn">Xem thêm</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="blog-box">
                                                        <div className="tag-status">
                                                            <p>Online</p>
                                                        </div>
                                                        <div className="box-image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                        <div className="box-content">
                                                            <div>
                                                                <Link href="#" className="title">Nivex Dẫn Dắt Tương Lai Giao Dịch AI tại PopMax Summit 2025</Link>
                                                                <p className="text-desc-su-kien">Tháng 9/2025, sự kiện blockchain quốc tế PopMax Summit tại Bali đã chứng kiến sự hiện diện của Nivex - sàn giao dịch tiên phong ứng dụng Trí tuệ nhân tạo (AI) vào giao dịch crypto.</p>
                                                            </div>
                                                            <div className="event-meta-row">
                                                                <div className="event-meta-info">
                                                                    <div className="event-time-date">
                                                                        <span className="event-time">15:00 – 16:30</span>
                                                                        <span className="event-date">06/09/2025</span>
                                                                    </div>
                                                                    <div className="event-tags">
                                                                        <span>Hợp đồng</span>
                                                                        <span>Spot</span>
                                                                        <span>CopyTrade</span>
                                                                    </div>
                                                                </div>
                                                                <a href="#" className="event-btn">Xem thêm</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="blog-box">
                                                        <div className="tag-status">
                                                            <p>Online</p>
                                                        </div>
                                                        <div className="box-image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                            
                                                        </div>
                                                        <div className="box-content">
                                                            <div>
                                                                <Link href="#" className="title">Nivex Dẫn Dắt Tương Lai Giao Dịch AI tại PopMax Summit 2025</Link>
                                                                <p className="text-desc-su-kien">Tháng 9/2025, sự kiện blockchain quốc tế PopMax Summit tại Bali đã chứng kiến sự hiện diện của Nivex - sàn giao dịch tiên phong ứng dụng Trí tuệ nhân tạo (AI) vào giao dịch crypto.</p>
                                                            </div>
                                                            <div className="event-meta-row">
                                                                <div className="event-meta-info">
                                                                    <div className="event-time-date">
                                                                        <span className="event-time">15:00 – 16:30</span>
                                                                        <span className="event-date">06/09/2025</span>
                                                                    </div>
                                                                    <div className="event-tags">
                                                                        <span>Hợp đồng</span>
                                                                        <span>Spot</span>
                                                                        <span>CopyTrade</span>
                                                                    </div>
                                                                </div>
                                                                <a href="#" className="event-btn">Xem thêm</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                  
                </div>

            </Layout>
        </>
    )
}