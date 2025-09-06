import Link from "next/link"
import styles from "./footer2.module.css"
import BackToTop from '@/components/elements/BackToTop'

export default function Footer2() {
    return (
        <>

            <footer className="footer style-2">
                <div className="container">
                    <div className="footer__main">
                        <div className="row">
                            <div className="col-xl-4 col-md-6">
                                <div className="info">
                                    <Link href="/" className="logo">
                                        <img src="/assets/images/logo/Nivex_icon_bg.png" alt="" />
                                    </Link>
                                    <h6>Hãy liên hệ với chúng tôi</h6>
                                    <ul className="list">
                                        <li>
                                            <p>+12 345 678 9101</p>
                                        </li>
                                        <li>
                                            <p>nivexhub@gmail.com</p>
                                        </li>
                                        <li>
                                            <p>
                                                29 Trần Quý Kiên, Cát Lái, Tp. Hồ Chí Minh
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="widget">
                                    <div className="widget-link">
                                        <h6 className="title">SẢN PHẨM</h6>
                                        <ul>
                                            <li><Link href="/spot">Giao ngay</Link></li>
                                            <li><Link href="#">Hợp đồng nghịch đảo</Link></li>
                                            <li><Link href="#">Hợp đồng USDT</Link></li>
                                            <li><Link href="/exchange">Sàn giao dịch</Link></li>
                                            <li><Link href="#">Launchpad</Link></li>
                                            <li><Link href="#">Binance Pay</Link></li>
                                        </ul>
                                    </div>
                                    <div className="widget-link s2">
                                        <h6 className="title">SERVICES</h6>
                                        <ul>
                                            <li><Link href="/buy-crypto-select">Mua Crypto</Link></li>
                                            <li><Link href="/markets">Thị trường</Link></li>
                                            <li><Link href="#">Phí giao dịch</Link></li>
                                            <li><Link href="#">Liên kết (Affiliate)</Link></li>
                                            <li><Link href="#">Giới thiệu (Referral)</Link></li>
                                            <li><Link href="#">API</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-12">
                                <div className="footer-contact">
                                    <h5>Chúng tôi có thể giúp gì cho bạn?</h5>
                                    <p>
                                        Subscribe our newsletter to get more free design course and
                                        resource.
                                    </p>
                                    <form >
                                        <input type="email" placeholder="Enter your email" required />
                                        <button type="submit" className="btn-action">Đăng ký</button>
                                    </form>
                                    <ul className="list-social">
                                        <li>
                                            <Link href="#"><span className="icon-facebook-f" /></Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="icon-x-twitter"></Link>
                                        </li>
                                        <li>
                                            <Link href="#"><span className="icon-youtube" /></Link>
                                        </li>
                                        <li>
                                            <Link href="#"><span className="icon-instagram" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <BackToTop target="#top" /> */}
                        </div>
                    </div>
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
