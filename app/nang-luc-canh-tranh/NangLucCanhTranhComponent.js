'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import './style.css'

export default function NangLucCanhTranhComponent() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <>
                <div>
                    <section className="banner-tao-lien-ket-gioi-thieu">
                        <h2 className="banner-title"><span className="gradient-text">Năng lực </span>cạnh tranh</h2>
                    </section>

                    <section className="content-tao-lien-ket-gioi-thieu">
                        <div className="container hero-section-container-flexible">
                            <div className="row width-50-vw">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="quote-image-container-container">
                                        <div className="quote-image-container">
                                            <img src="/assets/images/icon/quote.svg" />
                                        </div>
                                        <div className="block-text block-hero-banner-text">
                                            <h3 className="big-text"><span className="gradient-text">AI cấp tổ chức</span></h3>
                                            <p className="text-nguyen-ly-copy-trade">Không chỉ đơn thuần là sự chồng chất công nghệ, mà là một <span className="break-line">hàng rào cạnh tranh vững chắc được xây dựng từ <span className="font-weight-bolder">"Nguồn lực,</span> </span><span className="break-line"><span className="font-weight-bolder">Hệ thống, Thực thi và Kiểm chứng".</span></span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="image-hero-sect width-50-vw">
                                <img src="/assets/images/icon/ai_globe.svg" />
                            </div>
                        </div>
                        <div className="title-uu-the-nen-tang-container">
                            <p className="big-text title-uu-the-nen-tang"><span className="gradient-text break-line" >3 ưu thế nền tảng:</span> <span className="normal-title-nen-tang white-text">Xây dựng hàng rào cạnh tranh</span></p>
                        </div>
                        <div className="text-box-border-container flex text-box-border-container-gray">
                            <div className="con-so-big">01</div>
                            <div className="text-ben-phai-box">
                                <div className="tieu-de-big uppercase-text">
                                    Nguồn vốn dồi dào, có không gian chịu lỗ cao hơn
                                </div>
                                <div className="text-conntent-ben-phai-box">
                                    <ul className="ul-text-content">
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}>Có thể <span className="gradient-text font-weight-bolder">vận hành chiến lược trong chu kỳ dài</span>, vượt qua các biến động ngắn hạn.</li>
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}>Có thể bố trí <span className="gradient-text font-weight-bolder">đa dạng sản phẩm, đa dạng hướng đi</span> để xây dựng lợi thế danh mục đầu tư.</li>
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}>Cấu trúc nền tảng vững chắc hơn, dễ dàng vượt qua các chu kỳ thị trường bò-gấu (tăng trưởng và suy thoái).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-box-border-container-second flex">
                            <div className="text-ben-phai-box">
                                <div className="tieu-de-big uppercase-text tieu-de-big-special-mobile">
                                    Đội ngũ nhân tài hàng đầu, thiết kế chiến lược <span className="break-line">khoa học và chuyên nghiệp</span>
                                </div>
                                <div className="text-conntent-ben-phai-box">
                                    <ul className="ul-text-content">
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}>Các thành viên cốt lõi đến từ Phố Wall, các quỹ phòng hộ, phòng thí nghiệm dữ liệu của Stanford/MIT.</li>
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}>Kết hợp cả lý thuyết và thực chiến, chiến lược không phải là quyết định bộc phát mà được <span className="gradient-text font-weight-bolder">xây dựng dựa trên mô hình suy luận và kiểm chứng.</span></li>
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}>Mô hình giao dịch được thiết kế tuân theo cấu trúc tối ưu về tỷ lệ rủi ro - lợi nhuận.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="con-so-big con-so-big-2">02</div>
                        </div>

                        <div className="text-box-border-container flex text-box-border-container-gray">
                            <div className="con-so-big">03</div>
                            <div className="text-ben-phai-box">
                                <div className="tieu-de-big uppercase-text">
                                    Hỗ trợ bởi dữ liệu lớn đa chiều và năng lực tính toán
                                </div>
                                <div className="text-conntent-ben-phai-box">
                                    <ul className="ul-text-content">
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}><span className="gradient-text font-weight-bolder">Xử lý theo thời gian thực</span> dữ liệu thị trường toàn cầu, dữ liệu trên chuỗi, động thái dòng vốn và dư luận xã hội.</li>
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}>Xây dựng logic giao dịch dựa trên các công nghệ như mạng nơ-ron, học tăng cường, mô hình nhân tố.</li>
                                        <li className="li-text-content" style={{'listStyleType': 'disc', 'color': 'white', 'fontWeight': 300 }}>Sở hữu tài nguyên điện toán đám mây cực mạnh, mô hình được <span className="gradient-text font-weight-bolder">cập nhật và tối ưu hóa mỗi ngày</span> để thích ứng với sự thay đổi <span className="break-line">của thị trường.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="co-che-chien-luoc-xu-huong">
                        <div className="container co-che-chien-luoc-container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text"><span className="gradient-text break-line font-size-64">6 ưu thế vượt trội </span><span className="normal-text-p">về phương diện giao dịch</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-2-content">
                            <div className="block-khoi-div-uu-the-container flex">
                                <div className="block-khoi-div-uu-the block-khoi-div-uu-the-gray">
                                    <div className="sub-div-sb">
                                        <p className="con-so-section-2 gradient-text">01</p>
                                        <p className="sub-title-section-3">ưu thế thông tin</p>
                                        <ul className="ul-content-section-3">
                                            <li className="li-content-section-3">Nắm bắt <span className="gradient-text font-weight-bolder">Biến số cốt lõi</span>: Giám sát <span className="gradient-text font-weight-bolder">Cá Voi, VC, Order Book</span>. Thấu hiểu hành vi dòng tiền ẩn.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="block-khoi-div-uu-the">
                                    <div className="sub-div-sb">
                                        <p className="con-so-section-2 gradient-text">02</p>
                                        <p className="sub-title-section-3">Hệ thống hóa</p>
                                        <ul className="ul-content-section-3">
                                            <li className="li-content-section-3">AI Tự Động: Thực thi dựa trên <span className="gradient-text font-weight-bolder">Logic + Quy tắc + Quản trị rủi ro</span>, loại bỏ hoàn toàn cảm tính (tham lam/sợ hãi).</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="block-khoi-div-uu-the block-khoi-div-uu-the-gray">
                                    <div className="sub-div-sb">
                                        <p className="con-so-section-2 gradient-text">03</p>
                                        <p className="sub-title-section-3">Kiểm chứng</p>
                                        <ul className="ul-content-section-3">
                                            <li className="li-content-section-3"><span className="gradient-text font-weight-bolder">Tỷ Lệ Thắng Ổn Định</span>: Kiểm chứng bằng <span className="gradient-text font-weight-bolder">Backtesting</span> (quá khứ) và <span className="gradient-text font-weight-bolder">Real-time</span> (thực tế), có lịch sử giao dịch <span className="gradient-text font-weight-bolder">minh bạch</span>.</li>
                                        </ul>
                                    </div>   
                                </div>
                            </div>
                            <div className="block-khoi-div-uu-the-container flex">
                                <div className="block-khoi-div-uu-the">
                                    <div className="sub-div-sb">
                                        <p className="con-so-section-2 gradient-text">04</p>
                                        <p className="sub-title-section-3">Đa chiến lược</p>
                                        <ul className="ul-content-section-3">
                                            <li className="li-content-section-3"><span className="gradient-text font-weight-bolder">Linh hoạt</span>: Tích hợp <span className="gradient-text font-weight-bolder">Đa chiến lược</span> (Trend, Chênh lệch, Hedging) để thích ứng với mọi giai đoạn thị trường <span className="gradient-text font-weight-bolder">(tăng/giảm mạnh, đi ngang)</span>.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="block-khoi-div-uu-the block-khoi-div-uu-the-gray">
                                    <div className="sub-div-sb">
                                        <p className="con-so-section-2 gradient-text">05</p>
                                        <p className="sub-title-section-3">Quản trị rủi ro</p>
                                        <ul className="ul-content-section-3">
                                            <li className="li-content-section-3"><span className="gradient-text font-weight-bolder">Kiểm soát Drawdown</span>: Thiết lập <span className="gradient-text font-weight-bolder">ngưỡng sụt giảm vốn</span> (Drawdown), bảo vệ <span className="gradient-text font-weight-bolder">vốn gốc an toàn</span> trong cả điều kiện khắc nghiệt.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="block-khoi-div-uu-the">
                                    <div className="sub-div-sb">
                                        <p className="con-so-section-2 gradient-text">06</p>
                                        <p className="sub-title-section-3">Thực thi đa tài khoản</p>
                                        <ul className="ul-content-section-3">
                                            <li className="li-content-section-3"><span className="gradient-text font-weight-bolder">Tối ưu hóa Vốn</span>: Phân chia các mô hình vào các tài khoản riêng biệt (Tấn công/Ổn định) để tách biệt rủi ro và tối ưu chiến lược.</li>
                                        </ul>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="tai-sao-nen-chon-chien-luoc">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text title-container-opt">
                                        <h3 className="big-text"><span className="gradient-text font-size-64">Ưu thế tầm chiến lược </span><br/><span className="normal-text-p">(Hệ sinh thái khép kín)</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container-display-flex">
                            <div className="uu-the-tam-chien-luoc">
                                <p className="title-uu-the-tam-chien-luoc gradient-text">AI liên tục tự học hỏi</p>
                                <p className="text-uu-the-tam-chien-luoc"><span className="gradient-text font-weight-bolder">Cơ chế Bánh Đà Flywheel</span>: Mỗi giao dịch là tài liệu học tập. Mô hình tự tiến hóa, độ chính xác tăng dần theo thời gian.</p>
                            </div>
                            <div className="uu-the-tam-chien-luoc">
                                <p className="title-uu-the-tam-chien-luoc gradient-text">Khả năng tác động</p>
                                <p className="text-uu-the-tam-chien-luoc"><span className="gradient-text font-weight-bolder">Tham gia Tạo lập</span>: Vốn lớn & HFT (Giao dịch tần suất cao) có thể tạo cú phá vỡ giả, dẫn dắt xu hướng, khiến NĐT nhỏ lẻ ôm bom.</p>
                            </div>
                        </div>
                        <div className="container-display-block">
                            <div className="uu-the-tam-chien-luoc">
                                <p className="title-uu-the-tam-chien-luoc gradient-text">Rào cản cao</p>
                                <ul className="ul-normal">
                                    <li className="li-normal">
                                        <p className="text-uu-the-tam-chien-luoc"><span className="gradient-text font-weight-bolder">Khó có thể sao chép</span>: Yêu cầu ngân sách triệu đô. Đội ngũ thuật toán + Đội ngũ quản trị rủi ro + Hệ thống máy chủ giao dịch là một thể thống nhất, tạo ra lợi thế mang tính hệ thống.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </section>                   
                    
                </div>

        </>
    )
}