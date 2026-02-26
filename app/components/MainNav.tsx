"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

const MainNav = () => {
    const [activeHash, setActiveHash] = useState("")

    const sections = ["home", "about", "projects", "contact"]

    const handleHashChange = (hash) => {
        setActiveHash(hash)
        console.log(hash)
    }

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

                        // Update URL without scrolling jump
                        window.history.replaceState(null, "", newHash)
                    }
                })
            },
            {
                threshold: 0.6, // section must be 60% visible
            },
        )

        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <nav className="flex justify-between px-5 bg-secondary items-center fixed w-full z-10 overflow-y-hidden">
            <div className="brand h-10">
                <Link
                    onClick={() => handleHashChange("#home")}
                    className="link"
                    href="#home"
                >
                    <Image
                        className="w-19.5"
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
