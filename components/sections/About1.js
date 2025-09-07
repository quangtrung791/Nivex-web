
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
                            <div className="about_image" style={{'marginLeft' :'5%'}}>
                                <img src="https://learningchain.vn/wp-content/uploads/nivex/world_map.svg" ></img>
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
                            <div className="about__content" data-aos="fade-up" data-aos-duration={1000}>
                                <h3 className="heading"><span style={{'color' : '#BCFE08'}}>AI Copy Trade</span> của Nivex</h3>
                                <p className="fs-14 decs">
                                   Nivex cung cấp công cụ giao dịch tự động dựa trên AI, phân tích dữ liệu thị trường theo thời gian thực để đưa ra khuyến nghị cá nhân hóa và tối ưu lợi nhuận. Hệ thống được cập nhật hàng tuần, luôn duy trì các chiến lược mới nhất.
                                </p>
                                <ul className="list">
                                    <li>
                                        <h6 className="title">
                                            <span className="icon-check" />Spot AI
                                        </h6>
                                        <p className="fs-14 text">
                                            Hỗ trợ đa dạng tiền tệ và cung cấp công cụ quản lý linh hoạt hơn, giúp người dùng tối ưu cơ hội trong biến động thị trường.
                                        </p>
                                    </li>
                                    <li>
                                        <h6 className=" title">
                                            <span className="icon-check" />Feature AI
                                        </h6>
                                        <p className="fs-14 text">
                                            Cung cấp đòn bẩy linh hoạt, phí thấp và phân tích thông minh, hỗ trợ giao dịch hiệu quả và chính xác hơn trong thị trường biến động.
                                        </p>
                                    </li>
                                </ul>
                                <Link href="#" className="btn-action" style={{'color':'black'}}>Tìm hiểu ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
