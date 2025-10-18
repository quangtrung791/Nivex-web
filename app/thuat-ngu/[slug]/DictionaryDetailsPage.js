
'use client'
import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import Propose from "@/components/sections/Propose"
import Link from "next/link"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"
import './chi_tiet_tn.css';

export default function ChiTietThuatNgu() {
    // const { slug } = params
    const { slug } = useParams();
    const [term, setTerm] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (!slug) return;
        fetch(`/api/dictionary/${encodeURIComponent(slug)}`)
          .then(res => res.json())
          .then(payload => {
            if (payload?.success && payload.data?.slug) {
              setTerm(payload.data);
            } else {
              setTerm(null);
            }
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }, [slug]);

    if (loading) {
        return (
            <>
                <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
            </>
        )
    }

    if (!term) {
        return (
            <>
                <p style={{ textAlign: "center" }}>Không tìm thấy thuật ngữ</p>
            </>
        )
    }
    
    return (
        <>
            {/* <Layout 
                headerStyle={1} 
                footerStyle={2} 
            > */}
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
                                            <Link href="#" className="category btn-action" style={{'letterSpacing': '0px'}}>Giải thích thuật ngữ</Link>
                                        </div>
                                        <div className="content">
                                            <p className="main-text-p">
                                                <span className="dictionary-details-display-markdown block" dangerouslySetInnerHTML={{ __html: term.description }}></span>
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

            {/* </Layout> */}
        </>
    )
}