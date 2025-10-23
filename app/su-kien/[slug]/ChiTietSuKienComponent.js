
'use client'
// import VideoPopup from "@/components/elements/VideoPopup"
// import Layout from "@/components/layout/Layout"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import './style.css'
import './fix-content.css'

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export default function EventDetails() {
  const { slug } = useParams()
  const [events, setEvents] = useState(null)
  const [hotEvents, setHotEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [moreNewsCount, setMoreNewsCount] = useState(3)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetch(`${WP_BASE}/events/by-slug/${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(json => setEvents(json?.success ? json.data : null))
      .catch(() => setEvents(null))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    fetch(`${WP_BASE}/events?hot=1`, { cache: 'no-store' })
      .then(res => res.json())
      .then(json => setHotEvents(Array.isArray(json?.data) ? json.data : []))
      .catch(() => setHotEvents([]))
  }, [])

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setMoreNewsCount(prev => prev + 3)
    setIsLoadingMore(false)
  }

  if (loading) {
    return (
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
        <p>Đang tải dữ liệu...</p>
      </div>
    )
  }
  if (!events) {
    return (
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
        <p>Không tìm thấy sự kiện</p>
      </div>
    )
  }


    return (
        <>
            {/* <Layout headerStyle={1} footerStyle={2} > */}
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
                                    <circle cx="11" cy="11" r="8" stroke="#222" strokeWidth="2" fill="none" />
                                    <line x1="17" y1="17" x2="22" y2="22" stroke="#222" strokeWidth="2" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </section>

                <section className="blog-details su-kien-id">
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
                                    <div className="event-details-display-markdown content" dangerouslySetInnerHTML={{ __html: events.content }} >
                                        {/* Noi dung */}
                                    </div>

                                </div>
                            </div>
                            <div className="col-xl-4 col-md-12">
                                <h6 className="heading tin-nong-heading heading-skienkhacc">Sự kiện khác</h6>
                                <div className="sidebar su-kien-khaccc">
                                    <div className="widget recent mt-0">
                                        <ul className="tin-nong">
                                            {Array.isArray(hotEvents) && hotEvents.slice(0, 10).map(item => (
                                                <Link href={`/su-kien/${item.slug}`}>
                                                    <li className="li-chi-tiet-su-kien-to-chuc-slug" key={item.id}>
                                                        <div style={{ display: 'block' }}>
                                                            <p className="time-stamp-p">
                                                                {item.time_event
                                                                    ? new Date(item.time_event).toLocaleString('vi-VN', { hour12: false })
                                                                    : ''}
                                                            </p>
                                                            <div className="image">
                                                                <img className="mini-image-sukienkhac" src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                            </div>
                                                        </div>
                                                        <div className="content">
                                                            <Link href={`/su-kien/${item.slug}`} className="title navigate-child-news ctietsukiennivex-tochuc">
                                                                {item.title}
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </Link>
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
                <section className="duoc-xem-nhieu col-md-12 duoc-xem-nhieu-chi-tiet-su-kien">
                    <div className="title-container">
                        <h5>Được xem nhiều</h5>
                    </div>
                    <div className="content-inner row div-duoc-xem-nhieu">
                        {hotEvents.slice(0, moreNewsCount).map(item => (
                            <div className="col-md-4" key={item.id}>
                                <Link href={`/su-kien/${item.slug}`}>
                                    <div className="blog-box chi-tiet-su-kien-item-box">
                                        <div className="box-image">
                                            <img className="img-suggest-chi-tiet-su-kien" src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                            <div className="wrap-video"></div>
                                        </div>
                                        <div className="box-content title-news-duoc-xem-nhieu">
                                            <Link href={`/su-kien/${item.slug}`} className="title">{item.title}</Link>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        {/* <div className="col-md-12">
                                                    <div className="button-loadmore">
                                                        <Link href="/su-kien" className="btn-action">
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                </div> */}

                        {moreNewsCount < hotEvents.length && (
                            <div className="col-md-12">
                                <div className="button-loadmore load-more-su-kiens">
                                    <button
                                        className="btn-action"
                                        disabled={isLoadingMore}
                                        onClick={handleLoadMore}>
                                        {isLoadingMore ? 'Đang tải...' : 'Xem thêm'}
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* {moreNewsCount < hotEvents.length && (
                            <div className="col-md-12">
                                <div className="button-loadmore">
                                    <button
                                        className="btn-action"
                                        onClick={() => setVisibleCount(moreNewsCount + 3)}>
                                        Xem thêm
                                    </button>
                                </div>
                            </div>
                        )} */}
                    </div>
                </section>
            </div>

            {/* </Layout> */}
        </>
    )
}