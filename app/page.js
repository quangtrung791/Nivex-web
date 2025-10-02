import Layout from "../components/layout/Layout"
import About1 from "../components/sections/About1"
import Banner1 from "../components/sections/Banner1"
import Coinlist1 from "../components/sections/Coinlist1"
import Crypto1 from "../components/sections/Crypto1"
// import Download from "../components/sections/Download"
// import Sale from "../components/sections/Sale"
import Testimonials1 from "../components/sections/Testimonials1"
import Work1 from "../components/sections/Work1"
import Propose from "../components/sections/Propose"
import MenuListNew from "../components/sections/MenuListNew"
import SanSangGiaoDich from '../components/sections/SanSangGiaoDich'
import HomepagePopup from '../components/HomepagePopup'

export default function Home() {

    return (
        <>
            <HomepagePopup />
            <Layout headerStyle={1} footerStyle={2}>
                <Banner1 />
                <MenuListNew />
                {/* <Crypto1 /> */}
                {/* <Coinlist1 /> */}
                <Work1 />
                <About1 />
                <SanSangGiaoDich />
                {/* <Download /> */}
                {/* <Testimonials1 /> */}
                {/* <Sale /> */}
                {/* <Propose /> */}

            </Layout>
        </>
    )
}