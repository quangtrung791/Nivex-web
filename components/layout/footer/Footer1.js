import Link from "next/link"
import styles from "./footer1.module.css"
import '../../sections/addtion.css';
import { useState } from "react";

export default function Footer2() {
    const [formData, setFormData] = useState({
        email: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        // Clear error when user starts typing
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch('/api/subscribe-news-footer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email
                })
        })

        const result = await response.json()

        if (result.success) {
            setSuccess(true)
            // Auto close after 2 seconds
            setTimeout(() => {
                console.log('Thành công');
            }, 2000)
        } else {
            setError(result.error || 'Có lỗi xảy ra khi đăng ký');
        }
        } catch (err) {
            setError('Không thể kết nối!');
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <>

            <footer className={`footer style-2 footer-main ${styles.footerContainer}`} style={{'backgroundColor': '#000'}}>
                <div className="container" style={{'position':'relative'}}>
                    <div className="footer__main">
                        <div className="row">
                            <div className="col-xl-4 col-md-6">
                                <div className="info">
                                    <div>
                                        <img className={styles.logoFooterLearningChain} src="https://learningchain.vn/wp-content/uploads/2025/10/White-Logo-Learning-Chain-Text-01-1.webp" alt="" />
                                    </div>
                                    <ul className={`${styles.listSocialFooter}`}>
                                        <li>
                                            <Link href="https://www.facebook.com/NivexVN" target="_blank"><span className="icon-facebook-f" /></Link>
                                        </li>
                                        <li>
                                            <Link href="https://www.tiktok.com/@nivexvn" target="_blank" className="icon-tiktok" ></Link>
                                        </li>
                                        <li>
                                            <Link href="https://x.com/Nivex_Vietnam" target="_blank" className="icon-x-twitter"></Link>
                                        </li>
                                        <li>
                                            <Link href="https://www.youtube.com/@Nivex_Vietnam" target="_blank"><span className="icon-youtube" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="widget" style={{'marginLeft': '0%'}}>
                                    <div className="widget-link">
                                       <p className={styles.widgetTextFooter}>29 Trần Quý Kiên, P. Cát Lát, Tp. Hồ Chí Minh</p>
                                       <p className={styles.widgetTextFooter}>Hotline: 1800 3338</p>
                                       <p className={styles.widgetTextFooter}>Email: contact@learningchain.vn</p>
                                       <p className={styles.widgetTextFooter}>Website: https://learningchain.vn/</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-12 footer-contact-container">
                                <div className="footer-contact" >
                                       <p className={styles.widgetTextFooter}>Return & Shipping Policy</p>
                                       <p className={styles.widgetTextFooter}>Contact us</p>
                                       <p className={styles.widgetTextFooter}>Term of use</p>
                                       <p className={styles.widgetTextFooter}>Privacy policy</p>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </footer>
            
            <div className={`${styles.footer__bottom_custom} footer__bottom`}>
                <p>
                    © 2025 All rights reserved
                </p>
            </div>
        </>
    )
}
