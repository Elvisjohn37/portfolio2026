import {
    Button,
    Chip,
    Skeleton,
    Slide,
    Typography,
} from "@mui/material"
import { useInView } from "react-intersection-observer"
import DescriptionIcon from "@mui/icons-material/Description"
import TechStacks from "./TechStacks"
import CallIcon from "@mui/icons-material/Call"
import { useMemo } from "react"
import { redirect } from "next/navigation"
import SchoolIcon from "@mui/icons-material/School"
import { getAboutData } from "../api/about"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import useSWR from "swr"
import Link from "next/link"

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

    const { data, isLoading } = useSWR(["about-data", "about"], getAboutData, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    })

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
            data?.data || {
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
                                {isLoading ? (
                                    <Skeleton className="w-50" />
                                ) : (
                                    fullName
                                )}
                            </Typography>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1200}>
                            <p className="text-2xl lg:text-3xl text-primary">
                                {isLoading ? (
                                    <Skeleton className="w-[80%]" />
                                ) : (
                                    position
                                )}
                            </p>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1400}>
                            <Typography>
                                {isLoading ? (
                                    <>
                                        <Skeleton className="w-[95%]" />
                                        <Skeleton className="w-full" />
                                        <Skeleton className="w-[85%]" />
                                        <Skeleton className="w-[90%]" />
                                        <Skeleton className="w-[80%]" />
                                        <Skeleton className="w-[75%]" />
                                        {isSmallScreen && (
                                            <>
                                                <Skeleton className="w-[80%]" />
                                                <Skeleton className="w-[75%]" />
                                            </>
                                        )}
                                    </>
                                ) : (
                                    about2
                                )}
                            </Typography>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1600}>
                            <div className="flex gap-2 sm:gap-1 md:gap-2 justify-end sm:justify-start">
                                <Link
                                    href="/cv"
                                    className="no-underline"
                                >
                                    <Button
                                        startIcon={<DescriptionIcon />}
                                        variant="outlined"
                                        size="small"
                                    >
                                        View My CV
                                    </Button>
                                </Link>
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
                                            {isLoading ? <Skeleton /> : degree}
                                        </Typography>
                                    </div>
                                    <div className="flex gap-2">
                                        <Typography>School: </Typography>
                                        <Typography className="font-bold! w-[70%]">
                                            {isLoading ? <Skeleton /> : school}
                                        </Typography>
                                    </div>
                                    <div className="flex gap-2">
                                        <Typography>School Year: </Typography>
                                        <Typography className="font-bold! w-[50%]">
                                            {isLoading ? (
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
        </div>
    )
}

export default About
