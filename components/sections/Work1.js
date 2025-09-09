
import Link from "next/link"

export default function Work1() {
    return (
        <>

            <section className="work background-container-custom">
                <div className="container gioi-thieu-nivex">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block-text center">
                                {/* <h3 className="heading">How It Work</h3> */}
                                <h3 className="heading" style={{'textAlign': 'left', 'textTransform': 'uppercase'}}>Giới thiệu về <span style={{'color': '#BCFE08'}}>Nivex</span></h3>
                                <p className="fs-14 desc"  style={{'textAlign': 'left', 'padding': '0', 'fontWeight': '400'}}>
                                    <b>Nivex</b> là sàn giao dịch tiền điện tử hàng đầu thế giới được hỗ trợ bởi AI, nhằm mang đến cho người dùng trải nghiệm giao dịch thông minh và tự động.
                                </p>
                            </div>
                            <div className="work__main">
                                <div className="work-box" style={{'background': '#3f3f3f54', 'minHeight' : '276px', 'margin-right': '20px'}}>
                                    <div className="image">
                                        <img src="/assets/images/icon/trading_icon.svg" alt="" />
                                    </div>
                                    <div className="content">
                                        {/* <p className="step">Step 1</p> */}
                                        <Link href="#" className="title fs-28" style={{'fontSize' : '28px', 'fontWeight': '500', 'marginBottom': '5px', 'padding' : '0 15px'}}>GIAO DỊCH SPOT</Link>
                                        <p className="text fs-14" style={{'padding': '5px 40px 25px 40px'}}>
                                            Lưới giao dịch Spot <br></br>
                                            Đầu tư định kỳ (DCA)<br></br>
                                            Lưới vô hạn <br></br>
                                            Spot Martingale
                                        </p>
                                    </div>
                                    {/* <img className="line" src="/assets/images/icon/connect-line.png" alt="" /> */}
                                </div>
                                <div className="work-box" style={{'background': '#3f3f3f54', 'minHeight' : '276px', 'margin-right': '20px'}}>
                                    <div className="image">
                                        <img src="/assets/images/icon/contract_icon.svg" alt="" />
                                    </div>
                                    <div className="content">
                                        {/* <p className="step">Step 2</p> */}
                                        <Link href="#" className="title" style={{'fontSize' : '28px', 'fontWeight': '500', 'marginBottom': '5px', 'padding' : '0 15px'}}>GIAO DỊCH <br></br>HỢP ĐỒNG</Link>
                                        <p className="text fs-14" style={{'padding': '5px 40px 25px 40px'}}>
                                            Phân tích xu hướng hợp đồng và quản lý rủi ro tự động
                                        </p>
                                    </div>
                                    {/* <img className="line" src="/assets/images/icon/connect-line.png" alt="" /> */}
                                </div>
                                <div className="work-box" style={{'background': '#3f3f3f54', 'width': '30vw',  'minHeight' : '276px', 'margin-right': '20px'}}>
                                    <div className="image">
                                        <img src="/assets/images/icon/target_icon.svg" alt="" />
                                    </div>
                                    <div className="content">
                                        {/* <p className="step">Step 3</p> */}
                                        <Link href="#" className="title" style={{'fontSize' : '28px', 'fontWeight': '500', 'marginBottom': '5px', 'padding' : '0 15px'}}>CHIẾN LƯỢC LỢI NHUẬN <br></br> DO AI DẪN DẮT</Link>
                                        <p className="text fs-14" style={{'padding': '5px 40px 25px 40px'}}>
                                            Dựa trên thuật toán AI, Nivex cung cấp phân tích danh mục thông minh và chiến lược Spot tự động, giúp nắm bắt cơ hội thị trường hiệu quả.
                                        </p>
                                    </div>
                                    {/* <img className="line" src="/assets/images/icon/connect-line.png" alt="" /> */}
                                </div>
                                {/* <div className="work-box">
                                    <div className="image">
                                        <img src="/assets/images/icon/Comparison.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="step">Step 4</p>
                                        <Link href="#" className="title">Earn money</Link>
                                        <p className="text">
                                            Stacks is a production-ready library of stackable content
                                            blocks built in React Native.
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
