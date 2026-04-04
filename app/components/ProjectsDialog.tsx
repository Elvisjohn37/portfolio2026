/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    Alert,
    AlertTitle,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grow,
    IconButton,
    Link as MuiLink,
    Slide,
    Tooltip,
    Typography,
} from "@mui/material"
import Image from "@/app/components/Image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import {
    Bitbucket,
    Bootstrap,
    Css,
    Docker,
    Expressjs,
    Github,
    Gulp,
    Html,
    Javascript,
    Jenkins,
    Jest,
    Jira,
    Jquery,
    Laravel,
    MaterialUi,
    Mongodb,
    Mysql,
    Nextjs,
    Nodejs,
    Php,
    Reactjs,
    Sass,
    Tailwindcss,
    Trello,
    Typescript,
    Vitejs,
    Vuejs,
    Webpack,
} from "./Icons"
import CloseIcon from "@mui/icons-material/Close"
import Link from "next/link"
import classNames from "classnames"
import ThemeContext from "../utils/js/ThemeContext"
import { useCallback, useContext, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import _ from "lodash"
import Loader from "./Loader"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useRouter } from "next/navigation"

const ProjectsDialog = ({
    open = true,
    onClose,
    id,
    hasParams = false,
}: any) => {
    const router = useRouter()
    const projects = [
        {
            id: 1,
            logoSrc: "/projects/elgada/streameline verify/favicon.webp",
            name: "Streamline Verify",
            description: "Admin Website",
            thumbnail: "/projects/elgada1.png",
            images: [
                "/projects/elgada2.png",
                "/projects/elgada3.png",
                "/projects/elgada4.png",
                "/projects/elgada5.png",
                "/projects/elgada6.png",
                "/projects/elgada7.png",
                "/projects/elgada8.png",
                "/projects/elgada9.png",
                "/projects/elgada10.png",
            ],
            info: "This is an admin website of employee records, organization records, etc.",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Jest, name: "Jest" },
                    { icon: Sass, name: "Sass" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Bitbucket, name: "Bitbucket" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
            },
        },
        {
            id: 2,
            logoSrc: "/projects/landers/favicon.ico",
            name: "Landers Admin Website",
            description: "Admin Website",
            thumbnail: "/projects/landers_admin.png",
            info: "Landers offers a wide variety of local and imported products including groceries, household items, personal care, and specialty goods in spacious, well-organized aisles, similar to other membership club formats.",
            url: "https://admin.snapmart.ph",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Jest, name: "Jest" },
                    { icon: Sass, name: "Sass" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Bitbucket, name: "Bitbucket" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 3,
            logoSrc: "/projects/landers/favicon.ico",
            name: "Landers",
            description: "E-commerce",
            thumbnail: "/projects/landers1.png",
            images: [
                "/projects/landers2.png",
                "/projects/landers3.png",
                "/projects/landers4.png",
                "/projects/landers5.png",
            ],
            info: "Landers offers a wide variety of local and imported products including groceries, household items, personal care, and specialty goods in spacious, well-organized aisles, similar to other membership club formats.",
            url: "http://landers.ph",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Jest, name: "Jest" },
                    { icon: Sass, name: "Sass" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Bitbucket, name: "Bitbucket" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 4,
            logoSrc: "/projects/leekie/sbobet/favicon.ico",
            name: "SBOBET Classic games",
            description: "Online Gaming",
            thumbnail: "/projects/sbobet_asi.png",
            images: [
                "/projects/sbobet_bsi.png",
                // "/projects/sbobet_mobile.png",
                // "/projects/sbobet_mobile_reports.png",
            ],
            info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
            url: "https://games.classicku.com",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Jest, name: "Jest" },
                    { icon: Nextjs, name: "Nextjs" },
                    { icon: Tailwindcss, name: "Tailwindcss" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Github, name: "Github" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 5,
            logoSrc: "/projects/leekie/gosdsb/favicon.png",
            name: "GOSDSB",
            description: "Online Gaming",
            thumbnail: "/projects/gosdsb_bsi.png",
            images: [
                "/projects/gosdsb_asi.png",
                "/projects/gosdsb_reports.png",
            ],
            info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
            url: "https://gosdsb.com",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Sass, name: "Sass" },
                    { icon: Jest, name: "Jest" },
                    { icon: Vitejs, name: "Vitejs" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Github, name: "Github" },
                    { icon: Trello, name: "Trello" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 6,
            logoSrc: "/projects/leekie/gobetx/favicon.png",
            name: "GOBETX",
            description: "Online Gaming",
            thumbnail: "/projects/gobetx_asi.png",
            images: [
                "/projects/gobetx_games.png",
                "/projects/gobetx_account.png",
            ],
            info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
            url: "https://gobetx.com",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Sass, name: "Sass" },
                    { icon: Jest, name: "Jest" },
                    { icon: Webpack, name: "Webpack" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Github, name: "Github" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 7,
            logoSrc: "/projects/leekie/338a/favicon.png",
            name: "338a",
            description: "Online Gaming",
            thumbnail: "/projects/338a_bsi.png",
            images: [
                "/projects/338a_account.png",
                "/projects/338a_asi.png",
                "/projects/338a_reports.png",
                // "/projects/338a_mobile.png",
                // "/projects/338a_mobile_bsi.png",
            ],
            info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
            url: "https://338a.com",
            techStacks: {
                frontend: [
                    { icon: Vuejs, name: "Vuejs" },
                    { icon: Bootstrap, name: "Bootstrap" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Sass, name: "Sass" },
                    { icon: Gulp, name: "Gulp" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Github, name: "Github" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
    ]

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 10000 }),
    ])

    const [isImageReady, setIsImageReady] = useState(false)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const project: any = projects.find((project) => id == project.id)

    if (_.isEmpty(project)) return null

    const { name, description, thumbnail, images, info, techStacks, url } =
        project
    const { frontend, backend, tools } = techStacks

    const imagesCarousel = [thumbnail, ...(images || "")]

    const handleClose = () => {
        // document.documentElement.classList.remove("scroll-smooth")
        if (hasParams) {
            router.back()
        } else {
            onClose()
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    width: "1100px",
                    maxWidth: "none",
                    minHeight: "80vh",
                },
            }}
            fullScreen={isSmallScreen}
        >
            <DialogTitle>
                <div className="flex flex-row gap-2 items-center">
                    <Image
                        width={25}
                        height={25}
                        src={project.logoSrc}
                        alt={"project-logo"}
                    />
                    <p className="text-primary">{name}</p>
                </div>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "#7b8383",
                    }}
                >
                    <CloseIcon className="opacity-0 sm:opacity-100" />
                </IconButton>
            </DialogTitle>
            <DialogContent
                dividers
                className="overflow-auto! lg:overflow-hidden!"
            >
                <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-0">
                    <div className="flex flex-col gap-5">
                        <div className="relative">
                            {/* {!isImageReady && (
                                <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
                                    <Loader />
                                </div>
                            )} */}
                            <>
                                <div className="overflow-hidden" ref={emblaRef}>
                                    <div className="flex">
                                        {imagesCarousel.map((image, index) => (
                                            <div
                                                key={index}
                                                className="min-w-full"
                                            >
                                                <Image
                                                    setIsReady={setIsImageReady}
                                                    src={image}
                                                    width={1000}
                                                    height={100}
                                                    alt={`slide ${index}`}
                                                    Loader={Loader}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {isImageReady && imagesCarousel.length > 1 && (
                                    <>
                                        <button
                                            onClick={scrollPrev}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded cursor-pointer z-[-1] sm:z-1"
                                        >
                                            <ArrowBackIosIcon fontSize="small" />
                                        </button>

                                        <button
                                            onClick={scrollNext}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded cursor-pointer z-[-1] sm:z-1"
                                        >
                                            <ArrowForwardIosIcon fontSize="small" />
                                        </button>
                                    </>
                                )}
                            </>
                        </div>
                        {url ? (
                            <Link href={url} target="_blank">
                                <Button size="small" variant="outlined">
                                    Live demo
                                </Button>
                            </Link>
                        ) : (
                            <div className="my-2">
                                <Alert variant="outlined" color="warning">
                                    <AlertTitle color="warning">
                                        Note
                                    </AlertTitle>
                                    <Typography color="warning">
                                        This website is not yet available at the
                                        production URL.
                                    </Typography>
                                </Alert>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-5 lg:overflow-y-scroll lg:overflow-x-hidden lg:max-h-[68vh] sm:px-5">
                        <div className="flex flex-col gap-2">
                            <p className="text-primary">{description}</p>
                            <DialogContentText>{info}</DialogContentText>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="mt-5 text-primary">Tech Stacks</p>
                            <div className="flex flex-col flex-wrap gap-5 mt-4">
                                <TechStacks
                                    techStack={frontend}
                                    label="Frontend"
                                />
                                <TechStacks
                                    techStack={backend}
                                    label="Backtend"
                                />
                                <TechStacks techStack={tools} label="Tools" />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            {isSmallScreen && (
                <DialogActions>
                    <Button onClick={handleClose}>
                        <CloseIcon />
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}

const TechStacks = ({ techStack, label }: any) => {
    const { state } = useContext(ThemeContext)
    const { theme } = state
    if (!techStack) return
    return (
        <div className="flex flex-col gap-2">
            <div>
                <Chip
                    size="small"
                    color="primary"
                    label={label}
                    variant="outlined"
                />
            </div>
            <div className="flex gap-3 flex-wrap sm:px-2">
                {techStack?.map((item: any, index: any) => (
                    <Tooltip
                        key={index}
                        title={item.name}
                        placement="top"
                        arrow
                    >
                        <div
                            className={classNames([
                                "p-2 rounded-full duration-300 hover:scale-110",
                                theme === "light"
                                    ? "border border-primary-light hover:border-primary"
                                    : "bg-secondary-light border border-transparent hover:border-primary-dark hover:bg-secondary-light",
                            ])}
                        >
                            <item.icon width={20} height={20} />
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}

export default ProjectsDialog
