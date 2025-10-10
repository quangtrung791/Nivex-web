'use client'
import { useState } from 'react'
import Layout from "@/components/layout/Layout"
import About1 from "./About1"
import Banner1 from "./Banner1"
import Work1 from "./Work1"
import MenuListNew from "./MenuListNew"
import SanSangGiaoDich from "./SanSangGiaoDich"
import './landingPageNivex.css'
import LandingPagePopUp from "./LandingPagePopUp"





export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const handleOpenPopup = () => {
        setIsPopupOpen(true)
    }

    const handleClosePopup = () => {
        setIsPopupOpen(false)
    }

    return (
        <>
            <Layout headerStyle={2} footerStyle={1}>
                <Banner1 onOpenPopup={handleOpenPopup} />
                <MenuListNew />
                <Work1 />
                <About1 onOpenPopup={handleOpenPopup} />
                <SanSangGiaoDich onOpenPopup={handleOpenPopup} />
                <LandingPagePopUp 
                    isOpen={isPopupOpen} 
                    onClose={handleClosePopup} 
                />
            </Layout>
        </>
    )
}