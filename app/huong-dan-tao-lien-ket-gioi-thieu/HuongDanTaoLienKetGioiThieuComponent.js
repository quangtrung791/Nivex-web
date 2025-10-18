'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import './LienKetGioiThieu.css'

export default function HDLienKetGioiThieuComponent() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <>
                <div>
                    <section className="banner-tao-lien-ket-gioi-thieu">
                        <h2 className="banner-title">Tạo <span className="gradient-text">liên kết giới thiệu</span></h2>
                    </section>
                    <section className="content-tao-lien-ket-gioi-thieu">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text">Cách tạo <span className="gradient-text">Liên kết giới thiệu</span></h3>
                                        <ul className="ul-chi-tiet-tao-lien-ket-gioi-thieu">
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Đăng nhập vào tài khoản Nivex của bạn và đi đến trang “Tài khoản của tôi”.</li>
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Tìm tùy chọn “Mời bạn bè” hoặc “Tạo liên kết mời”.</li>
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Nhấp vào nút “Tạo liên kết” hoặc “Lấy liên kết mời của tôi”.</li>
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Hệ thống sẽ cung cấp cho bạn một liên kết giới thiệu riêng dành cho bạn, bạn có thể chia sẻ nó với bạn bè hoặc quảng bá trên mạng xã hội.</li>
                                        </ul>
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
                                        <h3 className="big-text">Quy tắc <span className="gradient-text">tính Hoa hồng</span></h3>
                                        <ul className="ul-chi-tiet-tao-lien-ket-gioi-thieu">
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Khi bạn bè của bạn đăng ký và giao dịch thông qua liên kết giới thiệu của bạn, bạn sẽ nhận được hoa hồng từ phí giao dịch theo quy định của Nivex.</li>
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Tỷ lệ hoa hồng có thể khác nhau tùy thuộc vào cấp VIP hoặc quy định của hoạt động. </li>
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Hoa hồng thường được tính dựa trên phí giao dịch thực tế của người được mời và sẽ được ghi nhận vào tài khoản của bạn sau khi quyết toán vào ngày hôm sau.</li>
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Thời hạn nhận hoa hồng thường được tính từ thời điểm người được mời đăng ký và có thể có giới hạn thời gian cụ thể trong một số hoạt động nhất định.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content-tao-lien-ket-gioi-thieu last-section-hdlkgt">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text">Xem <span className="gradient-text">Lịch sử giới thiệu & Phần thưởng</span></h3>
                                        <ul className="ul-chi-tiet-tao-lien-ket-gioi-thieu">
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Đăng nhập vào tài khoản Nivex của bạn và đi đến trang “Tài khoản của tôi”.</li>
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Trong mục “Lịch sử giới thiệu”, bạn có thể xem lịch sử giới thiệu của mình và phần thưởng giới thiệu bạn đã nhận được.</li>
                                            <li className="desc chi-tiet-tao-lien-ket-gioi-thieu">Bạn cũng có thể xem lịch sử hoa hồng và số dư hoa hồng khả dụng.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

        </>
    )
}