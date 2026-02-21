import {
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
import {
    Bootstrap,
    BrowserCode,
    Css,
    Docker,
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
import TechStacks from "./TechStacks"

const About = () => {
    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    return (
        <div
            id="about"
            className="h-lvh flex justify-center items-center flex-col overflow-x-hidden"
        >
            <div className="lg:w-5xl flex justify-center flex-col w-full">
                <p className="text-center text-3xl text-primary-text">
                    About Me
                </p>
                <div className="flex mt-10" ref={ref}>
                    <div className="flex flex-col flex-1 gap-2">
                        <Slide direction="right" in={inView} timeout={1000}>
                            <Typography>Elvis John Reyes Cayetano</Typography>
                        </Slide>
                        <Slide direction="right" in={inView} timeout={1500}>
                            <p className="text-3xl text-primary-text-accent">
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
                    </div>

                    <div className="flex flex-1 gap-2 flex-col">
                        <Slide direction="left" timeout={1000} in={inView}>
                            <div>{inView && <TechStacks />}</div>
                        </Slide>
                        {/* _________________________________________________________________________ */}
                        {/* <Typography>Techstacks</Typography>
                        <div className="flex gap-2 flex-col">
                            <Slide direction="left" in={inView} timeout={1000}>
                                <div className="flex relative flex-col gap-2 border-2 border-primary rounded-sm px-5 pt-13 pb-5">
                                    <div className="absolute top-0 flex gap-2 left-0 border-b border-r border-primary px-2 py-1 rounded-br-sm">
                                        <BrowserCode
                                            fill="#979797"
                                            width={20}
                                            height={20}
                                        />
                                        <Typography>Frontend</Typography>
                                    </div>
                                    <div className="flex gap-5 flex-wrap">
                                        <div className="icon-container duration-300 transition">
                                            <Reactjs width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Vuejs width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Jquery width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Javascript
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Css width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Html width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Tailwindcss
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <MaterialUi
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Bootstrap width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Sass width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Webpack width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Gulp width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Jest width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Gulp width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Gulp width={20} height={20} />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Gulp width={20} height={20} />
                                        </div>
                                    </div>
                                </div>
                            </Slide>
                            <Slide direction="left" in={inView} timeout={1500}>
                                <div className="flex relative flex-col gap-2 border-2 border-primary rounded-sm px-5 pt-13 pb-5">
                                    <div className="absolute top-0 flex gap-2 left-0 border-b border-r border-primary px-2 py-1 rounded-br-sm">
                                        <BrowserCode
                                            fill="#979797"
                                            width={20}
                                            height={20}
                                        />
                                        <Typography>Backend</Typography>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="icon-container duration-300 transition">
                                            <Docker
                                                fill="#979797"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Docker
                                                fill="#979797"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Docker
                                                fill="#979797"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Slide>
                            <Slide direction="left" in={inView} timeout={2000}>
                                <div className="flex relative flex-col gap-2 border-2 border-primary rounded-sm px-5 pt-13 pb-5">
                                    <div className="absolute top-0 flex gap-2 left-0 border-b border-r border-primary px-2 py-1 rounded-br-sm">
                                        <BrowserCode
                                            fill="#979797"
                                            width={20}
                                            height={20}
                                        />
                                        <Typography>Backend</Typography>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="icon-container duration-300 transition">
                                            <Docker
                                                fill="#979797"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Docker
                                                fill="#979797"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="icon-container duration-300 transition">
                                            <Docker
                                                fill="#979797"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Slide>
                        </div> */}
                        {/* _________________________________________________________________________ */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
