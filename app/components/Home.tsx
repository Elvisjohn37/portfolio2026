"use client"

import GitHubIcon from "@mui/icons-material/GitHub"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import EmailIcon from "@mui/icons-material/Email"
import TelegramIcon from "@mui/icons-material/Telegram"
import {
    Backdrop,
    Fade,
    IconButton,
    Skeleton,
    Slide,
    Tooltip,
    Typography,
} from "@mui/material"
import Image from "@/app/components/Image"
import { useInView } from "react-intersection-observer"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import { useMemo, useState } from "react"
import { getHomeData } from "@/app/api/about"
import LvsLoading from "./LvsLoading"
import _ from "lodash"
import Link from "next/link"
import useSWR from "swr"

type TuserData = {
    firstName: string
    position: string
    about1: string
    province: string
    country: string
    // add other fields from `res.data` if needed
}

const Home = () => {
    const { ref, inView } = useInView({
        threshold: 0.1, // Trigger when 30% visible
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
    )

    if (isLoading)
        return (
            <div className="relative w-full h-lvh flex items-center justify-center">
                <LvsLoading />
            </div>
        )

    return (
        <div
            ref={ref}
            className="flex justify-center min-h-lvh home pt-12.5 items-center"
        >
            {inView &&
                (!errorMessage ? (
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
                        <div className="flex sm:flex-7 w-full flex-col gap-2 justify-center order-2 sm:order-1">
                            <Slide
                                direction="right"
                                in={inView && !isLoading}
                                timeout={1000}
                            >
                                <div className="flex flex-col gap-2">
                                    <Typography className="flex gap-2">
                                        {"Hi, I'm "}
                                        {_.isEmpty(data) ? (
                                            <Skeleton width={100} />
                                        ) : (
                                            firstName
                                        )}
                                    </Typography>
                                    <div className="flex gap-2">
                                        <LocationOnOutlinedIcon />
                                        {_.isEmpty(data) ? (
                                            <Skeleton className="w-50" />
                                        ) : (
                                            `${province}, ${country}`
                                        )}
                                    </div>
                                </div>
                            </Slide>
                            <Slide
                                direction="right"
                                in={inView && !isLoading}
                                timeout={1200}
                            >
                                <p className="text-2xl lg:text-5xl text-primary">
                                    {_.isEmpty(data) ? (
                                        <Skeleton className="w-[75vw] sm:w-125" />
                                    ) : (
                                        position
                                    )}
                                </p>
                            </Slide>
                            <Slide
                                direction="right"
                                in={inView && !isLoading}
                                timeout={1400}
                            >
                                <Typography className="sm:flex sm:flex-col">
                                    {_.isEmpty(data) ? (
                                        <>
                                            <Skeleton className="w-[75vw] sm:w-125" />
                                            <Skeleton className="w-[75vw] sm:w-120" />
                                            <Skeleton className="w-[75vw] sm:w-100" />
                                        </>
                                    ) : (
                                        about1
                                    )}
                                </Typography>
                            </Slide>
                            {/* <Slide
                                in={inView && isReady}
                                timeout={1600}
                                className="flex gap-2 justify-end sm:justify-start"
                                direction="right"
                            >
                                <div>
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
                                </div>
                            </Slide> */}
                        </div>
                        <div className="flex sm:flex-5 w-full justify-center items-center order-1 sm:order-2">
                            <Slide
                                direction="left"
                                in={inView && !isLoading}
                                timeout={1000}
                            >
                                <div className="w-3/4 md:w-1/2 rounded-sm overflow-hidden">
                                    <Image
                                        src="/profile-pic.jpg"
                                        width={1092}
                                        height={1400}
                                        alt="profile-image"
                                        // setIsReady={setIsReady}
                                    />
                                </div>
                            </Slide>
                        </div>
                    </div>
                ) : (
                    <Fade in={inView} timeout={1000}>
                        <div className="flex flex-col gap-5 items-center border-2 border-red-500 rounded-sm p-8">
                            <p className="text-4xl">Something Went Wrong</p>
                            <p className="text-3xl">{errorMessage}</p>
                        </div>
                    </Fade>
                ))}
        </div>
    )
}

export default Home
