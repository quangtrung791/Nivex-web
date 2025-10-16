'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import './style.css'

export default function HuongDanLienKetGGAuth() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <>
                <div>
                    <section className="banner-tao-bao-li-xi-nivex-huong-dan banner-section-flexible">
                        <div className="li-xi-nivex-super-title">
                            <h2 className="banner-title">Tạo tài khoản bằng <span className="gradient-text">Gmail</span></h2>
                        </div>
                        <div className="li-xi-nivex-super-text">
                            <p>Hướng dẫn chi tiết giúp bạn tạo tài khoản Nivex mới <span className="break-line">bằng gmail nhanh chóng và dễ dàng.</span></p>
                        </div>
                    </section>

                    <section className="content-tao-bao-li-xi-nivex-huong-dan">
                        <div className="container container-flexible">
                            <div className="row giai-thich-y-nghia-bao-li-xi">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text">Cách liên kết <span className="gradient-text">Google Authenticator </span>với Nivex</h3>
                                        {/* <p className="text-bao-li-xi-nivex-main">Bao lì xì Nivex là một tính năng thú vị, cho phép bạn gửi tặng tiền mã hóa đến bạn bè và người thân kèm theo những lời chúc được cá nhân hóa. Bạn có thể gửi Lì xì cho những người dùng Nivex khác thông qua Ứng dụng Nivex.</p> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row image-bao-li-xi-container">
                                <img className="image-bao-li-xi" src='/assets/images/icon/li-xi.svg' />
                            </div> */}
                        </div>
                        <div className="huong-dan-cac-buoc-container">
                            <div className="buoc-huong-dan">
                                <div className="step-components step-components-mobile-mt">
                                    <p className="gg-step-component-title">1. Mở ứng dụng Nivex và nhấn vào nút <span className="text-bolder">đăng ký</span></p>
                                    {/* <p className="step-component-text">Mở Ứng dụng Nivex, nhấn vào biểu tượng <span className="text-bolder">LOGO</span> ở góc trên bên trái, sau đó chọn <span className="text-bolder">Khuyến mãi </span>-&gt; <span className="text-bolder">Lì Xì</span></p> */}
                                    <div className="group-images-flexible">
                                        <img src="/assets/images/screenshot/gg-1.svg" className="image-li-xi" />
                                        <img src="/assets/images/screenshot/gg-2.svg" className="image-li-xi" />
                                        <img src="/assets/images/screenshot/gg-3.svg" className="image-li-xi" />
                                    </div>
                                </div>
                            </div>
                            <div className="buoc-huong-dan">
                                <div className="step-components">
                                    <p className="gg-step-component-title">2. Nhập địa chỉ Gmail mới của bạn, sau đó xác minh email theo hướng dẫn hệ thống gửi về hộp thư.</p>
                                </div>
                            </div>
                            <div className="buoc-huong-dan">
                                <div className="step-components">
                                    <p className="gg-step-component-title">3. Tạo mật khẩu mạnh để bảo mật tài khoản của bạn.</p>
                                    <div className="group-images-flexible">
                                        <img src="/assets/images/screenshot/gg-1.svg" className="image-li-xi" />
                                        <img src="/assets/images/screenshot/gg-2.svg" className="image-li-xi" />
                                        <img src="/assets/images/screenshot/gg-3.svg" className="image-li-xi" />
                                    </div>
                                </div>
                            </div>
                            <div className="buoc-huong-dan">
                                <div className="step-components">
                                    <p className="gg-step-component-title">4. Sau khi xác minh và thiết lập xong mật khẩu, bạn đã đăng ký thành công tài khoản Nivex mới.</p>
                                </div>
                            </div>
                        </div>
                    </section> 
                    <section className="ho-tro-truc-tuyen">
                        <p className="title-ho-tro-truc-tuyen">Hỗ trợ trực tuyến</p>
                        <p className="text-ho-tro-truc-tuyen">Truy cập trang web chính thức của <Link className="link-gg-auth" href="https://nivex.vn" >Nivex</Link>, nhấp vào nút <Link href="" className="link-gg-auth">[Liên hệ chúng tôi]</Link> hoặc <Link href="" className="link-gg-auth">[Hỗ trợ trực tuyến]</Link> ở cuối trang.</p>
                    </section>
                </div>

        </>
    )
}