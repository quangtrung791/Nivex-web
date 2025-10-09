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
    const [ searchQuery, setSearchQuery ] = useState("");

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
            .catch(() => setNews([]));
    }, []);


    // Hàm xử lý sau khi submit form search
    const handleSearch = (e) => {
        e.preventDefault();
    };

    // useEffect(() => {
    //     fetch('/api/joined_events?hot=1')
    //         .then(res => res.json())
    //         .then(data => setHotNews(data));
    // }, []);
    // useEffect(() => {
    //     fetch('/api/joined_events?hot=1')
    //         .then(res => res.json())
    //         .then(data => setHotNews(data))
    //         .catch(() => setHotNews([]));
    // }, []);

    // Helper: chuẩn hóa chuỗi để so sánh (lowercase + bỏ dấu)
    const normalizeString = (str = "") => {
        return String(str)
            .toLowerCase()
            .normalize('NFD')                // tách ký tự và dấu
            .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
            .trim();
    };


        const today = new Date();
        const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Lọc theo tab + từ khóa tìm kiếm (title hoặc short_desc)
        const filteredNews = news.filter(item => {
            const eventDate = new Date(item.time_event);
            const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            let tabMatch = true;

            // if (activeTab === "all") return true;
            // if (activeTab === "happening") return eventDay.getTime() === todayDay.getTime();
            // if (activeTab === "will") return eventDay.getTime() > todayDay.getTime();
            // if (activeTab === "ended") return eventDay.getTime() < todayDay.getTime();
            if (activeTab === "happening") tabMatch = eventDay.getTime() === todayDay.getTime();
            else if (activeTab === "will") tabMatch = eventDay.getTime() > todayDay.getTime();
            else if (activeTab === "ended") tabMatch = eventDay.getTime() < todayDay.getTime();

            if (!tabMatch) return false;

            // return true;
            // nếu không có từ khóa thì giữ lại
            const q = normalizeString(searchQuery);
            if (!q) return true;

            // kiểm tra title / short_desc (bỏ dấu)
            const title = normalizeString(item.title || "");
            const desc = normalizeString(item.short_desc || "");

            return title.includes(q) || desc.includes(q);
        });
    //console.log(news)
    return (
        <>
            {/* <Layout headerStyle={1} footerStyle={2} > */}
                <div>
                    <section className="section-news-header">
                        <div className="news-header-container">
                            <h1 className="news-title">Trung tâm <span className="gradient-text">sự kiện Nivex</span></h1>
                            <form className="news-search-form" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    className="news-search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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
                                    <div className="flat-tabs">
                                        <h2 className="cung-nivex-heading">Nivex tham gia <span className="gradient-text">sự kiện toàn cầu</span></h2>
                                        <div className="content-tab">
                                            <div className="content-inner row" style={{ display: `${flatTabs === 1 ? "flex" : "none"}` }}>
                                                {filteredNews.length === 0 ? (
                                                    <div className="col-md-12">
                                                        <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                                                            Đang tải dữ liệu
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
                                                                            <Link href={`/su-kien-tham-gia/${item.id}`} className="event-btn btn-action">Xem thêm</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                             
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                  
                </div>

            {/* </Layout> */}
        </>
    )
}