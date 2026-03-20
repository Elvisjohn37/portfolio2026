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
import Image from "next/image"
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
import { useContext } from "react"

const ProjectsDialog = ({ open, onClose, data }: any) => {
    const { name, description, thumbnail, images, info, techStacks, url } = data
    const { frontend, backend, tools } = techStacks

    const settings: any = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        lazyLoad: true,
        // customPaging: function (i) {
        //     return (
        //         <a>
        //             <img src={`${baseUrl}/abstract0${i + 1}.jpg`} />
        //         </a>
        //     )
        // },
    }
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl">
            <DialogTitle>
                {name}
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
                className="w-full md:w-[80vw] lg:w-[50vw] p-2"
                sx={{
                    overflowX: "hidden", // Hide scrollbars
                    padding: 5,
                    // width: "100%",
                }}
            >
                <Slider {...settings}>
                    {[thumbnail, ...(images || "")].map((image, index) => (
                        <div key={index}>
                            <Image
                                src={image}
                                width={600}
                                height={100}
                                alt={`slide ${index}`}
                                className="h-full center"
                            />
                        </div>
                    ))}
                </Slider>

                {url ? (
                    <MuiLink>
                        <Link href={url} target="_blank">
                            {url}
                        </Link>
                    </MuiLink>
                ) : (
                    <div className="my-2">
                        <Alert variant="outlined" color="warning">
                            <AlertTitle color="warning">Note</AlertTitle>
                            <Typography color="warning">
                                This website is not yet available at the
                                production URL.
                            </Typography>
                        </Alert>
                    </div>
                )}
                <DialogContentText>{info}</DialogContentText>
                <p className="mt-5 text-primary">Tech Stacks</p>
                <div className="flex flex-col flex-wrap gap-5 mt-4">
                    <TechStacks techStack={frontend} label="Frontend" />
                    <TechStacks techStack={backend} label="Backtend" />
                    <TechStacks techStack={tools} label="Tools" />
                </div>
            </DialogContent>
            <DialogActions className="sm:opacity-0">
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
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
            <div className="flex gap-3 flex-wrap">
                {techStack?.map((item: any, index: any) => (
                    <Tooltip
                        key={index}
                        title={item.name}
                        placement="top"
                        arrow
                    >
                        <div
                            className={classNames([
                                "p-3 rounded-full duration-300 hover:scale-130",
                                theme === "light"
                                    ? "shadow-2xs hover:border-secondary-dark"
                                    : "bg-secondary border border-transparent hover:border-primary-dark hover:bg-secondary-light",
                            ])}
                        >
                            <item.icon width={30} height={30} />
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}

export default ProjectsDialog
