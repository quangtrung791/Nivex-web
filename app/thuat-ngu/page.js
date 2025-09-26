'use client'

import Layout from "@/components/layout/Layout"
import Link from "next/link"
import './thuat_ngu.css'
import { useState, useEffect } from "react"

export default function BuyCryptoSelect() {
    useEffect(() => {
        document.title = "Bảng thuật ngữ | Nivex"
    }, []);
    
    const [selected, setSelected] = useState({ letter: null, idx: null })
    const [dictionary, setDictionary] = useState({})
    const [loading, setLoading] = useState(true)
    const [activeLetter, setActiveLetter] = useState(null) // <- chữ cái đang chọn

    useEffect(() => {
        fetch('/api/dictionary')
            .then(res => res.json())
            .then(data => {
                if (!data.success) return;

                const grouped = data.data.reduce((acc, item) => {
                    const firstLetter = item.keyword.charAt(0).toUpperCase();
                    if (!acc[firstLetter]) acc[firstLetter] = [];
                    acc[firstLetter].push(item);
                    return acc;
                }, {});
                setDictionary(grouped);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const alphabet = ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","S","T","U","W","Z"]

    // Dữ liệu được lọc theo activeLetter
    const filteredDictionary = activeLetter
        ? { [activeLetter]: dictionary[activeLetter] || [] }
        : dictionary;

    return (
        <Layout headerStyle={1} footerStyle={2}>
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
                            {alphabet.map(l => (
                                <li
                                    key={l}
                                    onClick={() => setActiveLetter(l === activeLetter ? null : l)} // toggle khi click
                                    style={{
                                        cursor: "pointer",
                                        fontWeight: l === activeLetter ? "bold" : "normal",
                                        color: l === activeLetter ? "#ff6600" : "#fff"
                                    }}
                                >
                                    {l}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="dictionary-list-alphabet">
                    <div className="container">
                        {loading ? (
                            <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
                        ) : Object.keys(filteredDictionary).length === 0 ||
                          Object.values(filteredDictionary).every(arr => arr.length === 0) ? (
                            <p style={{ textAlign: "center" }}>Không có dữ liệu</p>
                        ) : (
                            Object.entries(filteredDictionary).map(([letter, items]) => (
                                <div key={letter} className="glossary-group">
                                    <div className="glossary-letter">{letter}</div>
                                    <div className="glossary-items">
                                        {items.map((item, idx) => (
                                            <Link
                                                href={`/thuat-ngu/${item.id}`}
                                                key={item.id}
                                                className={
                                                    "glossary-item selected-item" +
                                                    ((selected.letter === letter && selected.idx === idx) ? " active" : "")
                                                }
                                                onClick={() => setSelected({ letter, idx })}
                                            >
                                                <div className="glossary-term">{item.keyword}</div>
                                                <div className="glossary-desc">{item.description}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    )
}
