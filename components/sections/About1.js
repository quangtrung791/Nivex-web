
'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
// import { Swiper, SwiperSlide } from "swiper/react"

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
                <div className="about-first-title-container">
                    <h2 className="about-first-title">KHÁM PHÁ <span className="gradient-text">HỆ SINH THÁI HỌC TẬP</span> CỦA BẠN</h2>
                </div>
                <div className="container ai-copy-trade">
                    {/* Các khóa học chuyên sâu */}
                    <div className="row">
                        <div className="col-xl-6 col-md-12 adaptive">
                            <div className="about__content element-1-e-l" style={{'padding-left': '20px'}} data-aos="fade-up" data-aos-duration={1000}>
                                <h3 className="heading"><span style={{'color' : '#BCFE08'}}>CÁC KHÓA HỌC CHUYÊN SÂU</span></h3>
                                <p className="fs-14 decs text-white">
                                   <b>Nivex</b> tự hào góp mặt tại các hội nghị và sự kiện blockchain hàng đầu thế giới, kết nối với các nhà lãnh đạo ngành và mang về những kiến thức chuyên sâu độc quyền cho cộng đồng của mình.
                                </p>
                                <Link href="#" className="btn-action" style={{'padding': '13px 25px'}}>Xem thêm</Link>
                            </div>
                        </div>

                        <div className="col-xl-6 col-md-12 limit-width">
                            <div className="about_image" data-aos="fade-up" data-aos-duration={1000}>                                
                                 <img className="img0-ai pic-1" src="https://learningchain.vn/wp-content/uploads/nivex/framei.png" ></img>
                            </div>
                        </div>

                        <div className="col-xl-6 col-md-12 adaptive-small">
                            <div className="about__content element-1-e-l" style={{'padding-left': '20px'}} data-aos="fade-up" data-aos-duration={1000}>
                                <h3 className="heading"><span style={{'color' : '#BCFE08'}}>CÁC KHÓA HỌC CHUYÊN SÂU</span></h3>
                                <p className="fs-14 decs text-white">
                                   <b>Nivex</b> tự hào góp mặt tại các hội nghị và sự kiện blockchain hàng đầu thế giới, kết nối với các nhà lãnh đạo ngành và mang về những kiến thức chuyên sâu độc quyền cho cộng đồng của mình.
                                </p>
                                <Link href="#" className="btn-action" style={{'padding': '13px 25px'}}>Xem thêm</Link>
                            </div>
                        </div>
                    </div>

                    {/* Sự kiện quốc tế */}
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="about_image" data-aos="fade-up" data-aos-duration={1000}>
                                 {/* <img className="img0-ai" src="https://learningchain.vn/wp-content/uploads/nivex/world_map.svg" ></img> */}
                                
                                 <img className="img0-ai" src="https://learningchain.vn/wp-content/uploads/nivex/world.png" ></img>
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
                        <div className="col-xl-6 col-md-12 limit-width">
                            <div className="about__content" style={{'padding-left': '20px'}} data-aos="fade-up" data-aos-duration={1000}>
                                <h3 className="heading"><span style={{'color' : '#BCFE08'}}>SỰ KIỆN QUỐC TẾ</span></h3>
                                <p className="fs-14 decs text-white">
                                   <b>Nivex</b> tự hào góp mặt tại các hội nghị và sự kiện blockchain hàng đầu thế giới, kết nối với các nhà lãnh đạo ngành và mang về những kiến thức chuyên sâu độc quyền cho cộng đồng của mình.
                                </p>
                                {/* <ul className="list">
                                    <li>
                                        <img className="ai-icon-small" src="/assets/images/icon/coin_ico.svg" />
                                        <div>
                                            <h6 className="title" style={{'marginBottom': '0'}}>
                                                <span className="icon-check" />
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
                                                <span className="icon-check" />
                                                Futures AI 
                                            </h6>
                                            <p className="fs-14 text">
                                                Giao dịch hợp đồng có <b>đòn bẩy linh hoạt</b>, theo dõi ký quỹ và cảnh báo thời gian thực; AI hỗ trợ đọc tín hiệu để <b>kiểm soát rủi ro</b> tốt hơn.
                                            </p>
                                        </div>
                                    </li>
                                </ul> */}
                                <Link href="#" className="btn-action" style={{'padding': '13px 25px'}}>Xem thêm</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
