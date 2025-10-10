
'use client'
// import { useState } from 'react'
import Link from 'next/link'

export default function SanSangGiaoDich({ onOpenPopup }) {
    return (
        <>
            <section className='san-sang-giao-dich'>
                <div className='san-sang-gd-container'data-aos="fade-up" data-aos-duration={1000}>
                    <img className='img-san-sang-giao-dich' src="https://learningchain.vn/wp-content/uploads/2025/10/sansanggiaodichnivex.webp" alt="san-sang-giao-dich" />
                    <h3 className='title-ssgd'>SẴN SÀNG GIAO DỊCH THÔNG MINH HƠN?</h3>
                    <p className='fs-14 decs text-white text-desc-san-sang' style={{ 'letterSpacing': '0px' }}>Tham gia cộng đồng Nivex ngay hôm nay. Nhận quyền truy cập miễn phí vào toàn bộ kho tri thức của chúng tôi và bắt đầu hành trình trở thành một nhà giao dịch tự tin.</p>
                    {/* <button 
                        className="btn-action btn-action-landingpage-nivex" 
                                    id="button-master-homepg" 
                                    style={{'padding': '13px 25px', 'marginTop': '20px', 'marginBottom': '5%' }}
                                    onClick={onOpenPopup}
                                >
                                    <span>Xem thêm</span>
                                </button> */}
                    <Link className="btn-action" style={{'padding': '13px 25px', 'marginTop': '20px', 'marginBottom': '5%' }} href="#">Tham gia miễn phí</Link>
                    {/* <a 
                        className="btn-action btn-action-landingpage-nivex" 
                        id="button-master-homepg" 
                        style={{'padding': '13px 25px', 'marginTop': '20px', 'marginBottom': '5%' }}
                        onClick={onOpenPopup}
                    >
                        <span>Xem thêm</span>
                    </a> */}
                </div>

            </section>
        </>
    )
}
