"use client"

import GitHubIcon from "@mui/icons-material/GitHub"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import EmailIcon from "@mui/icons-material/Email"
import TelegramIcon from "@mui/icons-material/Telegram"
import {
    Grow,
    IconButton,
    Slide,
    Tooltip,
    Typography,
    Zoom,
} from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import About from "./components/About"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import { useInView } from "react-intersection-observer"

const Home = () => {
    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })
    return (
        <>
            <div
                ref={ref}
                id="home"
                className="flex justify-center h-lvh home overflow-hidden"
            >
                <div className="flex flex-row lg:w-5xl">
                    <div className="flex w-full flex-col gap-2 justify-center">
                        <Slide direction="right" in={inView} timeout={1000}>
                            <Typography>Hi, I'm Elvis John</Typography>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1500}>
                            <Typography className="job-title text-primary-text-accent">
                                Senior Web Developer
                            </Typography>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={2000}>
                            <Typography>
                                Seasoned Full Stack Developer with 7 years of
                                hands-on experience in Frontend Development and
                                5 years working across the fullstack.
                            </Typography>
                        </Slide>
                        <div className="flex gap-2">
                            <Grow in={inView} timeout={3000}>
                                <div>
                                    <Tooltip
                                        placement="top"
                                        slots={{
                                            transition: Zoom,
                                        }}
                                        arrow
                                        title="Github"
                                    >
                                        <IconButton className="icon-button">
                                            <GitHubIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Grow>
                            <Grow in={inView} timeout={3500}>
                                <div>
                                    <Tooltip
                                        placement="top"
                                        slots={{
                                            transition: Zoom,
                                        }}
                                        arrow
                                        title="Whats App"
                                    >
                                        <IconButton className="icon-button">
                                            <WhatsAppIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Grow>
                            <Grow in={inView} timeout={4000}>
                                <div>
                                    <Tooltip
                                        placement="top"
                                        slots={{
                                            transition: Zoom,
                                        }}
                                        arrow
                                        title="Gmail"
                                    >
                                        <IconButton className="icon-button">
                                            <EmailIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Grow>
                            <Grow in={inView} timeout={4500}>
                                <div>
                                    <Tooltip
                                        placement="top"
                                        slots={{
                                            transition: Zoom,
                                        }}
                                        arrow
                                        title="Telegram"
                                    >
                                        <IconButton className="icon-button">
                                            <TelegramIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Grow>
                        </div>
                    </div>
                    <div className="flex w-full justify-center items-center">
                        <Slide direction="left" in={inView} timeout={1000}>
                            <div className="w-1/2 rounded-sm overflow-hidden">
                                <Image
                                    src="/profile-pic.jpg"
                                    width={1092}
                                    height={1400}
                                    alt="profile-image"
                                />
                            </div>
                        </Slide>
                    </div>
                </div>
            </div>
            <About />
            <Projects />
            <Contact />
        </>
    )
}

export default Home
