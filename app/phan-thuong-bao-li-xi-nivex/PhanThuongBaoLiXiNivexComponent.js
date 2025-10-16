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
                            <div className="row">
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
                            <div className="buoc-1">
                                <div className="step-components">
                                    <p className="step-component-title">Bước 1: Đăng nhập và truy cập mục Lì Xì</p>
                                    <p className="step-component-text">Mở Ứng dụng Nivex, nhấn vào biểu tượng LOGO ở góc trên bên trái, sau đó chọn Khuyến mãi -&gt; Lì Xì</p>
                                </div>
                            </div>
                        </div>
                    </section>

                                     
                    
                </div>

        </>
    )
}