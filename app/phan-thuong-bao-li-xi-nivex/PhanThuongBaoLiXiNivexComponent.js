'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import './style.css'

export default function PhanThuongBaoLiXiNivex() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <>
                <div>
                    <section className="banner-tao-lien-ket-gioi-thieu banner-section-flexible">
                        <div className="li-xi-nivex-super-title">
                            <h2 className="banner-title"><span className="gradient-text">Lì Xì </span>Nivex</h2>
                        </div>
                        <div className="li-xi-nivex-super-text">
                            <p>Giúp tăng cường bảo mật tài khoản của bạn, tránh bị chặn <span className="break-line">SMS hoặc mất mã qua email do lỗi mạng.</span></p>
                        </div>
                    </section>

                    <section className="content-tao-lien-ket-gioi-thieu">
                        <div className="container container-flexible">
                            <div className="row giai-thich-y-nghia-bao-li-xi">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text"><span className="gradient-text">Bao lì xì </span>Nivex là gì?</h3>
                                        <p className="text-nguyen-ly-copy-trade">Bao lì xì Nivex là một tính năng thú vị, cho phép bạn gửi tặng tiền mã hóa đến bạn bè và người thân kèm theo những lời chúc được cá nhân hóa. Bạn có thể gửi Lì xì cho những người dùng Nivex khác thông qua Ứng dụng Nivex.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row image-bao-li-xi-container">
                                <img className="image-bao-li-xi" src='/assets/images/icon/li-xi.svg' />
                            </div>
                        </div>
                        <div className="huong-dan-cac-buoc-container">
                            <div className="buoc-huong-dan">
                                <div className="step-components">
                                    <p className="step-component-title">Bước 1: Đăng nhập và truy cập mục Lì Xì</p>
                                    <p className="step-component-text">Mở Ứng dụng Nivex, nhấn vào biểu tượng <span className="text-bolder">LOGO</span> ở góc trên bên trái, sau đó chọn <span className="text-bolder">Khuyến mãi </span>-&gt; <span className="text-bolder">Lì Xì</span></p>
                                    <div className="group-images-flexible">
                                        <img src="/assets/images/screenshot/li-xi-1.svg" className="image-li-xi" />
                                        <img src="/assets/images/screenshot/li-xi-2.svg" className="image-li-xi" />
                                    </div>
                                </div>
                            </div>
                            <div className="buoc-huong-dan">
                                <div className="step-components">
                                    <p className="step-component-title">Bước 2: Tạo Lì Xì</p>
                                    <p className="step-component-text">Nhấn vào <span className="text-bolder">Gửi Lì Xì</span>. Nhập số tiền, lời chúc, sau đó nhập <span className="text-bolder">Mật khẩu thanh toán</span> để hoàn tất.</p>
                                    <div className="group-images-flexible">
                                        <img src="/assets/images/screenshot/li-xi-3.svg" className="image-li-xi" />
                                        <img src="/assets/images/screenshot/li-xi-4.svg" className="image-li-xi" />
                                    </div>
                                </div>
                            </div>
                            <div className="buoc-huong-dan">
                                <div className="step-components">
                                    <p className="step-component-title">Bước 3: Gửi tặng Lì Xì</p>
                                    <p className="step-component-text">Sau khi tạo thành công, hệ thống sẽ cung cấp một mã nhận <span className="text-bolder">Lì Xì</span>. Bạn có thể chia sẻ link nhận quà hoặc sao chép <span className="text-bolder">Mã Lì Xì</span> để gửi cho bạn bè.</p>
                                    <div className="group-images-flexible">
                                        <img src="/assets/images/screenshot/li-xi-5.svg" className="image-li-xi" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                                     
                    
                </div>

        </>
    )
}