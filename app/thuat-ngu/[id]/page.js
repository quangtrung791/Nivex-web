
'use client'
import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import Propose from "@/components/sections/Propose"
import Link from "next/link"
import { useState, useEffect } from "react";
import './chi_tiet_tn.css';

export default function ChiTietThuatNgu({ params }) {
    const { id } = params
    const [term, setTerm] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // useEffect(() => {
    //     fetch(`/api/dictionary/${id}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         if (data.success) {
    //              setTerm(data.data)
    //         }
    //         setLoading(false)
    //     })
    //     .catch(() => setLoading(false))
    // }, [id])
    
    useEffect(() => {
        fetch(`/api/dictionary/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // Nếu data là object có id, keyword, description thì setTerm luôn
                if (data && data.id) {
                    setTerm(data)
                }
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
        <Layout headerStyle={1} footerStyle={2}>
            <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
        </Layout>
        )
    }

    if (!term) {
        return (
        <Layout headerStyle={1} footerStyle={2}>
            <p style={{ textAlign: "center" }}>Không tìm thấy thuật ngữ</p>
        </Layout>
        )
    }
    
    return (
        <>
            <Layout 
                headerStyle={1} 
                footerStyle={2} 
            >
                <div>
                    <section className="blog-details chi-tiet-thuat-ngu">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-md-12 w100">
                                    <div className="blog-main">
                                        <Link href="/thuat-ngu" className="navigate-top link-nav-back-custom">Bảng thuật ngữ &nbsp; {'>'} &nbsp; <span style={{'color' : '#fff'}}>{term.keyword}</span></Link>
                                        <h3 className="title">
                                            {term.keyword}
                                        </h3>
                                        <div className="meta">
                                            <Link href="#" className="category btn-action" style={{'letterSpacing': '0px'}}>Người mới</Link>
                                        </div>
                                        <div className="content">
                                            <p className="main-text-p">
                                                {/* <span className="block">{term.description}</span> */}
                                                <span className="block" dangerouslySetInnerHTML={{ __html: term.description }}></span>
                                                {/* <span className="block">Thuật ngữ "altcoin" viết tắt của "alternative coin" và được sử dụng để miêu tả bất kỳ loại tiền điện tử nào ngoài Bitcoin. Bitcoin là đồng tiền điện tử phi tập trung đầu tiên, và từ khi ra mắt vào năm 2009, hàng ngàn loại tiền điện tử khác đã được tạo ra, được gọi chung là altcoins.</span>

<span className="block" >
    Altcoins tương tự như Bitcoin vì chúng là phi tập trung và sử dụng công nghệ blockchain để ghi và xác nhận giao dịch. Tuy nhiên, chúng thường có cơ chế đồng thuận, thuật toán khai thác và các khác biệt kỹ thuật khác. Những đồng tiền này thường có các tính năng, ứng dụng và mục tiêu riêng của chúng.
Một số altcoins được tạo ra như một nhánh của mã nguồn Bitcoin, có nghĩa là các nhà phát triển đã lấy mã nguồn mở của Bitcoin và sửa đổi để tạo ra một đồng tiền mới. Các altcoin khác được tạo từ đầu, sử dụng mã nguồn và công nghệ blockchain riêng của chúng. Một số ví dụ phổ biến về altcoins bao gồm Ethereum, Litecoin, Ripple và Bitcoin Cash.
</span>

<span className="block">
    Một số altcoins được tạo ra để giải quyết các vấn đề cụ thể mà người tạo tin rằng Bitcoin không thể giải quyết được. Ví dụ, một số altcoins tập trung vào thời gian giao dịch nhanh hơn, phí giao dịch thấp hơn hoặc quyền riêng tư và độ ẩn danh tốt hơn. Một số altcoins khác được tạo ra như một phương tiện để gây quỹ cho một dự án hay một công việc cụ thể.
</span>

<span className="block">
    Đầu tư vào altcoins có thể rủi ro hơn so với đầu tư vào Bitcoin, vì nhiều altcoins không được củng cố chặt chẽ, có vốn hóa thị trường nhỏ hơn và không được sử dụng rộng rãi như Bitcoin. Tuy nhiên, đầu tư vào altcoins cũng có thể đem lại lợi nhuận cao hơn, vì giá của những đồng tiền này có thể tăng đáng kể trong một thời gian ngắn. Điều này là do altcoins có tính chất đầu cơ cao và thị trường ít phát triển hơn thị trường Bitcoin.
</span>

<span className="block" >
    Tóm lại, thuật ngữ "altcoin" được sử dụng để miêu tả bất kỳ loại tiền điện tử nào ngoài Bitcoin. Altcoins tương tự như Bitcoin trong việc phi tập trung và sử dụng công nghệ blockchain, nhưng thường có các cơ chế đồng thuận, thuật toán khai thác và các khác biệt kỹ thuật khác. Một số altcoins được tạo ra như một nhánh của mã nguồn Bitcoin, trong khi các altcoin khác được tạo từ đầu. Nhiều altcoins được tạo ra để giải quyết các vấn đề cụ thể mà Bitcoin không thể giải quyết. Đầu tư vào altcoins có thể rủi ro hơn so với đầu tư vào Bitcoin, nhưng cũng có thể đem lại lợi nhuận cao hơn.    
</span>   */}
                                          </p>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </section>
                   <div>
                     <Propose />
                   </div>
                </div>

            </Layout>
        </>
    )
}