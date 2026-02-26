import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
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
import { redirect } from "next/navigation"
import CloseIcon from "@mui/icons-material/Close"
import SchoolIcon from "@mui/icons-material/School"

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
    const filePath = "/cv/updated CV 01-15-2026.pdf"
    const handleDownload = () => {
        // Create an invisible link and click it programmatically
        const link = document.createElement("a")
        link.href = filePath
        link.download = "CAYETANO_ELVIS_JOHN_REYES.pdf" // File name when downloaded
        link.click()
    }

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
                        <Slide direction="right" in={inView} timeout={1200}>
                            <p className="text-2xl lg:text-3xl text-primary">
                                Senior Web Developer
                            </p>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1400}>
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
                        <Slide direction="right" in={inView} timeout={1600}>
                            <div className="flex gap-2 sm:gap-1 md:gap-2 justify-end sm:justify-start">
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
                                    onClick={() => redirect("#contact")}
                                >
                                    Contact Me
                                </Button>
                            </div>
                        </Slide>
                        <Slide timeout={1800} direction="right" in={inView}>
                            <div className="flex flex-col gap-2">
                                <div
                                    className="flex gap-2
                        "
                                >
                                    <SchoolIcon color="primary" />
                                    <Typography color="primary">
                                        Education
                                    </Typography>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <Typography>Degree: </Typography>
                                        <Typography className="font-bold!">
                                            Bachelor of Science in Information
                                            Technology
                                        </Typography>
                                    </div>
                                    <div className="flex gap-2">
                                        <Typography>School: </Typography>
                                        <Typography className="font-bold!">
                                            AMA Computer Learning Center
                                        </Typography>
                                    </div>
                                    <div className="flex gap-2">
                                        <Typography>School Year: </Typography>
                                        <Typography className="font-bold!">
                                            2014 - 2018
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    </div>

                    <div className="flex flex-1 gap-2 flex-col">
                        <Slide direction="left" timeout={1800} in={inView}>
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
                <DialogTitle>
                    Updated CV
                    <IconButton
                        aria-label="close"
                        onClick={handleOnClose}
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
                    className="lg:max-w-[75vw] w-full justify-items-center"
                >
                    <PdfViewer />
                </DialogContent>
                <DialogActions>
                    <div className="hidden! sm:flex! gap-2">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownload}
                        >
                            Download CV
                        </Button>
                        <Button
                            size="small"
                            startIcon={<CloseIcon />}
                            onClick={handleOnClose}
                            variant="outlined"
                        >
                            Close
                        </Button>
                    </div>
                    <div className="sm:hidden! gap-2">
                        <IconButton color="primary">
                            <DownloadIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={handleOnClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default About
