'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import './style.css'

export default function HuongDanCopyTradeComponent() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <>
                <div>
                    <section className="banner-tao-lien-ket-gioi-thieu">
                        <h2 className="banner-title">Hướng Dẫn <span className="gradient-text">Copy Trade Nivex</span></h2>
                    </section>
                    <section className="content-tao-lien-ket-gioi-thieu">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text">Tính năng sao chép các <br /><span className="gradient-text">Tổ chức chiến lược giao dịch</span> bằng AI.</h3>
                                        <p className="chi-tiet-tao-lien-ket-gioi-thieu">Đây là giải pháp tối ưu để người mới tham gia thị trường có thể học hỏi và nâng cao hiệu quả đầu tư, đồng thời giảm thiểu rào cản giao dịch.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content-tao-lien-ket-gioi-thieu">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text"><span className="gradient-text">Video</span> huớng dẫn chi tiết</h3>
                                        <p className="chi-tiet-tao-lien-ket-gioi-thieu">Trong video, bạn sẽ được hướng dẫn cụ thể từng bước thao tác để tham gia Copy Trade trên ứng dụng Nivex.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="iframe-youtube-video-container-n">
                            <iframe width="100%" height="800" src="https://www.youtube.com/embed/mfA-9C9wGrc" title="HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG COPY TRADE CỦA ỨNG DỤNG NIVEX" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </section>
                    
                </div>

        </>
    )
}