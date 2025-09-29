
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SanSangGiaoDich() {
    return (
        <>
            <section className='san-sang-giao-dich'>
                <div className='san-sang-gd-container'>
                    <h3 className='title-ssgd'>SẴN SÀNG GIAO DỊCH THÔNG MINH HƠN?</h3>
                    <p className='fs-14 decs text-white text-desc-san-sang' style={{ 'letterSpacing': '0px' }}>Tham gia cộng đồng Nivex ngay hôm nay. Nhận quyền truy cập miễn phí vào toàn bộ kho tri thức của chúng tôi và bắt đầu hành trình trở thành một nhà giao dịch tự tin.</p>
                    <Link className="btn-action" style={{ 'color':'black', 'padding': '13px 25px', 'marginTop': '20px', 'marginBottom': '5%' }} href="#">Tham gia miễn phí</Link>
                </div>

            </section>
        </>
    )
}
