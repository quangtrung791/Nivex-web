'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react";
import './add.css';

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 60,
        },
    },
    slidesPerView: 4,
}

export default function Banner1() {
    return (
        <>

            <section className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="banner__content">
                                <h2 className="title_nivex_hub gradient-text">Nivex HUB</h2>
                                <h2 className="title" style={{'textTransform': 'uppercase', 'letterSpacing' : '-0.75px'}}>
                                        <span className="block">Nền tảng tri thức cho </span>
                                        <span className="block"> Kỷ Nguyên <span className="gradient-text">Giao Dịch AI</span> </span>
                                        {/* <span className="block"> tiền mã hóa </span> */}
                                </h2>
                                <p className="fs-14 desc main-description">
                                    Kiến thức dễ hiểu cho người mới, tin tức chọn lọc mỗi ngày và lớp học trực tuyến hàng tuần.
Cùng khám phá Nivex & AI Copy Trade – nơi bạn không chỉ nhận công cụ, mà còn được trang bị nền tảng kiến thức và sự tự tin để đưa ra những quyết định giao dịch thông minh trong kỷ nguyên số.
                                </p>
                                <Link href="#" className="btn-action" id="button-master-homepg" style={{'borderRadius':'0px'}}><span className="btn-master-homepg">Xem thêm</span></Link>
                                {/* <div className="partner">
                                    <h6>Our Partners</h6>
                                    <div className="partner__list">
                                        <div className="swiper swiper-partner">
                                            <Swiper {...swiperOptions} className="swiper-wrapper">
                                                <SwiperSlide>
                                                    <Link href="#"><img src="/assets/images/partner/logo-01.png" alt="" /></Link>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Link href="#"><img src="/assets/images/partner/logo-02.png" alt="" /></Link>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Link href="#"><img src="/assets/images/partner/logo-03.png" alt="" /></Link>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Link href="#"><img src="/assets/images/partner/logo-04.png" alt="" /></Link>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Link href="#"><img src="/assets/images/partner/logo-01.png" alt="" /></Link>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="banner__image">
                                <img className="logo-robot-mc" src="https://learningchain.vn/wp-content/uploads/nivex/cocktail.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
