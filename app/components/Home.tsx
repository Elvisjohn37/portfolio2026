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
                className="flex justify-center min-h-lvh home pt-12.5 items-center"
            >
                {inView && (
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
                        <div className="flex sm:flex-7 w-full flex-col gap-2 justify-center order-2 sm:order-1">
                            <Slide direction="right" in={inView} timeout={1000}>
                                <Typography>Hi, I'm Elvis John</Typography>
                            </Slide>
                            <Slide direction="right" in={inView} timeout={1500}>
                                <p className="text-2xl lg:text-5xl text-primary">
                                    Senior Web Developer
                                </p>
                            </Slide>
                            <Slide direction="right" in={inView} timeout={2000}>
                                <Typography>
                                    Seasoned Full Stack Developer with 7 years
                                    of hands-on experience in Frontend
                                    Development and 5 years working across the
                                    fullstack.
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
                        <div className="flex sm:flex-5 w-full justify-center items-center order-1 sm:order-2">
                            <Slide direction="left" in={inView} timeout={1000}>
                                <div className="w-3/4 md:w-1/2 rounded-sm overflow-hidden">
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
                )}
            </div>
        </>
    )
}

export default Home
