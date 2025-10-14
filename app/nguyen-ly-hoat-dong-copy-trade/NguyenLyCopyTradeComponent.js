'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import './style.css'

export default function NguyenLyHoatDongCopyTrade() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <>
                <div>
                    <section className="banner-tao-lien-ket-gioi-thieu">
                        <h2 className="banner-title"><span className="gradient-text">Nguyên lý </span>Copy Trade</h2>
                    </section>

                    <section className="content-tao-lien-ket-gioi-thieu">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text">Chiến lược <span className="gradient-text">AI cấp tổ chức</span> <br/> phân tích thị trường như thế nào?</h3>
                                        <p className="text-nguyen-ly-copy-trade">Nivex kết hợp trí tuệ nhân tạo với hệ thống dữ liệu lớn (Big Data) cấp tổ chức để xây dựng mô hình giao dịch AI hàng đầu, với ba công nghệ cốt lõi hỗ trợ hoạt động của chiến lược:</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-box-border-container flex text-box-border-container-gray">
                            <div className="con-so-big">01</div>
                            <div className="text-ben-phai-box">
                                <div className="tieu-de-big uppercase-text">
                                    Phân tích thị trường bằng dữ liệu lớn
                                </div>
                                <div className="text-conntent-ben-phai-box">
                                    <ul className="ul-text-content">
                                        <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Thu thập dữ liệu thị trường từ các sàn giao dịch chính thống toàn cầu theo thời gian thực, cũng như hành vi giao dịch trên chuỗi (on-chain) và xu hướng dòng vốn..</li>
                                        <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Sử dụng hệ thống tổng hợp dữ liệu để nhanh chóng xác định động thái của dòng vốn chủ lực và những thay đổi trong cấu trúc thị trường.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-box-border-container-second flex">
                            <div className="text-ben-phai-box">
                                <div className="tieu-de-big uppercase-text">
                                    Mô hình dự đoán bằng máy học AI (AI Machine Learning)
                                </div>
                                <div className="text-conntent-ben-phai-box">
                                    <ul className="ul-text-content">
                                        <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Huấn luyện mô hinh AI dựa trên hàng triệu dữ liệu nến K (K-line) trong lịch sử.</li>
                                        <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Xác định các biến động giá có “xác suất cao”, kết hợp với dữ liệu lớn để dự đoán các điểm đảo chiều của xu hướng.</li>
                                        <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Tự động cập nhật các tham số chiến lược hàng ngày để đảm bảo thích ứng với các điều kiện thị trường khác nhau.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="con-so-big con-so-big-2">02</div>
                        </div>

                        <div className="text-box-border-container flex text-box-border-container-gray">
                            <div className="con-so-big">03</div>
                            <div className="text-ben-phai-box">
                                <div className="tieu-de-big uppercase-text">
                                    Hệ thống quản trị rủi ro thông minh
                                </div>
                                <div className="text-conntent-ben-phai-box">
                                    <ul className="ul-text-content">
                                        <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Giám sát 24/7 các biến động thị trường và chỉ số rủi ro (như biến động của BTC, tỷ lệ thanh lý vị thế).</li>
                                        <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Tự động điều chỉnh hướng mở lệnh, quy mô vị thế và mức dừng lỗ (stop-loss) dựa trên tình hình thị trường.</li>
                                        <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Thiết lập vùng đệm rủi ro để tránh bị thanh lý vị thế (cháy tài khoản) do biến động mạnh của thị trường.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="co-che-chien-luoc-xu-huong">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text">Cơ chế chiến lược xu hướng <br/><span className="gradient-text">Martingale hai chiều</span> <br/></h3>
                                        <p className="text-nguyen-ly-copy-trade">Nivex độc quyền phát triển Chiến lược Xu hướng Martingale Hai chiều, tích hợp hệ thống nhận diện xu hướng và hệ thống vào lệnh lưới bổ sung vị thế, xây dựng một mô hình lợi nhuận ổn định.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                   
                    
                </div>

        </>
    )
}