import Link from "next/link"
import styles from "./footer2.module.css"
import BackToTop from '../../elements/BackToTop'

export default function Footer2() {
    return (
        <>

            <footer className="footer style-2 footer-main">
                <div className="container" style={{'position':'relative'}}>
                    <div className="footer__main">
                        <div className="row">
                            <div className="col-xl-4 col-md-6">
                                <div className="info">
                                    <Link href="/" className="logo">
                                        <img src="/assets/images/logo/Nivex_icon_bg.png" alt="" />
                                    </Link>
                                    <h6 >Hãy liên hệ với chúng tôi</h6>
                                    <ul className="list">
                                        <li>
                                            <p className="link-footer">+84 974 743 849</p>
                                        </li>
                                        <li>
                                            <p className="link-footer">nivexvietnam@gmail.com</p>
                                        </li>
                                        <li>
                                            <p className="link-footer">
                                                29 Trần Quý Kiên, Cát Lái, Tp. Hồ Chí Minh
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="widget" style={{'marginLeft': '0%'}}>
                                    <div className="widget-link s1">
                                        <h6 className="title">VỀ NIVEX</h6>
                                        <ul>
                                            <li className="link-footer" style={{ 'fontWeight': 300 }}><Link href="/gioi-thieu-ve-nivex"  style={{ 'fontWeight': 300 }}>Giới thiệu</Link></li>
                                            <li className="link-footer" style={{ 'fontWeight': 300 }}><Link href="#"  style={{ 'fontWeight': 300 }}>Tải App</Link></li>
                                            <li className="link-footer" style={{ 'fontWeight': 300 }}><Link href="/huong-dan-su-dung-app-nivex"  style={{ 'fontWeight': 300 }}>Hướng dẫn sử dụng App Nivex</Link></li>
                                            <li className="link-footer" style={{ 'fontWeight': 300 }}><Link href="/su-kien"  style={{ 'fontWeight': 300 }}>Sự kiện</Link></li>
                                        </ul>
                                    </div>
                                    <div className="widget-link s2 custom-s2" >
                                        <h6 className="title">KIẾN THỨC</h6>
                                        <ul>
                                            <li className="link-footer" ><Link style={{ 'fontWeight': 300 }} href="/kien-thuc-tong-quan" >Tổng quan</Link></li>
                                            <li className="link-footer" ><Link style={{ 'fontWeight': 300 }} href="/thuat-ngu">Thuật ngữ</Link></li>
                                        </ul>
                                    </div>
                                    <div className="widget-link s3" >
                                        <h6 className="title">HỖ TRỢ</h6>
                                        <ul>
                                            <li className="link-footer" ><Link style={{ 'fontWeight': 300 }} href="/" >Tài khoản & Bảo mật</Link></li>
                                            <li className="link-footer" ><Link style={{ 'fontWeight': 300 }} href="/">Nạp & Rút tiền</Link></li>
                                            <li className="link-footer" ><Link style={{ 'fontWeight': 300 }} href="/">Chương trình đại lý</Link></li>
                                            <li className="link-footer" ><Link style={{ 'fontWeight': 300 }} href="/">An toàn & Bảo mật</Link></li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-12 footer-contact-container">
                                <div className="footer-contact" >
                                    <h5 style={{'fontWeight': '500'}}>Chúng tôi có thể giúp gì cho bạn?</h5>
                                    <p className="link-footer">
                                        Subscribe our newsletter to get more interested resources from Nivex.
                                    </p>
                                    <form >
                                        <input className="input-email-footer-subscribe" style={{'padding': '6px 19px'}} type="email" placeholder="Enter your email" required />
                                        <button type="submit" className="btn-action" style={{'fontSize': 12, 'fontWeight': 500, 'padding': '10px 23px' }}>Đăng ký</button>
                                    </form>
                                    <ul className="list-social">
                                        <li>
                                            <Link href="https://www.facebook.com/NivexVN" target="_blank"><span className="icon-facebook-f" /></Link>
                                        </li>
                                        <li>
                                            <Link href="https://www.tiktok.com/@nivexvn" target="_blank" className="icon-tiktok" ></Link>
                                        </li>
                                        <li>
                                            <Link href="https://x.com/Nivex_Vietnam" target="_blank" className="icon-x-twitter"></Link>
                                        </li>
                                        <li>
                                            <Link href="https://www.youtube.com/@Nivex_Vietnam" target="_blank"><span className="icon-youtube" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    <BackToTop target="#top" />
                </div>
                <div className="container-fluid">

                </div>
            </footer>
            
            <div className={`${styles.footer__bottom_custom} footer__bottom`}>
                <p>
                    © 2025 All rights reserved
                </p>
            </div>
        </>
    )
}
