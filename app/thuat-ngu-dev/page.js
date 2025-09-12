'use client'
// export const metadata = {
//     title: "Bảng thuật ngữ | Nivex",
//     description: "Tìm hiểu các thuật ngữ blockchain, crypto, DeFi, Web3,... với Nivex."
// }

import Layout from "@/components/layout/Layout"
import Link from "next/link"
import './thuat_ngu.css'
import { useState, useEffect } from "react"

async function getPosts() {
  try {
    const res = await fetch("http://127.0.0.1:4001/api/posts", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("API lỗi:", res.statusText);
      return []; // fallback data
    }

    return await res.json();
  } catch (error) {
    console.error("Không fetch được posts:", error);
    return []; // fallback data
  }
}

export default function BuyCryptoSelect() {
    
    useEffect(() => {
        document.title = "Bảng thuật ngữ | Nivex"
    }, []);
    
    const [flatTabs, setFlatTabs] = useState(1)
    const handleFlatTabs = (index) => {
        setFlatTabs(index)
    }
    const [selected, setSelected] = useState({ letter: null, idx: null })
    const [glossaryData, setGlossaryData] = useState({})

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const posts = await getPosts()

      if (posts.length > 0) {
        // gom group theo ký tự đầu
        const grouped = posts.reduce((acc, post) => {
          const firstLetter = post.title?.charAt(0).toUpperCase() || "#"
          if (!acc[firstLetter]) acc[firstLetter] = []
          acc[firstLetter].push({
            term: post.title,
            desc: post.content,
            slug: post.slug,
          })
          return acc
        }, {})
        setGlossaryData(grouped)
      }
      
      setLoading(false)
    })()
  }, [])

  // fallback khi API lỗi
  if (!loading && Object.keys(glossaryData).length === 0) {
    return (
      <Layout headerStyle={1} footerStyle={2}>
        <div className="container">
          <p style={{ marginTop: '5%', marginBottom: '5%', color: 'red' }}>
            Không tìm thấy bài viết hoặc server đang gặp sự cố.
          </p>
        </div>
      </Layout>
    )
  }
    return (
        <>
            <Layout headerStyle={1} footerStyle={2} 
                >
                <div>
                    <section className="page-title custom">
                         <div className="heading-row">
                            <h3 className="heading nivex-heading-title">
                                Bảng <span className="heading nivex-heading-title-gradient">thuật ngữ</span>
                            </h3>
                            <p className="heading-desc desc fs-14">
                                Tìm hiểu về ngành blockchain chỉ trong 10 phút.
                            </p>
                        </div>
                    </section>
                    <section className="glossary-search-section">
                        <div className="container glossary-search-row">
                            <form className="glossary-search-form">
                            <input
                                type="text"
                                className="glossary-search-input"
                                placeholder="Tìm kiếm thuật ngữ"
                            />
                            <button type="submit" className="glossary-search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="#111" strokeWidth="2"/>
                                <path d="M21 21L16.65 16.65" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                            </form>
                            <ul className="glossary-alphabet-list">
                            {["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","S","T","U","W","Z"].map(l => (
                                <li key={l}>{l}</li>
                            ))}
                            </ul>
                        </div>
                    </section>
                    <section className="dictionary-list-alphabet">
                        <div className="container">
                            {Object.entries(glossaryData).map(([letter, items]) => (
                                <div key={letter} className="glossary-group">
                                    <div className="glossary-letter">{letter}</div>
                                    <div className="glossary-items">
                                        {items.map((item, idx) => (
                                            <div
                                                className={
                                                    "glossary-item selected-item" +
                                                    ((selected.letter === letter && selected.idx === idx) ? " active" : "")
                                                }
                                                key={item.term + idx}
                                                onClick={() => setSelected({ letter, idx })}
                                            >
                                                {/* link sang trang chi tiết theo slug */}
                                                <Link href={`/chi-tiet-thuat-ngu/${item.slug}`}>
                                                    <div className="glossary-term">{item.term}</div>
                                                    <div className="glossary-desc">{item.desc.substring(0, 100)}...</div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                   
                </div>

            </Layout>
        </>
    )
}