/* eslint-disable @typescript-eslint/no-explicit-any */
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
    Bootstrap,
    Css,
    Gulp,
    Html,
    Javascript,
    Jest,
    Jquery,
    MaterialUi,
    Reactjs,
    Sass,
    Tailwindcss,
    Vuejs,
    Webpack,
} from "./Icons"
import CloseIcon from "@mui/icons-material/Close"
import Link from "next/link"
import classNames from "classnames"
import ThemeContext from "../utils/js/ThemeContext"
import { useCallback, useContext, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import _ from "lodash"
import Loader from "./Loader"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const ProjectsDialog = ({ open, onClose, data }: any) => {
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

    const { name, description, thumbnail, images, info, techStacks, url } = data
    const { frontend, backend, tools } = techStacks

    const imagesCarousel = [thumbnail, ...(images || "")]

    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                        src={data.logoSrc}
                        alt={"project-logo"}
                    />
                    <p className="text-primary">{name}</p>
                </div>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                    <Button onClick={onClose}>
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
