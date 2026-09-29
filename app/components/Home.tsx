"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import classnames from "classnames"
import useSWR from "swr"
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded"
import GitHubIcon from "@mui/icons-material/GitHub"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import EmailIcon from "@mui/icons-material/Email"
import Image from "./Image"
import LvsLoading from "./LvsLoading"
import { getHomeData } from "@/app/api/about"
import { Location, Nodejs, Reactjs } from "./Icons"
import { projects } from "../utils/js/projects"

type TuserData = {
    firstName: string
    position: string
    about1: string
    province: string
    country: string
}

// Rotating focus line — every title is taken from the resume (see WorkExperience).
const ROLE_WORDS = [
    "Senior Fullstack Web Developer",
    "Frontend Web Developer",
    "AI Engineer",
]

const QUICK_LINKS = [
    {
        href: "https://github.com/Elvisjohn37",
        label: "GitHub",
        Icon: GitHubIcon,
        external: true,
    },
    {
        href: "https://wa.me/639306915794",
        label: "WhatsApp",
        Icon: WhatsAppIcon,
        external: true,
    },
    {
        href: "#contact",
        label: "Email me",
        Icon: EmailIcon,
        external: false,
    },
]

const ROLE_INTERVAL = 3200

const FALLBACK_BLURB =
    "I design and build fast, accessible web products end to end — from pixel-perfect interfaces to the APIs and delivery pipelines behind them."

const Home = () => {
    const { ref, inView } = useInView({
        threshold: 0.15, // Trigger when 15% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const { data, isLoading } = useSWR(["about-data", "home"], getHomeData, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    })

    const errorMessage = data?.errorMessage

    const { firstName, position, about1, province, country } = useMemo(
        () =>
            data?.data || {
                firstName: "",
                position: "",
                about1: "",
                province: "",
                country: "",
            },
        [data],
    ) as TuserData

    const roles = useMemo(
        () => ROLE_WORDS.filter((word) => word !== position),
        [position],
    )

    const [roleIndex, setRoleIndex] = useState(0)

    // Cycle the focus line while the hero is mounted.
    useEffect(() => {
        if (roles.length < 2) return

        const timer = setInterval(
            () => setRoleIndex((index) => (index + 1) % roles.length),
            ROLE_INTERVAL,
        )

        return () => clearInterval(timer)
    }, [roles.length])

    const role = roles[roleIndex % roles.length]

    const stats = useMemo<{ value: ReactNode; label: string }[]>(
        () => [
            {
                value: (
                    <>
                        7<span>+</span>
                    </>
                ),
                label: "Years of experience",
            },
            { value: projects.length, label: "Featured projects" },
            { value: "AI", label: "Augmented workflow" },
        ],
        [],
    )

    const location = [province, country].filter(Boolean).join(", ")
    const displayName = firstName || "Elvis John"

    if (isLoading)
        return (
            <div className="relative flex min-h-lvh w-full items-center justify-center">
                <LvsLoading />
            </div>
        )

    if (errorMessage)
        return (
            <section className="hero">
                <div className="app-shell">
                    <div className="surface p-8 text-center">
                        <p className="section-eyebrow">Connection lost</p>
                        <h1 className="section-title">Something went wrong</h1>
                        <p className="lead mt-3">{errorMessage}</p>
                        <Link
                            href="#contact"
                            className="pill pill--primary mt-6"
                        >
                            Send a message instead
                        </Link>
                    </div>
                </div>
            </section>
        )

    return (
        <section className="hero" ref={ref}>
            <div className="app-shell">
                <div className="hero__layout">
                    <div>
                        {location && (
                            <span
                                className={classnames("badge", "reveal", {
                                    "is-visible": inView,
                                })}
                            >
                                <Location aria-hidden="true" focusable="false" />
                                {location}
                            </span>
                        )}

                        <p className="hero__greeting">
                            Hello, welcome to my portfolio
                            <span className="hero__wave" aria-hidden="true">
                                👋
                            </span>
                        </p>

                        <h1 className="hero__name">
                            {displayName}
                            {position && (
                                <span className="hero__name-accent">
                                    {position}
                                </span>
                            )}
                        </h1>

                        <p className="hero__role" aria-live="polite">
                            <span className="hero__role-word" key={role}>
                                {role}
                            </span>
                            <span className="hero__caret" aria-hidden="true" />
                        </p>

                        <p className="lead hero__blurb">
                            {about1 || FALLBACK_BLURB}
                        </p>

                        <div className="hero__actions">
                            <Link href="#contact" className="pill pill--primary">
                                Let&apos;s work together
                                <ArrowOutwardRoundedIcon
                                    fontSize="small"
                                    aria-hidden="true"
                                />
                            </Link>
                            <Link href="#projects" className="pill pill--ghost">
                                View my work
                            </Link>
                        </div>

                        <ul className="hero__quick">
                            <li className="hero__quick-label">Find me</li>
                            {QUICK_LINKS.map(({ href, label, Icon, external }) => (
                                <li key={label}>
                                    {external ? (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hero__quick-link"
                                            aria-label={`${label} (opens in a new tab)`}
                                        >
                                            <Icon aria-hidden="true" />
                                            {label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={href}
                                            className="hero__quick-link"
                                        >
                                            <Icon aria-hidden="true" />
                                            {label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <ul className="hero__stats">
                            {stats.map(({ value, label }) => (
                                <li key={label}>
                                    <p className="hero__stat-value">{value}</p>
                                    <p className="hero__stat-label">{label}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        className={classnames("hero__media", "reveal", {
                            "is-visible": inView,
                        })}
                    >
                        <div className="hero__portrait">
                            <span
                                className="hero__portrait-glow"
                                aria-hidden="true"
                            />
                            <div className="hero__portrait-inner">
                                <Image
                                    src="/profile-pic.jpg"
                                    alt={`${displayName}, ${position || "web developer"}`}
                                    fill
                                    sizes="(max-width: 900px) 72vw, 320px"
                                />
                            </div>
                            <span className="hero__chip hero__chip--tl">
                                <Reactjs aria-hidden="true" />
                                React
                            </span>
                            <span className="hero__chip hero__chip--br">
                                <Nodejs aria-hidden="true" />
                                Node.js
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <a className="hero__scroll" href="#about">
                Scroll
                <span className="hero__scroll-rail" aria-hidden="true" />
            </a>
        </section>
    )
}

export default Home
