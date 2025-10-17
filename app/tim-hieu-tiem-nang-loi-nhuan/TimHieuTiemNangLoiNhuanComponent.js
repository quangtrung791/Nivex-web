'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import './style.css'

export default function TimHieuTiemNangLoiNhuan() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <>
                <div>
                    <section className="banner-tao-bao-li-xi-nivex-huong-dan banner-section-flexible">
                        <div className="li-xi-nivex-super-title">
                            <h2 className="banner-title">Tìm hiểu <span className="gradient-text">tiềm năng lợi nhuận</span></h2>
                        </div>
                    </section>

                    <section className="content-tao-bao-li-xi-nivex-huong-dan">
                        <div className="container container-flexible">
                            <div className="row giai-thich-y-nghia-bao-li-xi">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text">Giải thích về <span className="gradient-text">tần suất giao dịch: </span><span className="break-line">Dựa trên số liệu thống kê thực tế</span></h3>
                                        <p className="text-welcome-main">Sản phẩm Copy Trade cấp tổ chức của Nivex được cung cấp tín hiệu bởi đội ngũ giao dịch định lượng chuyên nghiệp. Người dùng chỉ cần liên kết vốn, hệ thống sẽ tự động “sao chép giao dịch” toàn phần. </p><br />
                                        <p className="text-welcome-main">Dựa trên dữ liệu lịch sử được đội ngũ kỹ thuật phân tích, với các mức vốn khác nhau, tần suất giao dịch trung bình mỗi tháng như sau:</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <table className="table-tiem-nang-loi-nhuan">
                                {/* <caption>Cap</caption> */}
                                <thead className="thead-table-tiem-nang">
                                    <tr className="tr-table-tiem-nang">
                                        <th className="th-table-tiem-nang">Vốn người dùng (USD)</th>
                                        <th className="th-table-tiem-nang">Tần suất giao dịch TB/tháng</th>
                                    </tr>
                                </thead>

                                <tbody className="tbody-table-tiem-nang">
                                    <tr className="tr-table-tiem-nang">
                                        <td className="td-table-tiem-nang">$200 - $1,000</td>
                                        <td className="td-table-tiem-nang">15 - 30 lần/tháng</td>
                                    </tr>
                                    <tr className="tr-table-tiem-nang">
                                        <td className="td-table-tiem-nang">$200 - $1,000</td>
                                        <td className="td-table-tiem-nang">~15 lần/tháng</td>
                                    </tr>
                                    <tr className="tr-table-tiem-nang">
                                        <td className="td-table-tiem-nang">$200 - $1,000</td>
                                        <td className="td-table-tiem-nang">~10 lần/tháng</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="italic-text-tiem-nang-loi-nhuan special-italic-tiem-nang-ln">
                            <p>Lưu ý:</p>
                            <ul>
                                <li>Mỗi chiến lược tổ chức có logic giao dịch khác nhau, vì vậy tần suất có thể dao động.</li>
                                <li>Các số liệu trên chỉ mang tính trung bình, không cấu thành cam kết lợi nhuận hay khuyến nghị đầu tư.</li>
                            </ul>
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