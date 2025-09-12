
// import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import Propose from "@/components/sections/Propose"
import Link from "next/link"
import '../chi_tiet_tn.css'

    async function getPost(slug) {
       try {
            const res = await fetch(`http://127.0.0.1:4001/api/posts/${slug}`, {
                cache: "no-store", // luôn fetch data mới
            });
            // if (!res.ok) throw new Error("Failed to fetch post");
            if (!res.ok) {
                console.warn("API lỗi:", res.statusText);
                return null; // fallback data
            }

            return await res.json();
       }
       catch (err) {
            console.error("Không fetch được posts:", err);
            return null; // fallback data
       }
    }

export default async function ChiTietThuatNgu({ params }) {
    // const post = await getPost(1); // ví dụ lấy bài có id = 1
    const { slug } = params; // lấy slug từ tham số parameter URL
    const post = await getPost(slug);
    if (!post) {
        return (
        <Layout headerStyle={1} footerStyle={2}>
            <div className="container">
            <p style={{'marginTop': '5%', 'marginBottom': '5%', 'color':'red'}}>Không tìm thấy bài viết hoặc server đang gặp sự cố.</p>
            </div>
        </Layout>
        );
    }
    return (
        <>

            <Layout 
                headerStyle={1} 
                footerStyle={2} 
                // breadcrumbTitle="Blog Details"
            >
                <div>
                    <section className="blog-details">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-md-12 w100">
                                    <div className="blog-main">
                                        <p className="navigate-top">Bảng thuật ngữ &nbsp; {'>'} &nbsp; <span style={{'color' : '#ffffff'}}>Altcoin</span></p>
                                        <h3 className="title">
                                            {post.title}
                                        </h3>
                                        <div className="meta">
                                            <Link href="#" className="category btn-action" style={{'letterSpacing': '0px'}}>Người mới</Link>
                                            {/* <div className="meta-info">
                                                <Link href="#" className="name"><span />Floyd Buckridge</Link>
                                                <Link href="#" className="time">Feb 03, 2021</Link>
                                            </div> */}
                                        </div>
                                        <div className="content">
                                            {/* <h5>What is the Metaverse?</h5> */}
                                            <p
                                                className="main-text-p"
                                                dangerouslySetInnerHTML={{ __html: post.content }}
                                            />
                                            
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