'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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
                                <h2 className="title" style={{'textTransform': 'uppercase', 'letterSpacing' : '0.75px', 'lineHeight': '1.2'}}>
                                        <span className="block" style={{'minWidth': '700px'}}>Cập nhật các kiến thức</span>
                                        <span className="block">về AI trong giao dịch</span>
                                        <span className="block">tiền mã hóa</span>
                                </h2>
                                <p className="fs-14 desc">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <Link href="#" className="btn-action" id="button-master-homepg" style={{'borderRadius':'0px'}}><span class="btn-master-homepg">Xem thêm</span></Link>
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
                                <img className="logo-robot-mc" src="https://learningchain.vn/wp-content/uploads/nivex/logo_mc.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
