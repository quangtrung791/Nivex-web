'use client'
// export const metadata = {
//     title: "Bảng thuật ngữ | Nivex",
//     description: "Tìm hiểu các thuật ngữ blockchain, crypto, DeFi, Web3,... với Nivex."
// }

import Layout from "@/components/layout/Layout"
import Link from "next/link"
import './thuat_ngu.css'
import { useState, useEffect } from "react"
// import { Metadata } from "next"

// export const metadata = {
//   title: 'Bảng thuật ngữ | Nivex',
//   description: 'Description for this specific page.',
//   openGraph: {
//     title: 'Bảng thuật ngữ | Nivex',
//     description: 'Bảng thuật ngữ | Nivex.',
//     url: 'https://nivex.vn/thuat-ngu',
//     images: ['https://learningchain.vn/wp-content/uploads/nivex/logo_mc.svg'],
//   },
// }

export default function BuyCryptoSelect() {
    useEffect(() => {
        document.title = "Bảng thuật ngữ | Nivex"
    }, []);
    
    const [flatTabs, setFlatTabs] = useState(1)
    const handleFlatTabs = (index) => {
        setFlatTabs(index)
    }
    const [selected, setSelected] = useState({ letter: null, idx: null })

    // Dữ liệu giả , sau này sẽ fetch từ backend
    const glossaryData = {
        A: [
            {
                term: "ARC-20",
                desc: "Một tiêu chuẩn token cho các token có thể thay thế (colored coin) trên mạng lưới Bitcoin."
            },
            {
                term: "Address",
                desc: "Một địa chỉ crypto, còn được gọi là địa chỉ công khai, là một chuỗi ký tự duy nhất được sử dụng để xác định một ví hoặc tài khoản cụ thể trên mạng blockchain. Địa chỉ này thường là sự kết hợp của chữ cái và số, và được sử dụng để gửi và nhận các giao dịch tiền điện tử. Định dạng phổ biến nhất cho một địa chỉ crypto là một chuỗi ký tự bao gồm chữ cái và số bắt đầu bằng một chữ cái hoặc số cụ thể, phụ thuộc vào mạng blockchain cụ thể."
            },
            {
                term: "Airdrop",
                desc: "Một airdrop (tạm dịch là \"phân phát không trọng tài\") trong thế giới tiền điện tử đề cập đến quá trình phân phát một số lượng nhất định các đồng tiền điện tử cho một nhóm người cụ thể, thường là miễn phí. "
            },
            {
                term: "All Time High",
                desc: "Thuật ngữ \"All Time High\" (ATH) thường được sử dụng trong ngữ cảnh giao dịch để chỉ mức giá cao nhất từ trước đến nay mà một tài sản cụ thể từng đạt được. Điều này có thể bao gồm các tài sản truyền thống như cổ phiếu, cũng như các tài sản có tính chất đầu cơ hơn."
            },
            {
                term: "Altcoin",
                desc: "Thuật ngữ \"Altcoin\" là viết tắt của \"Alternative coin\" và được sử dụng để miêu tả bất kỳ loại tiền điện tử nào ngoài Bitcoin. Bitcoin là đồng tiền điện tử phi tập trung đầu tiên, và từ khi ra mắt từ năm 2009, hàng ngàn loại tiền điện tử khác nhau được tạo ra."
            }
        ],
        B: [
            {
                term: "B-Token",
                desc: "Tên chính thức của Binance dành cho một loạt các token được bọc và được thế chấp đầy đủ."
            },
            {
                term: "Bàn tay kim cương",
                desc: "Thuật ngữ bắt nguồn từ cộng đồng nhà đầu tư trực tuyến trên các nền tảng như Reddit và Twitter"
            }
        ]
        // ,
        // C: [
        //     {
        //         term: "C-Token",
        //         desc: "Tên chính thức của Binance dành cho một loạt các token được bọc và được thế chấp đầy đủ"
        //     },
        //     {
        //         term: "Càn tay kim cương",
        //         desc: "Thuật ngữ bắt nguồn từ cộng đồng nhà đầu tư trực tuyến trên các nền tảng như Reddit và Twitter"
        //     }
        // ],
        // D: [
        //     {
        //         term: "D-Token",
        //         desc: "Tên chính thức của Binance dành cho một loạt các token được bọc và được thế chấp đầy đủ"
        //     },
        //     {
        //         term: "Dàn tay kim cương",
        //         desc: "Thuật ngữ bắt nguồn từ cộng đồng nhà đầu tư trực tuyến trên các nền tảng như Reddit và Twitter"
        //     }
        // ]
        // Thêm data ở object này nha
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
                                            // className={`glossary-item${idx === 0 ? " selected-item" : ""}`}
                                            className={
                                                "glossary-item selected-item" +
                                                ((selected.letter === letter && selected.idx === idx) ? " active" : "")
                                            }
                                            key={item.term + idx}
                                            onClick={() => setSelected({ letter, idx })}
                                        >
                                            <div className="glossary-term">{item.term}</div>
                                            <div className="glossary-desc">{item.desc}</div>
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