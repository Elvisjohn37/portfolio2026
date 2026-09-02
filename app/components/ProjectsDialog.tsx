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
    IconButton,
    Slide,
    Tooltip,
    Typography,
} from "@mui/material"
import Image from "@/app/components/Image"
import CloseIcon from "@mui/icons-material/Close"
import LaunchIcon from "@mui/icons-material/Launch"
import Link from "next/link"
import classNames from "classnames"
import ThemeContext from "../utils/js/ThemeContext"
import { useCallback, useContext, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Loader from "./Loader"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useRouter } from "next/navigation"
import { projects } from "../utils/js/projects"
import type { TechItem } from "../utils/js/projects"

type ProjectsDialogProps = {
    open?: boolean
    onClose?: () => void
    id?: string | number
    /** true when the dialog is rendered from a route (/project/[id] or the @modal interception) */
    hasParams?: boolean
}

const ProjectsDialog = ({
    open = true,
    onClose,
    id,
    hasParams = false,
}: ProjectsDialogProps) => {
    const router = useRouter()

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({
            delay: 10000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        }),
    ])

    const [isImageReady, setIsImageReady] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index)
        },
        [emblaApi],
    )

    // Keep the dot indicators in sync with the visible slide
    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on("select", onSelect)
        onSelect()
        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi])

    // Navigate the carousel with the keyboard while the dialog is open
    useEffect(() => {
        if (!open) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") scrollPrev()
            if (event.key === "ArrowRight") scrollNext()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [open, scrollPrev, scrollNext])

    const project = projects.find((item) => String(item.id) === String(id))

    if (!project) return null

    const { name, description, thumbnail, images, info, techStacks, url } =
        project
    const { frontend, backend, tools } = techStacks

    const imagesCarousel = [thumbnail, ...(images ?? [])]

    const handleClose = () => {
        // Closing navigates back to "/#projects", which would normally be an
        // animated scroll (html has scroll-smooth in globals.css). Override
        // it so the jump back to the section is instant, then restore smooth
        // scrolling for regular nav links afterwards.
        const rootStyle = document.documentElement.style
        rootStyle.scrollBehavior = "auto"
        if (hasParams) {
            router.back()
        } else {
            onClose?.()
        }
        setTimeout(() => {
            rootStyle.scrollBehavior = ""
        }, 200)
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
                                            aria-label="Previous image"
                                            className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/75 active:scale-95 transition-all duration-200 cursor-pointer z-1 backdrop-blur-sm"
                                        >
                                            <ArrowBackIosIcon
                                                fontSize="small"
                                                sx={{ ml: "2px" }}
                                            />
                                        </button>

                                        <button
                                            onClick={scrollNext}
                                            aria-label="Next image"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/75 active:scale-95 transition-all duration-200 cursor-pointer z-1 backdrop-blur-sm"
                                        >
                                            <ArrowForwardIosIcon
                                                fontSize="small"
                                                sx={{ ml: "2px" }}
                                            />
                                        </button>

                                        <div
                                            role="tablist"
                                            aria-label="Screenshot pagination"
                                            className="flex justify-center gap-2 mt-3"
                                        >
                                            {imagesCarousel.map(
                                                (_, index) => (
                                                    <button
                                                        key={index}
                                                        role="tab"
                                                        aria-selected={
                                                            index ===
                                                            selectedIndex
                                                        }
                                                        aria-label={`Go to image ${index + 1}`}
                                                        onClick={() =>
                                                            scrollTo(index)
                                                        }
                                                        className={classNames(
                                                            "h-2 rounded-full transition-all duration-300 cursor-pointer",
                                                            index ===
                                                                selectedIndex
                                                                ? "w-6 bg-primary"
                                                                : "w-2 bg-secondary-text/50 hover:bg-secondary-text",
                                                        )}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </>
                                )}
                            </>
                        </div>
                        {url ? (
                            <Link
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="no-underline w-fit"
                            >
                                <Button
                                    size="small"
                                    variant="outlined"
                                    endIcon={
                                        <LaunchIcon fontSize="small" />
                                    }
                                >
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
                    <div className="flex flex-col gap-5 lg:overflow-y-auto lg:overflow-x-hidden lg:max-h-[68vh] [scrollbar-gutter:stable] sm:px-5">
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
                                    label="Backend"
                                />
                                <TechStacks techStack={tools} label="Tools" />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            {isSmallScreen && (
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                        aria-label="Close dialog"
                    >
                        Close
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}

type TechStacksProps = {
    techStack?: TechItem[]
    label: string
}

const TechStacks = ({ techStack, label }: TechStacksProps) => {
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
