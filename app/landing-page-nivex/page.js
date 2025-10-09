import Layout from "@/components/layout/Layout"
import About1 from "@/components/sections/About1"
import Banner1 from "@/components/sections/Banner1"
import Work1 from "@/components/sections/Work1"
import MenuListNew from "@/components/sections/MenuListNew"
import SanSangGiaoDich from '@/components/sections/SanSangGiaoDich'
import './landingPageNivex.css'

// import HomepagePopup from '@/components/HomepagePopup'

export default function Home() {

    return (
        <>
            {/* <HomepagePopup /> */}
            <Layout headerStyle={2} footerStyle={1}>
                <Banner1 />
                <MenuListNew />
                <Work1 />
                <About1 />
                <SanSangGiaoDich />
            </Layout>
        </>
    )
}