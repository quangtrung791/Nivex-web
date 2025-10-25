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
                    <section className="banner-sect-tim-hieu-ve-tiem-nang-loi-nhuan banner-section-flexible">
                        <div className="li-xi-nivex-super-title">
                            <h2 className="banner-title">Tìm hiểu <span className="gradient-text">tiềm năng lợi nhuận</span></h2>
                        </div>
                    </section>

                    <section className="content-tao-bao-tiem-nang-loi-nhuan">
                        <div className="container container-flexible">
                            <div className="row giai-thich-y-nghia-bao-li-xi">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text big-text-tiem-nang-loi-nhuan">Giải thích về <span className="gradient-text">tần suất giao dịch: </span><span className="break-line">Dựa trên số liệu thống kê thực tế</span></h3>
                                        <p className="text-welcome-main-2 text-dele-1">Sản phẩm Copy Trade cấp tổ chức của Nivex được cung cấp tín hiệu bởi đội ngũ giao dịch định lượng chuyên nghiệp. Người dùng chỉ cần liên kết vốn, hệ thống sẽ tự động “sao chép giao dịch” toàn phần. </p><br />
                                        <p className="text-welcome-main-2">Dựa trên dữ liệu lịch sử được đội ngũ kỹ thuật phân tích, với các mức vốn khác nhau, tần suất giao dịch trung bình mỗi tháng như sau:</p>
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

                    <section className="content-tao-bao-tiem-nang-loi-nhuan">
                        <div className="container container-flexible">
                            <div className="row giai-thich-y-nghia-bao-li-xi">
                                <div className="col-md-12" style={{'paddingLeft': 0,'paddingRight': 0}}>
                                    <div className="block-text">
                                        <h3 className="big-text big-text-tiem-nang-loi-nhuan">Ví dụ <span className="gradient-text">ước tính phí giao dịch </span>trên nền tảng<span className="break-line">(Cơ sở tính hoàn phí/hoa hồng)</span></h3>
                                        <p className="text-welcome-main-2">Trong cơ chế Copy Trade tổ chức tại Nivex: Phí giao dịch mỗi lệnh = 0,05%</p>
                                        <p className="text-welcome-main-2">Do mô hình giao dịch 2 chiều (mở long, mở short, đóng long, đóng short), một vòng giao dịch trọn vẹn sẽ phát sinh 4 lần phí: 0,05% x 4 = 0,2% (Phí cho mỗi vòng giao dịch hoàn chỉnh)</p> <br/>
                                        <p className="text-welcome-main-2">Ví dụ 3 kịch bản ước tính:</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <table className="table-tiem-nang-loi-nhuan">
                                <thead className="thead-table-tiem-nang">
                                    <tr className="tr-table-tiem-nang">
                                        <th className="th-table-tiem-nang-2">Giao dịch tần suất cao</th>
                                        <th className="th-table-tiem-nang-2">Giao dịch tần suất trung bình</th>
                                        <th className="th-table-tiem-nang-2">Giao dịch tần suất thấp</th>
                                    </tr>
                                </thead>

                                <tbody className="tbody-table-tiem-nang">
                                    <tr className="tr-table-tiem-nang">
                                        <td className="td-table-tiem-nang-2">500 người × $200 × 40% vốn sử dụng = 40.000 USDT</td>
                                        <td className="td-table-tiem-nang-2">100 người × $1.000 × 40% = 40.000 USDT</td>
                                        <td className="td-table-tiem-nang-2">20 người × $5.000 × 40% = 40.000 USDT</td>
                                    </tr>
                                    <tr className="tr-table-tiem-nang">
                                        <td className="td-table-tiem-nang-2">40.000 × 30× (đòn bẩy) × 2 (số lần phí mở/đóng) × 30 lệnh/tháng = 72.000.000 USDT khối lượng</td>
                                        <td className="td-table-tiem-nang-2">40.000 × 15 × 2 × 15 lệnh/tháng = 18.000.000 USD khối lượng</td>
                                        <td className="td-table-tiem-nang-2">40.000 × 10 × 2 × 10 lệnh/tháng = 8.000.000 USDT khối lượng</td>
                                    </tr>
                                    <tr className="tr-table-tiem-nang">
                                        <td className="td-table-tiem-nang-2">72.000.000 × 0,05% = 36.000 USDT phí thực trả</td>
                                        <td className="td-table-tiem-nang-2">18.000.000 × 0,05% = 9.000 USDT phí thực trả</td>
                                        <td className="td-table-tiem-nang-2">8.000.000 × 0,05% = 400 USD phí thực trả</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="italic-text-tiem-nang-loi-nhuan ">
                            {/* <p>Lưu ý:</p> */}
                            <ul>
                                <li>Cách tính hoa hồng đại lý (ví dụ mức rebate 30%): Hoa hồng = Tổng phí × Tỷ lệ rebate</li>
                                <li>Ví dụ: Trường hợp trung bình: 9.000 × 30% = 2.700 USDT/tháng.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="tuyen-bo-su-dung-du-lieu">
                        <p className="title-su-dung-du-lieu">Tuyên bố <span className="gradient-text">sử dụng dữ liệu</span> (Disclaimer)</p>
                        <ul className="list-su-dung-du-lieu">
                            <li className="text-su-dung-du-lieu">Tất cả dữ liệu trong tài liệu này được thống kê & mô hình hóa từ lịch sử giao dịch bởi đội ngũ kỹ thuật Nivex, chỉ nhằm tham khảo cho đại lý trong việc ước tính quy mô thị trường.</li>
                            <li className="text-su-dung-du-lieu">Tần suất giao dịch, phí phát sinh và lợi nhuận thực tế có thể bị ảnh hưởng bởi: biến động thị trường, điều chỉnh chiến lược, thao tác của người dùng...</li>
                            <li className="text-su-dung-du-lieu">Nivex không cam kết bất kỳ mức lợi nhuận hay khoản phí nào. Đại lý cần tự đánh giá và theo dõi thực tế.</li>
                            <li className="text-su-dung-du-lieu">Người dùng phải tuân thủ chuẩn rủi ro & quy định pháp lý của nền tảng. Các hành vi lạm dụng sẽ không được hoàn trả hoa hồng.</li>
                        </ul>
                    </section>

                    <section className="tuyen-bo-su-dung-du-lieu">
                        <p className="title-su-dung-du-lieu">Kết luận:</p>
                        <div className="big-text-ket-luan gradient-text">
                            <div className="von-va-so-luong-deu-quan-trong-container">
                                <img className="von-va-so-luong-deu-quan-trong-img" src="/assets/images/icon/tamgiac.png" />
                                <p className="">Vốn và số lượng người dùng đều quan trọng</p>
                            </div>
                            <div className="von-va-so-luong-deu-quan-trong-container">
                                <img className="von-va-so-luong-deu-quan-trong-img" src="/assets/images/icon/tamgiac.png" />
                                <p className="content-text-ket-luan">Vốn lớn mang lại lợi nhuận vượt trội!</p>
                            </div>
                        </div>
                        <ul className="">
                            <li className="text-welcome-main-2">Một số đại lý thường hiểu nhầm rằng “muốn có khối lượng lớn thì phải thu hút nhiều người vốn nhỏ”.</li>
                            <li className="text-welcome-main-2">Thực tế:</li>
                        </ul>

                        <table className="table-tiem-nang-loi-nhuan">
                                {/* <caption>Cap</caption> */}
                                <thead className="thead-table-tiem-nang">
                                    <tr className="tr-table-tiem-nang">
                                        <th className="th-table-tiem-nang  padding-cust">Người dùng vốn nhỏ</th>
                                        <th className="th-table-tiem-nang padding-cust">Người dùng vốn lớn</th>
                                    </tr>
                                </thead>

                                <tbody className="tbody-table-tiem-nang">
                                    <tr className="tr-table-tiem-nang">
                                        <td className="td-table-tiem-nang padding-cust">$200 × 40% × 30× đòn bẩy × 2 (phí mở/đóng) × 30 lệnh = 14.400 USD khối lượng</td>
                                        <td className="td-table-tiem-nang padding-cust">15 - 30 lần/tháng</td>
                                    </tr>
                                    <tr className="tr-table-tiem-nang">
                                        <td className="td-table-tiem-nang padding-cust">→ 14.400 × 0,05% = 72 USDT phí</td>
                                        <td className="td-table-tiem-nang padding-cust">→ 2.400.000 × 0,05% = 1.200 USDT phí</td>
                                    </tr>
                                    
                                </tbody>
                        </table>
                        <p className="text-su-dung-du-lieu" style={{ 'fontStyle': 'italic' }}>Một người vốn lớn dù giao dịch ít hơn, nhưng tạo ra phí gấp hơn 15 lần so với người vốn nhỏ!</p>

                    </section>

                </div>

        </>
    )
}