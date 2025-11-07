
'use client'
import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import './style.css'
import './fix-content.css'

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export default function ChiTietTinTucComponent() {
    const { slug } = useParams();          // id chính là slug
    const [news, setNews] = useState(null);
    const [hotNews, setHotNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostViewedNews, setMostViewedNews] = useState([]);

    useEffect(() => {
        if (!slug) return
        setLoading(true)
      
        // Chi tiết bài viết (gọi trực tiếp WP)
        const detailUrl = `${WP_BASE}/news/by-slug/${encodeURIComponent(slug)}`
        fetch(detailUrl, { cache: 'no-store' })
          .then(r => r.json())
          .then(json => {
            if (json?.success && json.data) {
              const a = json.data
              setNews({
                id: a.id,
                slug: a.slug,
                title: a.title,
                content: a.content || '',
                thumbnail_url: a.thumbnail_url || 'https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp',
                time_upload: a.time_upload,
                created_at: a.created_at,
                updated_at: a.updated_at,
                category_id: a.category_id ?? null,
              })
            } else {
              setNews(null)
            }
          })
          .catch(() => setNews(null))
          .finally(() => setLoading(false))
      
        // Danh sách tin nóng / mới (lấy nhanh qua list news)
        const listUrl = `${WP_BASE}/news?status=active&page=1&per_page=20`
        fetch(listUrl, { cache: 'no-store' })
          .then(r => r.json())
          .then(json => {
            const arr = Array.isArray(json?.data) ? json.data : []
            setHotNews(arr.map(n => ({
              id: n.id,
              slug: n.slug,
              title: n.title,
              time_upload: n.time_upload,
              thumbnail_url: n.thumbnail_url || 'https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp',
            })))
          })
          .catch(() => setHotNews([]))
      }, [slug])     
    
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

    useEffect(() => {
        if (!news?.slug) return
        void fetch(`${WP_BASE}/news-view?slug=${encodeURIComponent(news.slug)}`, {
          method: 'GET',
          cache: 'no-store',
          keepalive: true
        }).catch(() => {})
    }, [news?.slug])



    if (loading) {
      return (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
          <p>Đang tải dữ liệu...</p>
        </div>
      );
    }
  
    if (!news) {
      return (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
          <p>Không tìm thấy bài viết.</p>
        </div>
      );
    }

    if (loading) return 
        <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
            <p>Đang tải dữ liệu...</p>
        </div>
    if (!news) return 
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
            <p>Lỗi kết nối với máy chủ.</p>
        </div>



    return (
        <>
                <div>
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

                    <section className="blog-details tin-tuc-id">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-md-12">
                                    <div className="navigate-link">
                                        <span className="navigate-link-content" id="navigate-link-content">
                                            <Link href='/tin-tuc'>Tin tức&nbsp;&nbsp;&gt;</Link>
                                            <span>&nbsp;&nbsp;{news.title}</span>
                                        </span>
                                    </div>
                                    <div className="blog-main">
                                         <div className="box-image">
                                             <img src={news.thumbnail_url || "/assets/images/blog/blog-01.jpg"} alt={news.title} />
                                        </div>
                                        <h3 className="title">
                                            {news.title}
                                        </h3>
                                       
                                        <div className="news-details-display-markdown content" dangerouslySetInnerHTML={{ __html: news.content }} >
                                            {/* Noi dung */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-12 right-side-panel-blog-details">
                                    <h6 className="heading tin-nong-heading tin-nong-tintucid">Tin nóng</h6>
                                    <div className="sidebar sb-tin-nong-ttuc-id">
                                        <div className="widget recent mt-0 title-link-right-panel">
                                            <ul className="tin-nong tin-nong-real">
                                                {Array.isArray(hotNews) && hotNews.slice(0, 10).map(item => (
                                                    <Link href={`/tin-tuc/${item.slug}`}>
                                                        <li className="li-chi-tiet-tin-tuc-slug" key={item.id}>
                                                            <div style={{ display: 'block' }}>
                                                                <p className="time-stamp-p">
                                                                    {item.time_upload
                                                                        ? new Date(item.time_upload).toLocaleString('vi-VN', { hour12: false })
                                                                        : ''}
                                                                </p>
                                                                <div className="image">
                                                                    <img className="mini-image-imgs" src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                <Link href={`/tin-tuc/${item.slug}`} className="title navigate-child-news a-href-tin-long side-Banner-Link-Related">
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
                                    <div className="sidebar tin-xem-nhieu">
                                        <div className="widget recent mt-0 title-link-right-panel">
                                            <h6 className="heading heding-tin-xem-nhieu">Tin xem nhiều</h6>
                                            
                                            <ul className="tin-nong tin-nogggg">
                                                {hotNews.slice(0, 3).map(item => (
                                                    <Link href={`/tin-tuc/${item.slug}`}>
                                                        <li className="li-chi-tiet-tin-tuc-slug2" key={item.id}>
                                                            <div style={{ display: 'block' }}>
                                                                <p className="time-stamp-p">
                                                                    {item.time_upload
                                                                        ? new Date(item.time_upload).toLocaleString('vi-VN', { hour12: false })
                                                                        : ''}
                                                                </p>
                                                                <div className="image">
                                                                    <img className="mini-image-imgs1" src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                <Link href={`/tin-tuc/${item.slug}`} className="title navigate-child-news">
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
                      <section className="duoc-xem-nhieu col-md-12 chi-tiet-ttuc-duoc-xem-nhieu">
                        <div className="title-container">
                            <h5>Được xem nhiều</h5>
                        </div>
                                            <div className="content-inner row div-duoc-xem-nhieu">
                                                {mostViewedNews.slice(0, 3).map(item => (
                                                    <div className="col-md-4" key={item.id}>
                                                        <Link href={`/tin-tuc/${item.slug}`}>
                                                            <div className="blog-box duoccc-xemmm-nhieuuu">
                                                                <div className="box-image">
                                                                    <img src={item.thumbnail_url || "/assets/images/blog/blog-02.jpg"} alt={item.title} />
                                                                    <div className="wrap-video"></div>
                                                                </div>
                                                                <div className="box-content title-news-duoc-xem-nhieu abcuixyz-nivex-news">
                                                                    <Link href={`/tin-tuc/${item.slug}`} className="title">{item.title}</Link>
                                                                </div>
                                                            </div>
                                                        </Link>
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
                </div>
        </>
    )
}
