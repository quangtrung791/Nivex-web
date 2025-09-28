
import Link from "next/link"
import './add.css'

export default function Work1() {
    return (
        <>

            <section className="work background-container-custom">
                <div className="container gioi-thieu-nivex">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block-text center">
                                {/* <h3 className="heading">How It Work</h3> */}
                                <h3 className="heading" style={{'textAlign': 'left', 'textTransform': 'uppercase'}}>Hành Trình Của Bạn Bắt Đầu<br></br> Từ <span style={{'color': '#BCFE08'}}>Tri Thức</span></h3>
                                <p className="fs-14 desc white-text"  style={{'textAlign': 'left', 'padding': '0', 'fontWeight': '400'}}>
                                   Tại <b>Nivex</b>, chúng tôi tin rằng một nhà giao dịch thành công trước hết phải là một người không ngừng học hỏi. Nền tảng của chúng tôi được thiết kế để đồng hành cùng bạn, từ những khái niệm cơ bản nhất đến việc làm chủ các chiến lược AI phức tạp.
                                </p>
                            </div>
                            <div className="work__main">
                                <div className="work-box" style={{'background': '#3f3f3f54', 'minHeight' : '276px', 'margin-right': '20px'}}>
                                    <div className="image">
                                        {/* <img src="/assets/images/icon/trading_icon.svg" alt="" /> */}
                                        <img src="https://learningchain.vn/wp-content/uploads/nivex/img_1.png" alt="" />
                                    </div>
                                    <div className="content">
                                        {/* <p className="step">Step 1</p> */}
                                        <Link href="#" className="title fs-28 gradient-text" style={{'fontSize' : '28px', 'fontWeight': '700', 'marginBottom': '5px', 'padding' : '0 15px'}}>Kiến Thức <br></br>Là Nền Tảng</Link>
                                        <p className="text fs-14" style={{'padding': '5px 33px 25px 33px'}}>
                                           Truy cập thư viện khóa học, hướng dẫn chi tiết và các chuyên đề chuyên sâu để thực sự hiểu rõ "tại sao" đằng sau mỗi chiến lược giao dịch.
                                          
                                        </p>
                                    </div>
                                    {/* <img className="line" src="/assets/images/icon/connect-line.png" alt="" /> */}
                                </div>
                                <div className="work-box" style={{'background': '#3f3f3f54', 'minHeight' : '276px', 'margin-right': '20px'}}>
                                    <div className="image">
                                        {/* <img src="/assets/images/icon/contract_icon.svg" alt="" /> */}
                                        <img src="https://learningchain.vn/wp-content/uploads/nivex/img_2.png" className="img-src-2-el" alt="" />
                                    </div>
                                    <div className="content">
                                        {/* <p className="step">Step 2</p> */}
                                        <Link href="#" className="title gradient-text" style={{'fontSize' : '28px', 'fontWeight': '700', 'marginBottom': '5px', 'padding' : '0 15px'}}>Công Cụ Là<br></br> Phòng Thí Nghiệm</Link>
                                        {/* <p className="text fs-14" style={{'padding': '5px 40px 25px 40px'}}> */}
                                        <p className="text fs-14" style={{'padding': '5px 33px 25px 33px'}}>
                                            Sau khi nắm vững kiến thức, hãy xem các công cụ AI của chúng tôi như một "phòng thí nghiệm" an toàn để áp dụng, kiểm chứng và theo dõi kết quả học tập.
                                        </p>
                                    </div>
                                    {/* <img className="line" src="/assets/images/icon/connect-line.png" alt="" /> */}
                                </div>
                                <div className="work-box last-el-wb" style={{'background': '#3f3f3f54',  'minHeight' : '276px'}}>
                                    <div className="image">
                                        {/* <img src="/assets/images/icon/target_icon.svg" alt="" /> */}
                                        <img src="https://learningchain.vn/wp-content/uploads/nivex/img_3.png" alt="" />
                                    </div>
                                    <div className="content">
                                        {/* <p className="step">Step 3</p> */}
                                        <Link href="#" className="title gradient-text" style={{'fontSize' : '28px', 'fontWeight': '700', 'marginBottom': '5px', 'padding' : '0 15px'}}>Phát Triển <br></br>Cùng Cộng Đồng</Link>
                                        <p className="text fs-14" style={{'padding': '5px 33px 25px 33px'}}>
                                            Bạn không đơn độc. Tham gia các buổi hội thảo, workshop độc quyền và kết nối với cộng đồng các nhà giao dịch cùng chí hướng để cùng nhau phát triển.
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
