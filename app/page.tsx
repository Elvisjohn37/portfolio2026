/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, ComponentType } from "react"
import Loader from "./components/Loader"
import LvsLoading from "./components/LvsLoading"
import Link from "next/link"

// Section IDs as a union type
type SectionID = "home" | "about" | "projects" | "contact"

// Dynamic component creator type
type TCreateDynamicParams = (
    importFn: () => Promise<{ default: ComponentType<unknown> }>,
    hasCustomLoader?: boolean,
) => ComponentType<unknown>

const CreateDynamic: TCreateDynamicParams = (
    importFn,
    hasCustomLoader = false,
) =>
    dynamic(importFn, {
        ssr: false,
        loading: () => (
            <div className="relative w-full h-lvh flex items-center justify-center">
                {hasCustomLoader ? <LvsLoading /> : <Loader />}
            </div>
        ),
    })

// Dynamic components
const Home = CreateDynamic(() => import("./components/Home"), true)
const About = CreateDynamic(() => import("./components/About"))
const Projects = CreateDynamic(() => import("./components/Projects"))
const Contact = CreateDynamic(() => import("./components/Contact"))

const App = () => {
    const sections: SectionID[] = ["home", "about", "projects", "contact"]

    const [activeHash, setActiveHash] = useState<`#${SectionID}` | undefined>()
    const [renderedSections, setRenderedSections] = useState<`#${SectionID}`[]>(
        [],
    )

    useEffect(() => {
        setActiveHash(window.location.hash as `#${SectionID}`)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id as SectionID
                        const newHash: `#${SectionID}` = `#${id}`

                        setActiveHash(newHash)

                        // Update URL without scrolling jump
                        window.history.replaceState(null, "", newHash)
                    }
                })
            },
            {
                rootMargin: "-40% 0px -40% 0px",
                threshold: 0, // Also detect sections taller than the viewport.
            },
        )

        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (activeHash && !renderedSections.includes(activeHash)) {
            setRenderedSections([...renderedSections, activeHash])
        }
    }, [activeHash, renderedSections])

    return (
        <main className="overflow-x-hidden">
            <div id="home" className="min-h-lvh">
                {(activeHash === "#home" ||
                    renderedSections.includes("#home")) && <Home />}
            </div>

            <div id="about" className="page-section min-h-lvh">
                {(activeHash === "#about" ||
                    renderedSections.includes("#about")) && <About />}
            </div>

            <div id="projects" className="page-section min-h-lvh">
                {(activeHash === "#projects" ||
                    renderedSections.includes("#projects")) && <Projects />}
            </div>

            <div id="contact" className="page-section min-h-lvh">
                {(activeHash === "#contact" ||
                    renderedSections.includes("#contact")) && <Contact />}
            </div>
        </main>
    )
}

export default App
