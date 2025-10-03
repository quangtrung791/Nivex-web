'use client'
import { useState, useEffect } from 'react'

export default function Propose() {
    const [dictionary, setDictionary] = useState({});
    const [loading, setLoading] = useState(true);

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
    
    return (
        <>

            <section className="crypto-learning-section propose-section">
                <div className="container">
                    <div className="row">
                            <div className="crypto-content propose">
                                <h2 className='title-propose'>Thuật ngữ đề xuất</h2>
                                
                                <div className="crypto-cards">
                                    {loading ? (
                                        <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
                                    ) : (
                                        Object.values(dictionary)
                                            .flat()
                                            .sort((a, b) => b.id - a.id)
                                            .slice(0, 3)
                                            .map((item, idx) => {
                                                const plainText = item.description
                                                    .replace(/<[^>]+>/g, '') // bỏ thẻ HTML
                                                    .trim();

                                                const lines = plainText.split(/\r?\n/).map(l => l.trim()).filter(l => l);
                                                const shortDesc = lines.slice(0, 2).join(" "); // gộp 2 dòng đầu

                                                return (
                                                    <div key={item.id || idx} className="crypto-card crypto-card-propose">
                                                        <div className="card-content">
                                                            <div className="card-info card-info-propose">
                                                                <h4 className='title-propose-card'>{item.keyword}</h4>
                                                                <p className='text-propose-card'>{shortDesc}</p>
                                                                <div className="card-meta card-meta-propose">
                                                                    <a className="author card-button-propose">Định nghĩa đầy đủ<i className="icon-button-propose"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                        ))}
                                    {/* <div className="crypto-card crypto-card-propose">
                                        <div className="card-content">
                                            <div className="card-info card-info-propose">
                                                <div className="quotation-mark-propose"></div>
                                                <h4 className='title-propose-card'>ZL-SNARKS</h4>
                                                <p className='text-propose-card'>ZK-SNARKS (viết tắt của Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) là một dạng chứng minh mật mã. Đó là một dạng chứng minh mật mã cho phép một bên truy cập thông tin mà không tiết lộ cách hoặc loại thông tin đã được truy cập.
ZK-SNARKS được thực hiện bằng cách tạo ra một khóa riêng tư hoặc bí mật trước khi một giao dịch mật mã diễn ra. Giao thức mật mã Z-cash sử dụng loại chứng minh mật mã này. Loại chứng minh mật mã này đã được giới thiệu lần đầu trong những năm 1980 như một phương pháp mã hóa.</p>
                                                <div className="card-meta card-meta-propose">
                                                    <a className="author card-button-propose" >Định nghĩa đầy đủ<i className="icon-button-propose"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                
                                <button className="btn-crypto-card-learning btn-action">Xem thêm</button>
                            </div>
                    </div>
                </div>
            </section>
        </>
    )
}
