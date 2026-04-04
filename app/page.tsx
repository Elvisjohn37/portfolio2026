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
                threshold: 0.6, // section must be 60% visible
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
        <div className="2xl:px-80 xl:px-50 lg:px-30 md:px-20 sm:px-10 px-5 overflow-x-hidden pb-5">
            <div id="home" className="min-h-lvh">
                {(activeHash === "#home" ||
                    renderedSections.includes("#home")) && <Home />}
            </div>

            <div id="about" className="min-h-lvh scroll-m-16 sm:scroll-m-5">
                {(activeHash === "#about" ||
                    renderedSections.includes("#about")) && <About />}
            </div>

            <div id="projects" className="min-h-lvh scroll-m-16 sm:scroll-m-20">
                {(activeHash === "#projects" ||
                    renderedSections.includes("#projects")) && <Projects />}
            </div>

            <div id="contact" className="min-h-lvh scroll-m-16 sm:scroll-m-0">
                {(activeHash === "#contact" ||
                    renderedSections.includes("#contact")) && <Contact />}
            </div>
        </div>
    )
}

export default App
