import {
    Button,
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

const ProjectsDialog = ({ open, onClose, data }) => {
    const { name, description, thumbnail, images, info, techStacks, url } = data
    const settings = {
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
                    {[thumbnail, ...images].map((image, index) => (
                        <div key={index}>
                            <Image
                                src={image}
                                width={600}
                                height={100}
                                alt={`slide ${index}`}
                                className="w-full"
                            />
                        </div>
                    ))}
                </Slider>
                <MuiLink>
                    <Link href={url} target="_blank">
                        {url}
                    </Link>
                </MuiLink>
                <DialogContentText>{info}</DialogContentText>
                <div className="flex flex-wrap gap-2 mt-4">
                    {techStacks.map((techStack, index) => (
                        <Tooltip
                            key={index}
                            title={techStack.name}
                            placement="top"
                            arrow
                        >
                            <div className="p-2 bg-secondary-dark border border-transparent w-fit rounded-full duration-300 hover:border-primary-dark">
                                <techStack.icon />
                            </div>
                        </Tooltip>
                    ))}
                </div>
            </DialogContent>
            <DialogActions className="sm:opacity-0">
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProjectsDialog
