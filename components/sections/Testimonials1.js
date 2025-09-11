
'use client'
import { useState } from 'react'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
export default function Testimonials1() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    // Swiper options for the main slider
    const mainSwiperOptions = {
        spaceBetween: 10,
        thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null },
        modules: [FreeMode, Navigation, Thumbs],
    }

    // Swiper options for the thumbnail slider
    const thumbnailSwiperOptions = {
        modules: [FreeMode, Navigation, Thumbs],
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
    }
    return (
        <>

            <section className="crypto-learning-section">
                <div className="container">
                    <div className="row">
                            <div className="crypto-content">
                                <h2 className='text-uppercase'>Tiền Mã Hóa Cho Người <span className="text-primary-crypto">Mới Bắt Đầu</span></h2>
                                <p className="subtitle fs-14" style={{'color': '#A6AAB7'}}>Bước vào thế giới blockchain từ con số 0</p>
                                
                                <div className="crypto-cards">
                                    <div className="crypto-card">
                                        <div className="card-content">
                                            <div className="play-button">
                                            </div>
                                            <div className="card-info">
                                                <span className="tag">Learn & Earn</span>
                                                <h4 className='title-video-homepage'>Learn about UI8 coin and earn an all Access Pass</h4>
                                                <div className="card-meta">
                                                    <span className="author" ><i className="icon-author"></i>Floyd Buckridge</span>
                                                    <span className="date"  >7/9/2025</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="crypto-card">
                                        <div className="card-content">
                                            <div className="play-button">
                                            </div>
                                            <div className="card-info">
                                                <span className="tag">Learn & Earn</span>
                                                <h4  className='title-video-homepage'>Cryptocurrency Trading for Beginners</h4>
                                                <div className="card-meta">
                                                    <span className="author" ><i className="icon-author"></i>Sarah Johnson</span>
                                                    <span className="date"  >7/9/2025</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="crypto-card">
                                        <div className="card-content">
                                            <div className="play-button">
                                            </div>
                                            <div className="card-info">
                                                <span className="tag">Learn $ Earn</span>
                                                <h4 className='title-video-homepage'>Blockchain Technology Fundamentals</h4>
                                                <div className="card-meta">
                                                    <span className="author"  ><i className="icon-author"></i>Michael Chen</span>
                                                    <span className="date" >7/9/2025</span>
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
