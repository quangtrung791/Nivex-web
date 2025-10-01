
'use client'
import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import './style.css'

export default function BlogDetails() {
    const { id } = useParams()
    const [events, setEvents] = useState(null);
    const [hotEvents, setHotEvents] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (events && events.title) {
            document.title = events.title;
        }
    }, [events]);

    useEffect(() => {
        if (!id) return
        setLoading(true)
        fetch(`/api/joined_events/${id}`)
            .then(res => res.json())
            .then(data => {
                setEvents(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id]);

    useEffect(() => {
    if (!id) return;
        setLoading(true);
        fetch(`/api/joined_events/${id}`)
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
        // Fetch danh sách event
        fetch('/api/joined_events?hot=1')
            .then(res => res.json())
            .then(data => setHotEvents(Array.isArray(data.data) ? data.data : []));
    }, [id]);

    if (loading) return 
        <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
            <p>Đang tải dữ liệu...</p>
        </div>
    if (!events) return 
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
            <p>Lỗi kết nối với máy chủ.</p>
        </div>


    return (
        <>
            <Layout headerStyle={1} footerStyle={2} >
                <div>
                    <section className="section-news-header">
                        <div className="news-header-container">
                            <h1 className="news-title">Chi tiết <span className="gradient-text">sự kiện</span></h1>
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

                    <section className="blog-details">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-md-12">
                                    <div className="navigate-link">
                                        <span className="navigate-link-content" id="navigate-link-content">
                                            <Link href='/su-kien'>Sự kiện&nbsp;&nbsp;&gt;</Link>
                                            <span>&nbsp;&nbsp;{events.title}</span>
                                        </span>
                                    </div>
                                    <div className="blog-main">
                                         <div className="box-image">
                                             <img src={events.thumbnail_url || "/assets/images/blog/blog-01.jpg"} alt={events.title} />
                                        </div>
                                        <h3 className="title">
                                            {events.title}
                                        </h3>
                                        <div className="content" dangerouslySetInnerHTML={{ __html: events.content }} >
                                            
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-12">
                                    <h6 className="heading tin-nong-heading">Sự kiện khác</h6>
                                    <div className="sidebar">
                                        <div className="widget recent mt-0">
                                            <ul className="tin-nong">
                                                {Array.isArray(hotEvents) && hotEvents.slice(0, 10).map(item => (
                                                    <li key={item.id}>
                                                        <div style={{ display: 'block' }}>
                                                            <p className="time-stamp-p">
                                                                {item.time_event
                                                                    ? new Date(item.time_event).toLocaleString('vi-VN', { hour12: false })
                                                                    : ''}
                                                            </p>
                                                            <div className="image">
                                                                <img src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                            </div>
                                                        </div>
                                                        <div className="content">
                                                            <Link href={`/su-kien/${item.id}`} className="title navigate-child-news">
                                                                {item.title}
                                                            </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div> 
                                    </div>


                                    {/* Tin xem nhiều */}
                                    {/* <div className="sidebar tin-xem-nhieu">
                                        <div className="widget recent mt-0">
                                            <h6 className="heading">Tin xem nhiều</h6>
                                            
                                            <ul className="tin-nong">
                                                {hotEvents.slice(0, 3).map(item => (
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
                                                            <Link href={`/su-kien/${item.id}`} className="title navigate-child-news">
                                                                {item.title}
                                                            </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div> */}



                                </div>
                            </div>
                        </div>
                    </section>
                      <section className="duoc-xem-nhieu col-md-12">
                        <div className="title-container">
                            <h5>Được xem nhiều</h5>
                        </div>
                                            

                                            <div className="content-inner row div-duoc-xem-nhieu">
                                                {hotEvents.slice(0, 3).map(item => (
                                                    <div className="col-md-4" key={item.id}>
                                                        <div className="blog-box">
                                                            <div className="box-image">
                                                                <img src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                <div className="wrap-video"></div>
                                                            </div>
                                                            <div className="box-content title-news-duoc-xem-nhieu">
                                                                <Link href={`/su-kien/${item.id}`} className="title">{item.title}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="col-md-12">
                                                    <div className="button-loadmore">
                                                        <Link href="/su-kien" className="btn-action">
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                    </section>
                </div>

            </Layout>
        </>
    )
}