import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography,
} from "@mui/material"
import { useInView } from "react-intersection-observer"
import DescriptionIcon from "@mui/icons-material/Description"
import TechStacks from "./TechStacks"
import CallIcon from "@mui/icons-material/Call"
import { useState } from "react"
import dynamic from "next/dynamic"
import DownloadIcon from "@mui/icons-material/Download"

const PdfViewer = dynamic(() => import("./PdfViewer"), {
    ssr: false,
})

const About = () => {
    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const [isOpenPdf, setIsOpenPdf] = useState(false)

    const handleOpenPdf = () => setIsOpenPdf(true)

    const handleOnClose = () => setIsOpenPdf(false)

    return (
        <div
            id="about"
            className="flex justify-center min-h-lvh items-center scroll-m-16 sm:scroll-m-0"
            ref={ref}
        >
            <div className="flex sm:justify-center flex-col w-full">
                <div className="overflow-y-hidden">
                    <Slide in={inView} direction="up" timeout={1000}>
                        <p className="text-center text-[16px] sm:text-3xl text-primary">
                            ABOUT ME
                        </p>
                    </Slide>
                </div>
                <div className="flex flex-col sm:flex-row mt-5 gap-3 sm:mt-10">
                    <div className="flex flex-col flex-1 gap-3 sm:gap-5">
                        <Slide direction="right" in={inView} timeout={1000}>
                            <Typography>Elvis John Reyes Cayetano</Typography>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1500}>
                            <p className="text-2xl lg:text-3xl text-primary">
                                Senior Web Developer
                            </p>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={2000}>
                            <Typography>
                                Highly skilled in leveraging pre-rendered and
                                component-based frontend frameworks (such as
                                React, Vue, and Next.js), as well as designing
                                custom UI/UX solutions tailored to specific
                                client needs. On the backend, experienced in
                                developing and maintaining APIs, handling
                                server-side logic, and managing databases to
                                support complex, data-driven applications.
                            </Typography>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={2500}>
                            <div className="flex gap-2 sm:gap-1 md:gap-2">
                                <Button
                                    onClick={handleOpenPdf}
                                    startIcon={<DescriptionIcon />}
                                    variant="outlined"
                                    size="small"
                                >
                                    View My CV
                                </Button>
                                <Button
                                    startIcon={<CallIcon />}
                                    variant="outlined"
                                    size="small"
                                >
                                    Contact Me
                                </Button>
                            </div>
                        </Slide>
                    </div>

                    <div className="flex flex-1 gap-2 flex-col">
                        <Slide direction="left" timeout={1000} in={inView}>
                            <div>{inView && <TechStacks />}</div>
                        </Slide>
                    </div>
                </div>
            </div>
            <Dialog
                open={isOpenPdf}
                onClose={handleOnClose}
                maxWidth="xl"
                // fullScreen
                className="min-w-1/2 w-full lg:[&>div:first-child]:w-screen [&>div>div:first-child]:w-full sm:[&>div>div:first-child]:w-fit"
            >
                <DialogTitle>Updated CV</DialogTitle>
                <DialogContent
                    dividers
                    className="lg:max-w-[75vw] w-full justify-items-center"
                >
                    <PdfViewer />
                </DialogContent>
                <DialogActions>
                    <Button startIcon={<DownloadIcon />}>Download CV</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default About
