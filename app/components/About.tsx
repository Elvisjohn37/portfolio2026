import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Skeleton,
    Slide,
    Typography,
} from "@mui/material"
import { useInView } from "react-intersection-observer"
import DescriptionIcon from "@mui/icons-material/Description"
import TechStacks from "./TechStacks"
import CallIcon from "@mui/icons-material/Call"
import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import DownloadIcon from "@mui/icons-material/Download"
import { redirect } from "next/navigation"
import CloseIcon from "@mui/icons-material/Close"
import SchoolIcon from "@mui/icons-material/School"
import { getAboutData } from "../api/about"
import _ from "lodash"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const PdfViewer = dynamic(() => import("./PdfViewer"), {
    ssr: false,
})

type TmoreAbout = {
    firstName: string
    middleName: string
    lastName: string
    position: string
    about2: string
    degree: string
    school: string
    schoolYear: string
    // add other fields from `res.data` if needed
}

const About = () => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const { ref, inView } = useInView({
        threshold: 0.2, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const [isReady, setIsReady] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isOpenPdf, setIsOpenPdf] = useState(false)
    const [data, setData] = useState<TmoreAbout | null>(null)

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

    const {
        firstName,
        middleName,
        lastName,
        position,
        about2,
        degree,
        school,
        schoolYear,
    } = useMemo(
        () =>
            data || {
                firstName: "",
                middleName: "",
                lastName: "",
                position: "",
                about2: "",
                degree: "",
                school: "",
                schoolYear: "",
            },
        [data],
    )

    const fullName = `${firstName} ${middleName} ${lastName}`

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAboutData()
            if (_.isEmpty(res.data)) setErrorMessage(res.errorMessage)
            setData(res.data)
            setIsReady(true)
        }
        fetchData()
    }, [])
    console.log(data)

    return (
        <div
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
                            <Typography>
                                {_.isEmpty(data) ? (
                                    <Skeleton className="w-50" />
                                ) : (
                                    fullName
                                )}
                            </Typography>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1200}>
                            <p className="text-2xl lg:text-3xl text-primary">
                                {_.isEmpty(data) ? (
                                    <Skeleton className="w-[80%]" />
                                ) : (
                                    position
                                )}
                            </p>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1400}>
                            <Typography>
                                {_.isEmpty(data) ? (
                                    <>
                                        <Skeleton className="w-[95%]" />
                                        <Skeleton className="w-full" />
                                        <Skeleton className="w-[85%]" />
                                        <Skeleton className="w-[90%]" />
                                        <Skeleton className="w-[80%]" />
                                        <Skeleton className="w-[75%]" />
                                    </>
                                ) : (
                                    about2
                                )}
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
                                        <Typography className="font-bold! w-[80%]">
                                            {_.isEmpty(data) ? (
                                                <Skeleton />
                                            ) : (
                                                degree
                                            )}
                                        </Typography>
                                    </div>
                                    <div className="flex gap-2">
                                        <Typography>School: </Typography>
                                        <Typography className="font-bold! w-[70%]">
                                            {_.isEmpty(data) ? (
                                                <Skeleton />
                                            ) : (
                                                school
                                            )}
                                        </Typography>
                                    </div>
                                    <div className="flex gap-2">
                                        <Typography>School Year: </Typography>
                                        <Typography className="font-bold! w-[50%]">
                                            {_.isEmpty(data) ? (
                                                <Skeleton />
                                            ) : (
                                                schoolYear
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    </div>

                    <div className="flex flex-1 gap-2 flex-col">
                        <Slide direction="left" timeout={1800} in={inView}>
                            <div>
                                <TechStacks />
                            </div>
                        </Slide>
                    </div>
                </div>
            </div>
            <Dialog
                open={isOpenPdf}
                onClose={handleOnClose}
                maxWidth="xl"
                fullScreen={isSmallScreen}
                className="min-w-1/2 w-full lg:[&>div:first-child]:w-screen [&>div>div:first-child]:w-full sm:[&>div>div:first-child]:w-fit"
            >
                <DialogTitle>
                    <p className="text-primary">Updated CV</p>
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
                        <IconButton color="primary" onClick={handleDownload}>
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
