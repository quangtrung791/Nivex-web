
// import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import './style.css';
export default function BlogDetails() {

    return (
        <>

            <Layout headerStyle={1} footerStyle={2} breadcrumbTitle="Tin tức">
                <div>
                    {/* coin list */}
                    <div className="coin-list-container-c">
                        <div className="coin-list-marquee">
                            <div className="coin-list-c">
                                <span className="coin"><b>Solana</b> (SOL) <span className="red">$242.28 (-2.53%)</span></span>
                                <span className="coin"><b>XRP</b> (XRP) <span className="red">$3.04 (-2.70%)</span></span>
                                <span className="coin"><b>Ethereum</b> (ETH) <span className="red">$4,628.00 (-0.85%)</span></span>
                                <span className="coin"><b>Bitcoin</b> (BTC) <span className="green">$116.136 (0.31%)</span></span>
                                <span className="coin"><b>Litecoin</b> (LTC) <span className="red">$116.136 (0.31%)</span></span>
                                <span className="coin"><b>Shiba Inu</b> (BTC) <span className="red">$116.136</span></span>
                                {/* Lặp lại để hiệu ứng chạy liên tục */}
                                <span className="coin"><b>Solana</b> (SOL) <span className="red">$242.28 (-2.53%)</span></span>
                                <span className="coin"><b>XRP</b> (XRP) <span className="red">$3.04 (-2.70%)</span></span>
                                <span className="coin"><b>Ethereum</b> (ETH) <span className="red">$4,628.00 (-0.85%)</span></span>
                                <span className="coin"><b>Bitcoin</b> (BTC) <span className="green">$116.136 (0.31%)</span></span>
                                <span className="coin"><b>Litecoin</b> (LTC) <span className="red">$116.136 (0.31%)</span></span>
                                <span className="coin"><b>Shiba Inu</b> (BTC) <span className="red">$116.136</span></span>
                            </div>
                        </div>
                    </div>

                    <section className="blog-details">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-md-12">
                                    <div className="blog-main">
                                        <ul className="menu-tab menu-on-line">
                                            <li className="listing active" ><h6 className="fs-16">View All</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">Learn &amp; Earn</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">Metaverse</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">Energy</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">NFT</h6></li>
                                            <li  className="listing" ><h6 className="fs-16">Gaming</h6></li> 
                                            <li  className="listing" ><h6 className="fs-16">Music</h6></li>
                                        </ul>
                                        
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
                                                        <Link href="#">
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