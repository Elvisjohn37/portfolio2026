"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
    CSSProperties,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import classnames from "classnames"
import { LightMode, ModeNight } from "@mui/icons-material"
import ThemeContext from "../utils/js/ThemeContext"

type TSection = { id: string; label: string }

const SECTIONS: TSection[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
]

const MainNav = () => {
    const pathname = usePathname()
    const { state, dispatch } = useContext(ThemeContext)
    const { theme } = state
    const isLight = theme === "light"

    const [activeHash, setActiveHash] = useState("#home")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [progress, setProgress] = useState(0)

    const closeMenu = useCallback(() => setIsMenuOpen(false), [])

    const handleNavigate = (hash: string) => {
        setActiveHash(hash)
        closeMenu()
    }

    const handleThemeToggle = () => {
        dispatch({
            type: "CHANGE_THEME",
            theme: isLight ? "dark" : "light",
        })
    }

    // Highlight the section currently occupying the middle of the viewport.
    // Re-runs on route changes because soft navigations (e.g. the project
    // modal) replace the section DOM nodes.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`)
                })
            },
            {
                rootMargin: "-45% 0px -45% 0px",
                threshold: 0,
            },
        )

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [pathname])

    // Glass background + reading progress. rAF-throttled so the scroll
    // listener never does layout work more than once per frame.
    useEffect(() => {
        let frame = 0

        const update = () => {
            frame = 0
            const doc = document.documentElement
            const scrollable = doc.scrollHeight - doc.clientHeight

            setProgress(
                scrollable > 0
                    ? Math.min(1, Math.max(0, doc.scrollTop / scrollable))
                    : 0,
            )
            setIsScrolled(doc.scrollTop > 8)
        }

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }

        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)

        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            if (frame) cancelAnimationFrame(frame)
        }
    }, [pathname])

    // Never let the page scroll behind the open drawer.
    useEffect(() => {
        document.body.classList.toggle("is-locked", isMenuOpen)

        return () => document.body.classList.remove("is-locked")
    }, [isMenuOpen])

    // The drawer only exists on small screens.
    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 860px)")
        const onChange = (event: MediaQueryListEvent) => {
            if (event.matches) closeMenu()
        }

        desktop.addEventListener("change", onChange)
        return () => desktop.removeEventListener("change", onChange)
    }, [closeMenu])

    useEffect(() => {
        if (!isMenuOpen) return

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeMenu()
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [isMenuOpen, closeMenu])

    return (
        <>
            <header
                className={classnames("navbar", {
                    "navbar--scrolled": isScrolled,
                })}
            >
                <div className="navbar__inner">
                    <Link
                        href="#home"
                        className="navbar__brand"
                        aria-label="Elvis John — back to top"
                        onClick={() => handleNavigate("#home")}
                    >
                        <Image
                            className="navbar__logo"
                            src="/logo.png"
                            width={78}
                            height={39}
                            alt="Elvis John"
                            priority
                        />
                    </Link>

                    <nav className="navbar__links" aria-label="Sections">
                        {SECTIONS.map(({ id, label }) => {
                            const hash = `#${id}`
                            const isActive = activeHash === hash

                            return (
                                <Link
                                    key={id}
                                    href={hash}
                                    className={classnames("navbar__link", {
                                        "is-active": isActive,
                                    })}
                                    aria-current={isActive ? "true" : undefined}
                                    onClick={() => handleNavigate(hash)}
                                >
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="navbar__actions">
                        <button
                            type="button"
                            className="navbar__icon-btn"
                            onClick={handleThemeToggle}
                            aria-label={`Switch to ${
                                isLight ? "dark" : "light"
                            } mode`}
                        >
                            {isLight ? (
                                <ModeNight fontSize="small" />
                            ) : (
                                <LightMode fontSize="small" />
                            )}
                        </button>

                        <Link
                            href="/cv"
                            className="pill pill--primary navbar__cta"
                        >
                            Résumé
                        </Link>

                        <button
                            type="button"
                            className="navbar__burger"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            onClick={() => setIsMenuOpen((open) => !open)}
                        >
                            <span className="navbar__burger-bar" />
                            <span className="navbar__burger-bar" />
                            <span className="navbar__burger-bar" />
                        </button>
                    </div>
                </div>

                <span
                    className="navbar__progress"
                    style={{ "--progress": progress } as CSSProperties}
                    aria-hidden="true"
                />
            </header>

            <div
                id="mobile-menu"
                className={classnames("navbar__drawer", {
                    "is-open": isMenuOpen,
                })}
            >
                <ul className="navbar__drawer-links">
                    {SECTIONS.map(({ id, label }, index) => {
                        const hash = `#${id}`
                        const isActive = activeHash === hash

                        return (
                            <li key={id}>
                                <Link
                                    href={hash}
                                    className={classnames(
                                        "navbar__drawer-link",
                                        { "is-active": isActive },
                                    )}
                                    aria-current={isActive ? "true" : undefined}
                                    onClick={() => handleNavigate(hash)}
                                >
                                    {label}
                                    <span className="navbar__drawer-index">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <div className="navbar__drawer-foot">
                    <Link
                        href="/cv"
                        className="pill pill--primary"
                        onClick={closeMenu}
                    >
                        View résumé
                    </Link>
                    <Link
                        href="#contact"
                        className="pill pill--ghost"
                        onClick={() => handleNavigate("#contact")}
                    >
                        Get in touch
                    </Link>
                </div>
            </div>

            <div
                className={classnames("navbar__scrim", {
                    "is-open": isMenuOpen,
                })}
                onClick={closeMenu}
                aria-hidden="true"
            />
        </>
    )
}


export default MainNav
