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
                                        <h3 className="big-text">Chiến lược <span className="gradient-text">AI cấp tổ chức </span><span className="break-line">phân tích thị trường như thế nào?</span></h3>
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
                                <div className="tieu-de-big uppercase-text tieu-de-big-special-mobile">
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
                                        <h3 className="big-text">Cơ chế chiến lược xu hướng <span className="gradient-text break-line">Martingale hai chiều</span> <br/></h3>
                                        <p className="text-nguyen-ly-copy-trade">Nivex độc quyền phát triển Chiến lược Xu hướng Martingale Hai chiều, tích hợp hệ thống nhận diện xu hướng và hệ thống vào lệnh lưới bổ sung vị thế, xây dựng một mô hình lợi nhuận ổn định.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-2-content">
                            <div className="nguyen-ly-cot-loi">
                                <div className="title-section-2-container">
                                    <img src="/assets/images/icon/play.svg" ></img>
                                    <p className="title-section-2">nguyên lý cốt lõi</p>
                                </div>
                                <ul className="ul-text-content">
                                    <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Mở đồng thời các vị thế Mua (Long) / Bán (Short) để thu lợi nhuận từ các dao động của thị trường.</li>
                                    <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Kết hợp chiến lược xu hướng Martingale, tự động tăng vị thế một cách thông minh khi xu hướng dữ liệu lớn rõ ràng để tối đa hóa lợi nhuận.</li>
                                    <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Tự động giảm quy mô vị thế khi thị trường đảo chiều để giảm thiểu rủi ro.</li>
                                </ul>
                            </div>
                            <div className="uu-diem-chien-luoc">
                                <div className="title-section-2-container">
                                    <img src="/assets/images/icon/play.svg" ></img>
                                    <p className="title-section-2">Ưu điểm chiến lược</p>
                                </div>
                                <ul className="ul-text-content">
                                    <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Giao dịch hai chiều bao quát cả thị trường tăng và giảm: có thể kiếm lợi nhuận dù thị trường đi lên hay đi xuống.</li>
                                    <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Cơ chế bổ sung vị thế linh hoạt: tự động vào thêm lệnh khi thị trường điều chỉnh giảm để trung bình giá.</li>
                                    <li className="li-text-content" style={{'list-style-type': 'disc', 'color': 'white', 'fontWeight': 300 }}>Hỗ trợ đòn bẩy từ 2 đến 50 lần: đáp ứng nhu cầu của các nhà đầu tư có khẩu vị rủi ro khác nhau.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="tai-sao-nen-chon-chien-luoc">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text">Tại sao nên chọn <span className="gradient-text">chiến lược AI theo tín hiệu từ tổ chức </span><span className="break-line">của Nivex?</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                       <div className="block-khoi-div-tai-sao-container flex">
                            <div className="block-khoi-div-tai-sao block-khoi-div-tai-sao-gray">
                                <div className="sub-div-sb">
                                    <img src="/assets/images/icon/human.svg" />
                                    <p className="sub-title-section-3">Sao chép lệnh AI hoàn toàn tự động</p>
                                    <p className="sub-content-section-3">Không cần người dùng thao tác thủ công, tự động xác định thời điểm mở/đóng lệnh một cách thông minh.</p>
                                </div>
                            </div>
                            <div className="block-khoi-div-tai-sao">
                                <div className="sub-div-sb">
                                    <img src="/assets/images/icon/human_gray.svg" />
                                    <p className="sub-title-section-3">Chiến lược có tỷ lệ thắng cao</p>
                                    <p className="sub-content-section-3">Chiến lược được cải tiến và tối ưu hóa liên tục, tỷ lệ thắng trong lịch sử ổn định trên 95%+.</p>
                                </div>
                            </div>
                            <div className="block-khoi-div-tai-sao block-khoi-div-tai-sao-gray">
                                <div className="sub-div-sb">
                                    <img src="/assets/images/icon/human.svg" />
                                    <p className="sub-title-section-3">Cơ chế quản trị rủi ro thông minh</p>
                                    <p className="sub-content-section-3">Tự động nhận diện các biến động thị trường cực đoan, phòng tránh trước nguy cơ cháy tài khoản.</p>
                                </div>   
                            </div>
                            <div className="block-khoi-div-tai-sao">
                                <div className="sub-div-sb">
                                    <img src="/assets/images/icon/human_gray.svg" />
                                    <p className="sub-title-section-3">Phong cách giao dịch linh hoạt</p>
                                    <p className="sub-content-section-3">Cung cấp các chiến lược tương ứng cho cả tài khoản theo phong cách Ổn định và Tấn công.</p>
                                </div>
                            </div>
                            <div className="block-khoi-div-tai-sao block-khoi-div-tai-sao-gray">
                                <div className="sub-div-sb">
                                    <img src="/assets/images/icon/human.svg" />
                                    <p className="sub-title-section-3">Đảm bảo an toàn từ nền tảng</p>
                                    <p className="sub-content-section-3">Hợp tác với các sàn giao dịch tuân thủ quy định toàn cầu, vốn có thể nạp/rút bất cứ lúc nào.</p>
                                </div>
                            </div>
                       </div>
                    </section>                   
                    
                </div>

        </>
    )
}