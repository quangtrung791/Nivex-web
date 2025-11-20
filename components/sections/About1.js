
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
                                <Link href="/khoa-hoc" className="btn-action" style={{'padding': '13px 25px'}}>Xem thêm</Link>
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
                                <Link href="/khoa-hoc" className="btn-action" style={{'padding': '13px 25px'}}>Xem thêm</Link>
                            </div>
                        </div>
                    </div>

                    {/* Sự kiện quốc tế */}
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="about_image" data-aos="fade-up" data-aos-duration={1000}>
                                 {/* <img className="img0-ai" src="https://learningchain.vn/wp-content/uploads/nivex/world_map.svg" ></img> */}
                                
                                 <img className="img0-ai" src="https://learningchain.vn/wp-content/uploads/nivex/world.png" ></img>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12 limit-width">
                            <div className="about__content" style={{'padding-left': '20px'}} data-aos="fade-up" data-aos-duration={1000}>
                                <h3 className="heading"><span style={{'color' : '#BCFE08'}}>SỰ KIỆN QUỐC TẾ</span></h3>
                                <p className="fs-14 decs text-white">
                                   <b>Nivex</b> tự hào góp mặt tại các hội nghị và sự kiện blockchain hàng đầu thế giới, kết nối với các nhà lãnh đạo ngành và mang về những kiến thức chuyên sâu độc quyền cho cộng đồng của mình.
                                </p>
                                <Link href="/su-kien-tham-gia" className="btn-action" style={{'padding': '13px 25px'}}>Xem thêm</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
