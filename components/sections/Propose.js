
'use client'
import { useState } from 'react'
// import 'swiper/css/free-mode'
// import 'swiper/css/thumbs'
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
export default function Propose() {
    // const [thumbsSwiper, setThumbsSwiper] = useState(null)

    // // Swiper options for the main slider
    // const mainSwiperOptions = {
    //     spaceBetween: 10,
    //     thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null },
    //     modules: [FreeMode, Navigation, Thumbs],
    // }

    // // Swiper options for the thumbnail slider
    // const thumbnailSwiperOptions = {
    //     modules: [FreeMode, Navigation, Thumbs],
    //     spaceBetween: 10,
    //     slidesPerView: 3,
    //     freeMode: true,
    //     watchSlidesProgress: true,
    // }
    return (
        <>

            <section className="crypto-learning-section propose-section">
                <div className="container">
                    <div className="row">
                            <div className="crypto-content propose">
                                <h2 className='title-propose'>Thuật ngữ đề xuất</h2>
                                
                                <div className="crypto-cards">
                                    <div className="crypto-card crypto-card-propose">
                                        <div className="card-content">
                                            {/* <div className="play-button"> */}
                                            {/* </div> */}
                                            <div className="card-info card-info-propose">
                                                <div className="quotation-mark-propose"></div>
                                                <h4 className='title-propose-card'>ZL-SNARKS</h4>
                                                <p className='text-propose-card'>ZK-SNARKS (viết tắt của Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) là một dạng chứng minh mật mã. Đó là một dạng chứng minh mật mã cho phép một bên truy cập thông tin mà không tiết lộ cách hoặc loại thông tin đã được truy cập.
ZK-SNARKS được thực hiện bằng cách tạo ra một khóa riêng tư hoặc bí mật trước khi một giao dịch mật mã diễn ra. Giao thức mật mã Z-cash sử dụng loại chứng minh mật mã này. Loại chứng minh mật mã này đã được giới thiệu lần đầu trong những năm 1980 như một phương pháp mã hóa.</p>
                                                <div className="card-meta card-meta-propose">
                                                    <a className="author card-button-propose" >Định nghĩa đầy đủ<i className="icon-button-propose"></i></a>
                                                    {/* <span className="date"  >7/9/2025</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="crypto-card crypto-card-propose">
                                        <div className="card-content">
                                            {/* <div className="play-button">
                                            </div> */}
                                            <div className="card-info card-info-propose">
                                                <div className="quotation-mark-propose"></div>
                                                <h4  className='title-propose-card'>Demo Trading</h4>
                                                <p className='text-propose-card'>Giao dịch thử nghiệm là gì?Giao dịch thử nghiệm (demo trading) đề cập đến một hình thức giao dịch mô phỏng cho phép bạn thử giao dịch tiền mã hóa bằng</p>
                                                <div className="card-meta card-meta-propose">
                                                    <a className="author card-button-propose" >Định nghĩa đầy đủ<i className="icon-button-propose"></i></a>
                                                    {/* <span className="date"  >7/9/2025</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="crypto-card crypto-card-propose">
                                        <div className="card-content">
                                            {/* <div className="play-button">
                                            </div> */}
                                            <div className="card-info card-info-propose">
                                                <div className="quotation-mark-propose"></div>
                                                <h4 className='title-propose-card'>Token</h4>
                                                <p className='text-propose-card'>Trong ngữ cảnh giao dịch, một token là một đơn vị giá trị đại diện cho một tài sản hoặc tiện ích cụ thể. Các token thường được tạo và quản lý bằng công nghệ blockchain, một hệ thống sổ cái kỹ thuật số phi tập trung và an toàn.</p>
                                                <div className="card-meta card-meta-propose">
                                                    <a className="author card-button-propose"  >Định nghĩa đầy đủ<i className="icon-button-propose"></i></a>
                                                    {/* <span className="date" >7/9/2025</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn-crypto-card-learning btn-action">Xem thêm</button>
                            </div>
                    </div>
                </div>
            </section>
        </>
    )
}
