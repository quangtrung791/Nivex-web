
'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
}

export default function About1() {
    return (
        <>

            <section className="about">
                <div className="container ai-copy-trade">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="about_image">
                                 {/* <img className="img0-ai" src="https://learningchain.vn/wp-content/uploads/nivex/world_map.svg" ></img> */}
                                
                                 <img className="img0-ai" src="/assets/images/background/world_map_homepage.webp" ></img>
                                {/* <div className="swiper img-swiper">
                                    <Swiper {...swiperOptions} className="swiper-wrapper">
                                        <SwiperSlide>
                                            <img className="img-main" src="/assets/images/layout/about-h1.png" alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-main" src="/assets/images/layout/about-h1.png" alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-main" src="/assets/images/layout/about-h1.png" alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-main" src="/assets/images/layout/about-h1.png" alt="" />
                                        </SwiperSlide>
                                    </Swiper>
                                    <div className="swiper-pagination" />
                                </div> */}
                                {/* <img className="icon icon-1" src="/assets/images/icon/icon-01.png" alt="" />
                                <img className="icon icon-2" src="/assets/images/icon/icon-02.png" alt="" />
                                <img className="icon icon-3" src="/assets/images/icon/icon-03.png" alt="" />
                                <img className="icon icon-4" src="/assets/images/icon/icon-04.png" alt="" />
                                <img className="icon icon-5" src="/assets/images/icon/icon-05.png" alt="" /> */}
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="about__content" style={{'padding-left': '20px'}} data-aos="fade-up" data-aos-duration={1000}>
                                <h3 className="heading"><span style={{'color' : '#BCFE08'}}>AI Copy Trade</span> của Nivex</h3>
                                <p className="fs-14 decs">
                                   Nivex mang đến bộ công cụ <b>sao chép giao dịch được AI hỗ trợ</b>. Hệ thống phân tích dữ liệu theo thời gian thực để gợi ý chiến lược <b>phù hợp khẩu vị rủi ro</b>. Bạn luôn chủ động phân bổ vốn, đặt chốt lời/dừng lỗ và có thể dừng sao chép bất cứ lúc nào.
                                </p>
                                <ul className="list">
                                    <li>
                                        <img className="ai-icon-small" src="/assets/images/icon/coin_ico.svg" />
                                        <div>
                                            <h6 className="title" style={{'marginBottom': '0'}}>
                                                {/* <span className="icon-check" /> */}
                                                Spot AI
                                            </h6>
                                            <p className="fs-14 text">
                                                Hỗ trợ nhiều cặp tiền và công cụ quản trị rủi ro linh hoạt, giúp giữ kỷ luật khi thị trường biến động.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <img className="ai-icon-small" src="/assets/images/icon/brain_ico.svg" />
                                        <div>
                                            <h6 className=" title" style={{'marginBottom': '0'}}>
                                                {/* <span className="icon-check" /> */}
                                                Futures AI 
                                            </h6>
                                            <p className="fs-14 text">
                                                Giao dịch hợp đồng có đòn bẩy linh hoạt, theo dõi ký quỹ và cảnh báo thời gian thực; AI hỗ trợ đọc tín hiệu để kiểm soát rủi ro tốt hơn.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <Link href="#" className="btn-action" style={{'color':'black', 'padding': '13px 25px'}}>Tìm hiểu AI Copy Trade</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
