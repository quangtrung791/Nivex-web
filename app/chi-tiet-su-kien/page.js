'use client'
import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import ChatList from "@/components/chart/ChatList"
import IconStar from "@/components/elements/IconStar"
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import styles from '../kien-thuc-tong-quan/knowledge.module.css'
import './style.css';


export default function SuKienOption2() {
//    const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetch('/data.json')
//             .then(res => res.json())
//             .then(json => {
//                 // Sắp xếp theo revenue giảm dần
//                 const sorted = json.users.sort((a, b) => b.revenue - a.revenue);
//                 setUsers(sorted);
//             });
//     }, []);
    const [flatTabs, setFlatTabs] = useState(1)
    const [flatTabs1, setFlatTabs1] = useState(1)
    const [flatTabs2, setFlatTabs2] = useState(1)
    const [flatTabs3, setFlatTabs3] = useState(1)
    const handleFlatTabs = (index) => {
        setFlatTabs(index)
    }
    const handleFlatTabs1 = (index) => {
        setFlatTabs1(index)
    }
    const handleFlatTabs2 = (index) => {
        setFlatTabs2(index)
    }
    const handleFlatTabs3 = (index) => {
        setFlatTabs3(index)
    }

    return (
        <>

            <Layout headerStyle={1} footerStyle={2} >
                <div>
                    <section className="banner-section">
                        <div>
                            <img src='https://learningchain.vn/wp-content/uploads/nivex/banner_proto.png' className="banner-img" />
                        </div>
                        <div className="countdown-container">
                            <p className="countdown-text">Sự kiện kết thúc sau &nbsp;</p>
                            <p className="time-countdown">00 ngày 00:00:00</p>
                        </div>
                    </section>
                    <section className="thong-tin-su-kien">
                        <h3 className="thong-tin-title">
                            THÔNG TIN SỰ KIỆN
                        </h3>
                        <p className="thong-tin-content">
                            Khám phá 3 chiến lược AI của Nivex, tối ưu hóa lợi nhuận và tự động quản lý rủi ro từ giao dịch xu hướng đến altcoin và tần số cao.
                        </p>
                        <div className="child-image-container">
                            <img src='https://learningchain.vn/wp-content/uploads/nivex/banner_proto.png' className="child-img" />
                        </div>
                    </section>

                    <section className="bang-xep-hang">
                         <div className="content-tab1">
                                            <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "block"}` }}>
                                                <div className="flat-tabs2">
                                                   
                                                    <div className="content-tab2">
                                                        <div className="content-inner" style={{ display: `${flatTabs2 === 1 ? "block" : "block"}` }}>
                                                            <div className="coin-list__main">
                                                                <div className="flat-tabs bxh-container">
                                                                    <h3 className="text-center"><span className="gradient-text">
                                                                        <img src='https://learningchain.vn/wp-content/uploads/nivex/fra-in.svg' />
                                                                        &nbsp;TOP NHÀ GIAO DỊCH </span>DẪN ĐẦU CUỘC THI &nbsp;
                                                                        <img src='https://learningchain.vn/wp-content/uploads/nivex/fra-out.svg' />
                                                                    </h3>
                                                                    <p className="text-center bxh-desc">BXH những anh tài có lợi nhuận cao nhất được cập nhật hàng ngày.</p>
                                                                    <div className="content-tab bxh">
                                                                        <div className="content-inner" style={{ display: `${flatTabs3 === 1 ? "block" : "block"}` }}>
                                                                            <table className="table">
                                                                                <thead>
                                                                                    <tr>
                                                                                        {/* <th scope="col" /> */}
                                                                                        <th scope="col">HẠNG</th>
                                                                                        <th scope="col">NICKNAME</th>
                                                                                        <th scope="col">USER ID</th>
                                                                                        <th scope="col">DOANH THU</th>
                                                                                        <th scope="col">PnL%</th>
                                                                                        <th scope="col">TIỀN THƯỞNG</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr className="tr-top-1">
                                                                                        <td>
                                                                                            <img className="cup-champ" src="https://learningchain.vn/wp-content/uploads/nivex/1st.png" />
                                                                                        </td>
                                                                                        <td>
                                                                                           user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>

                                                                                    <tr  className="tr-top-2">
                                                                                        <td>
                                                                                            <img className="cup-champ" src="https://learningchain.vn/wp-content/uploads/nivex/2nd.png" />
                                                                                        </td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                    <tr className="tr-top-3">
                                                                                        <td>
                                                                                            <img className="cup-champ" src="https://learningchain.vn/wp-content/uploads/nivex/3rd.png" />
                                                                                        </td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;4</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;5</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;6</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;7</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;8</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;9</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;10</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;11</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;12</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;13</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;14</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;15</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;16</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;17</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;18</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;19</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                   <tr>
                                                                                        <td className="normal-rank-number">&nbsp;&nbsp;20</td>
                                                                                        <td>
                                                                                            user name 09123124 
                                                                                        </td>
                                                                                        <td className="boild">2.236</td>
                                                                                       
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td className="boild">5.04B(USD)</td>
                                                                                        <td>2.000.000 VND</td>
                                                                                    </tr>
                                                                                   
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                    </section>
                    
                   
                </div>

            </Layout>
        </>
    )
}