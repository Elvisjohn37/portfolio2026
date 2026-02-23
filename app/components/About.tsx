import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Slide,
    SvgIcon,
    Typography,
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Logo from "@/public/docker.svg"
import DescriptionIcon from "@mui/icons-material/Description"
import TechStacks from "./TechStacks"
import CallIcon from "@mui/icons-material/Call"

const About = () => {
    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    return (
        <div
            id="about"
            className="flex justify-center min-h-lvh items-center scroll-m-16 sm:scroll-m-0"
            ref={ref}
        >
            <div className="flex sm:justify-center flex-col w-full">
                <Slide in={inView} direction="up" timeout={1000}>
                    <p className="text-center text-[16px] sm:text-3xl text-primary">
                        ABOUT ME
                    </p>
                </Slide>
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
        </div>
    )
}

export default About
