/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import dynamic from "next/dynamic"
import { Suspense, useEffect, useState } from "react"
import Loader from "./components/Loader"
import LvsLoading from "./components/LvsLoading"
import { Backdrop } from "@mui/material"

const Home = dynamic(() => import("./components/Home"))
const About = dynamic(() => import("./components/About"))
const Projects = dynamic(() => import("./components/Projects"))
const Contact = dynamic(() => import("./components/Contact"))

const App = () => {
    const [activeHash, setActiveHash] = useState<string | undefined>()

    const sections = ["home", "about", "projects", "contact"]
    const [renderedSections, setRenderedSections] = useState<string[]>([])

    useEffect(() => {
        setActiveHash(window.location.hash)
    }, [])

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

    useEffect(() => {
        if (!renderedSections.includes(activeHash as string))
            setRenderedSections([...renderedSections, activeHash as string])
    }, [activeHash])

    return (
        <div className="2xl:px-80 xl:px-50 lg:px-30 md:px-20 sm:px-10 px-5 overflow-y-hidden pb-5">
            <div id="home" className="min-h-lvh">
                {(activeHash === "#home" ||
                    renderedSections.includes("#home")) && (
                    <Suspense
                        fallback={
                            <Backdrop
                                sx={{ backgroundColor: "transparent" }}
                                key="home-loader"
                                open={true}
                            >
                                <LvsLoading />
                            </Backdrop>
                        }
                    >
                        <Home />
                    </Suspense>
                )}
            </div>

            <div id="about" className="min-h-lvh">
                {(activeHash === "#about" ||
                    renderedSections.includes("#about")) && (
                    <Suspense
                        fallback={
                            <Backdrop
                                sx={{ backgroundColor: "transparent" }}
                                open={true}
                            >
                                <Loader />
                            </Backdrop>
                        }
                    >
                        <About />
                    </Suspense>
                )}
            </div>

            <div id="projects" className="min-h-lvh">
                {(activeHash === "#projects" ||
                    renderedSections.includes("#projects")) && (
                    <Suspense
                        fallback={
                            <Backdrop
                                sx={{ backgroundColor: "transparent" }}
                                open={true}
                            >
                                <Loader />
                            </Backdrop>
                        }
                    >
                        <Projects />
                    </Suspense>
                )}
            </div>

            <div id="contact" className="min-h-lvh">
                {(activeHash === "#contact" ||
                    renderedSections.includes("#contact")) && (
                    <Suspense
                        fallback={
                            <Backdrop
                                sx={{ backgroundColor: "transparent" }}
                                open={true}
                            >
                                <Loader />
                            </Backdrop>
                        }
                    >
                        <Contact />
                    </Suspense>
                )}
            </div>
        </div>
    )
}

export default App
