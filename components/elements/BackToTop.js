'use client'
import { useEffect, useState } from "react"

export default function BackToTop({ target }) {
    const [hasScrolled, setHasScrolled] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            // setHasScrolled(window.scrollY > 100)
            const scrolled = window.scrollY > 100
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
            setShow(scrolled && !nearBottom)
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const handleClick = () => {
        window.scrollTo({
            // top: document.querySelector(target).offsetTop,
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button
            // className={`back-to-top${hasScrolled ? " show" : ""}`}
            className={`back-to-top${show ? " show" : ""}`}
            onClick={handleClick}
            aria-label="Back to top"
            type="button"
        >
            <img className="back-to-top-btn" src="/assets/images/icon/back-to-top.svg" />
        </button>
    )
}
