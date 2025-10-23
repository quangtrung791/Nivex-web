
'use client'
import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import './style.css'
import './fix-content.css'

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export default function JoinedEventDetailsComponent() {
    const { slug } = useParams()
    const [events, setEvents] = useState(null);
    const [hotEvents, setHotEvents] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (!slug) return;
      
        setLoading(true);
      
        // chi tiết sự kiện (theo slug)
        fetch(`${WP_BASE}/joined-events/by-slug/${encodeURIComponent(slug)}`, { cache: 'no-store' })
          .then(res => res.json())
          .then(json => {
            if (json?.success && json.data) {
              const e = json.data;
              setEvents({
                id: Number(e.id),
                slug: e.slug,
                title: e.title,
                time_event: e.time_event,
                content: e.content ?? '',
                short_desc: e.short_desc ?? '',
                thumbnail_url: e.thumbnail_url ?? '',
                time_from_and_to: e.time_from_and_to ?? '',
                tag1: e.tag1 ?? '',
                tag2: e.tag2 ?? '',
                tag3: e.tag3 ?? '',
                type: e.type ?? '',
                rank_math_seo_keyword: e.rank_math_seo_keyword ?? ''
              });
            } else {
              setEvents(null);
            }
            setLoading(false);
          })
          .catch(() => {
            setEvents(null);
            setLoading(false);
          });
      
        // danh sách sự kiện khác (hot)
        fetch(`${WP_BASE}/joined-events?hot=1`, { cache: 'no-store' })
          .then(res => res.json())
          .then(json => setHotEvents(Array.isArray(json?.data) ? json.data : []))
          .catch(() => setHotEvents([]));
      }, [slug]);
      
      if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Đang tải dữ liệu...</p>
        </div>
      );
      
      if (!events) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Lỗi kết nối với máy chủ.</p>
        </div>
      );


    return (
        <>
            {/* <Layout headerStyle={1} footerStyle={2} > */}
                <div>
                    <section className="section-news-header">
                        <div className="news-header-container">
                            <h1 className="news-title">Thông tin <span className="gradient-text">sự kiện</span></h1>
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

                    <section className="blog-details su-kien-tg-id">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-md-12">
                                    <div className="navigate-link">
                                        <span className="navigate-link-content" id="navigate-link-content">
                                            <Link href='/su-kien-tham-gia'>Sự kiện&nbsp;&nbsp;&gt;</Link>
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
                                        <div className="joined-event-details-display-markdown content" dangerouslySetInnerHTML={{ __html: events.content }} >
                                            {/* Noi dung */}
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-12">
                                    <h6 className="heading tin-nong-heading heading-skienkhacc1">Sự kiện khác</h6>
                                    <div className="sidebar su-kien-khaccc1">
                                        <div className="widget recent mt-0">
                                            <ul className="tin-nong">
                                                {Array.isArray(hotEvents) && hotEvents.slice(0, 10).map(item => (
                                                    <Link href={`/su-kien-tham-gia/${item.slug}`}>
                                                        <li className="li-chi-tiet-su-kien-tham-gia-slug" key={item.id}>
                                                            <div style={{ display: 'block' }}>
                                                                <p className="time-stamp-p">
                                                                    {item.time_event
                                                                        ? new Date(item.time_event).toLocaleString('vi-VN', { hour12: false })
                                                                        : ''}
                                                                </p>
                                                                <div className="image">
                                                                    <img className="mini-image-src-2" src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                <Link href={`/su-kien-tham-gia/${item.slug}`} className="title navigate-child-news navigate-child-events sktg-slug-right-side-panel">
                                                                    {item.title}
                                                                </Link>
                                                            </div>
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        </div> 
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                      <section className="duoc-xem-nhieu col-md-12">
                        <div className="title-container need-a-classname">
                            <h5>Được xem nhiều</h5>
                        </div>
                                            

                                            <div className="content-inner row div-duoc-xem-nhieu ">
                                                {hotEvents.slice(0, 3).map(item => (
                                                    <div className="col-md-4" key={item.id}>
                                                        <Link href={`/su-kien-tham-gia/${item.slug}`}>
                                                            <div className="blog-box really-need-a-specific-classname">
                                                                <div className="box-image">
                                                                    <img src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                    <div className="wrap-video"></div>
                                                                </div>
                                                                <div className="box-content title-news-duoc-xem-nhieu dc-xem-nhieu-diff-sktg">
                                                                    <Link href={`/su-kien-tham-gia/${item.slug}`} className="title">{item.title}</Link>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                                <div className="col-md-12">
                                                    <div className="button-loadmore">
                                                        <Link href="/su-kien-tham-gia" className="btn-action">
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                    </section>
                </div>

            {/* </Layout> */}
        </>
    )
}