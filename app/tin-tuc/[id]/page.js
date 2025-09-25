
'use client'
import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import './style.css'


export default function BlogDetails() {
    const { id } = useParams()
    const [news, setNews] = useState(null);
    const [hotNews, setHotNews] = useState([]);
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     document.title = "Chi tiết tin tức"
    // }, []);
    useEffect(() => {
        if (news && news.title) {
            document.title = news.title;
        }
    }, [news]);

    useEffect(() => {
        if (!id) return
        setLoading(true)
        fetch(`/api/admin/news/${id}`)
            .then(res => res.json())
            .then(data => {
                setNews(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id]);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/admin/news/${id}`)
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
        // Fetch danh sách tin nóng
        fetch('/api/admin/news?hot=1')
            .then(res => res.json())
            .then(data => setHotNews(data));
    }, [id]);

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
            <Layout headerStyle={1} footerStyle={2} >
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

                    <section className="blog-details">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-md-12">
                                    <div className="navigate-link">
                                        <span className="navigate-link-content">
                                            <Link href='/tin-tuc'>Tin tức&nbsp;&nbsp;&gt;</Link>
                                            {/* <span>&nbsp;&nbsp;Virtual Land in the Metaverse Is Selling for Millions of Dollars</span> */}
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
                                        {/* <div className="meta">
                                            <Link href="#" className="category btn-action">learn &amp; earn</Link>
                                            <div className="meta-info">
                                                <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                <Link href="#" className="time">Feb 03, 2021</Link>
                                            </div>
                                        </div> */}
                                        <div className="content" dangerouslySetInnerHTML={{ __html: news.content }} >
                                            {/* <h5>What is the Metaverse?</h5> */}
                                            {/* <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Posuere sed nec, vestibulum odio diam amet. In massa auctor
                                                integer est. Morbi viverra neque sagittis varius. Ornare in
                                                nibh dui ornare mattis vel. Volutpat aenean enim sit cras
                                                egestas diam volutpat integer est. Ornare in odio lorem
                                                pharetra tempor, neque sit. Lacus fermentum urna tellus
                                                vulputate aliquam nullam amet, posuere. Magna ligula et ut
                                                sagittis interdum duis. Ut sed tristique tempor nibh bibendum
                                                accumsan, fringilla. Eget rhoncus in hendrerit nascetur odio
                                                consectetur enim tristique. In porttitor.
                                            </p>
                                           
                                            <br />
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus
                                                quis diam integer ridiculus facilisis. Laoreet diam, ipsum
                                                congue augue vel aenean mus. At felis, quis massa elementum
                                                tortor dignissim erat. Pharetra eleifend facilisis sit nisi,
                                                pharetra urna volutpat. Amet lacus sed lorem euismod at diam
                                                neque, mi. Eget congue id phasellus pulvinar id at enim
                                                feugiat cursus. Aliquam egestas vulputate semper at cursus
                                                quam. Augue egestas montes, amet mauris molestie nibh. Aliquam
                                                viverra nec, ornare vitae. Eu etiam donec morbi purus quis
                                                quis nibh. Venenatis cras magna.
                                            </p> */}
                                            
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
                                        {/* <form >
                                            <h6 className="heading">Leave a comment</h6>
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Name" />
                                                <input className="form-control" type="text" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control" cols={30} rows={10} placeholder="Message" />
                                            </div>
                                            <button className="btn-action" type="submit">Send comment</button>
                                        </form> */}
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-12">
                                    <h6 className="heading tin-nong-heading">Tin nóng</h6>
                                    <div className="sidebar">
                                        <div className="widget recent mt-0">
                                            {/* <h6 className="heading">Tin nóng</h6> */}
                                            <ul className="tin-nong">
                                                {hotNews.slice(0, 10).map(item => (
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
                                                            <Link href={`/tin-tuc/${item.id}`} className="title navigate-child-news">
                                                                {item.title}
                                                            </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div> 
                                    </div>


                                    {/* Tin xem nhiều */}
                                    <div className="sidebar tin-xem-nhieu">
                                        <div className="widget recent mt-0">
                                            <h6 className="heading">Tin xem nhiều</h6>
                                            
                                            <ul className="tin-nong">
                                                {hotNews.slice(0, 3).map(item => (
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
                                                            <Link href={`/tin-tuc/${item.id}`} className="title navigate-child-news">
                                                                {item.title}
                                                            </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>


                                            {/* <ul className="tin-nong">
                                                <li>
                                                    <div style={{ 'display': 'block'}}>
                                                        <p className="time-stamp-p">30 phút trước</p>
                                                        <div className="image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <Link href="#" className="title navigate-child-news">Learn about UI8 coin and earn an All-Access Pass</Link>
                                                    </div>
                                                </li>
                                                
                                                
                                            </ul> */}
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </section>
                      <section className="duoc-xem-nhieu col-md-12">
                        <div className="title-container">
                            <h5>Được xem nhiều</h5>
                        </div>
                                            {/* <div className="content-inner row div-duoc-xem-nhieu" > 
                                                <div className="col-md-4">
                                                    <div className="blog-box">
                                                        <div className="box-image">
                                                            <img src="/assets/images/blog/blog-02.jpg" alt="" />
                                                            <div className="wrap-video">
                                                                 
                                                            </div>
                                                        </div>
                                                        <div className="box-content title-news-duoc-xem-nhieu">
                                                            <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
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
                                                            <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
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
                                                            <Link href="#" className="title">Learn about UI8 coin and earn an All-Access Pass</Link>
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
                                            </div> */}

                                            <div className="content-inner row div-duoc-xem-nhieu">
                                                {hotNews.slice(0, 3).map(item => (
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
                </div>

            </Layout>
        </>
    )
}