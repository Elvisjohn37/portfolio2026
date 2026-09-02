"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { SetStateAction, useContext, useEffect, useState } from "react"
import ThemeContext from "../utils/js/ThemeContext"

const MainNav = () => {
    const pathname = usePathname()
    const [activeHash, setActiveHash] = useState("")
    const { state } = useContext(ThemeContext)
    const { theme } = state

    const sections = ["home", "about", "projects", "contact"]

    const handleHashChange = (hash: SetStateAction<string>) =>
        setActiveHash(hash)

    const getLinkClass = (hash: string) =>
        `link ${activeHash === hash ? "text-primary! [text-shadow:0_0_12px_rgb(88,218,210)]" : ""}`

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id
                        const newHash = `#${id}`

                        setActiveHash(newHash)
                        window.history.replaceState(null, "", newHash)
                    }
                })
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            },
        )

        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
        // Re-run when the route changes: soft navigations (e.g. the project
        // modal via @modal interception) replace the section DOM nodes, so the
        // observer must re-attach to the new elements.
    }, [pathname])

    return (
        <nav className="flex justify-between px-5 bg-secondary items-center fixed w-full z-10 overflow-y-hidden">
            <div className="brand h-10">
                <Link
                    onClick={() => handleHashChange("#home")}
                    className="link"
                    href="#home"
                >
                    <Image
                        className={`w-19.5 ${
                            theme === "light" ? "invert hue-rotate-180" : ""
                        }`}
                        src="/logo.png"
                        width={78}
                        height={39}
                        alt={"logo"}
                    />
                </Link>
            </div>
            <div className="navigation">
                <ul className="ul">
                    <li>
                        <Link
                            onClick={() => handleHashChange("#home")}
                            href="#home"
                            className={getLinkClass("#home")}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => handleHashChange("#about")}
                            href="#about"
                            className={getLinkClass("#about")}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => handleHashChange("#projects")}
                            href="#projects"
                            className={getLinkClass("#projects")}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => handleHashChange("#contact")}
                            href="#contact"
                            className={getLinkClass("#contact")}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainNav
