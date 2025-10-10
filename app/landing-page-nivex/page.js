import Layout from "@/components/layout/Layout"
import About1 from "./About1"
import Banner1 from "./Banner1"
import Work1 from "./Work1"
import MenuListNew from "./MenuListNew"
import SanSangGiaoDich from "./SanSangGiaoDich"
import './landingPageNivex.css'





export default function Home() {
    return (
        <>
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