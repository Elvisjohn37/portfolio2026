/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Fade,
    Grow,
    IconButton,
    IconButtonProps,
    Slide,
    styled,
    Typography,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import ProjectsDialog from "./ProjectsDialog"
import {
    Bitbucket,
    Bootstrap,
    Css,
    Docker,
    Expressjs,
    Github,
    Gulp,
    Html,
    Javascript,
    Jenkins,
    Jest,
    Jira,
    Jquery,
    Laravel,
    MaterialUi,
    Mongodb,
    Mysql,
    Nextjs,
    Nodejs,
    Php,
    Reactjs,
    Sass,
    Tailwindcss,
    Trello,
    Typescript,
    Vitejs,
    Vuejs,
    Webpack,
} from "./Icons"

const Projects = () => {
    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const projects = [
        {
            id: 1,
            name: "338a",
            description: "Online Gaming",
            thumbnail: "/projects/338a_bsi.png",
            images: [
                "/projects/338a_account.png",
                "/projects/338a_asi.png",
                "/projects/338a_mobile.png",
                "/projects/338a_mobile_bsi.png",
                "/projects/338a_reports.png",
            ],
            info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
            url: "https://338a.com",
            techStacks: {
                frontend: [
                    { icon: Vuejs, name: "Vuejs" },
                    { icon: Bootstrap, name: "Bootstrap" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Sass, name: "Sass" },
                    { icon: Gulp, name: "Gulp" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Github, name: "Github" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 2,
            name: "GOBETX",
            description: "Online Gaming",
            thumbnail: "/projects/gobetx_asi.png",
            images: [
                "/projects/gobetx_games.png",
                "/projects/gobetx_account.png",
            ],
            info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
            url: "https://gobetx.com",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Sass, name: "Sass" },
                    { icon: Jest, name: "Jest" },
                    { icon: Webpack, name: "Webpack" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Github, name: "Github" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 3,
            name: "GOSDSB",
            description: "Online Gaming",
            thumbnail: "/projects/gosdsb_bsi.png",
            images: [
                "/projects/gosdsb_asi.png",
                "/projects/gosdsb_reports.png",
            ],
            info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
            url: "https://gosdsb.com",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Sass, name: "Sass" },
                    { icon: Jest, name: "Jest" },
                    { icon: Vitejs, name: "Vitejs" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Github, name: "Github" },
                    { icon: Trello, name: "Trello" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 4,
            name: "SBOBET Classic games",
            description: "Online Gaming",
            thumbnail: "/projects/sbobet_asi.png",
            images: [
                "/projects/sbobet_bsi.png",
                "/projects/sbobet_mobile.png",
                "/projects/sbobet_mobile_reports.png",
            ],
            info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
            url: "https://338a.com",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Jest, name: "Jest" },
                    { icon: Nextjs, name: "Nextjs" },
                    { icon: Tailwindcss, name: "Tailwindcss" },
                ],
                backend: [
                    { icon: Laravel, name: "Laravel" },
                    { icon: Php, name: "PHP" },
                    { icon: Nodejs, name: "Nodejs" },
                    { icon: Expressjs, name: "Expressjs" },
                    { icon: Mysql, name: "Mysql" },
                    { icon: Mongodb, name: "Mongodb" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Github, name: "Github" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 5,
            name: "Landers",
            description: "E-commerce",
            thumbnail: "/projects/landers1.png",
            images: [
                "/projects/landers2.png",
                "/projects/landers3.png",
                "/projects/landers4.png",
                "/projects/landers5.png",
            ],
            info: "Landers offers a wide variety of local and imported products including groceries, household items, personal care, and specialty goods in spacious, well-organized aisles, similar to other membership club formats.",
            url: "http://landers.ph",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Jest, name: "Jest" },
                    { icon: Sass, name: "Sass" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Bitbucket, name: "Bitbucket" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 6,
            name: "Landers Admin Website",
            description: "Admin Website",
            thumbnail: "/projects/landers_admin.png",
            info: "Landers offers a wide variety of local and imported products including groceries, household items, personal care, and specialty goods in spacious, well-organized aisles, similar to other membership club formats.",
            url: "http://landers.ph",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Jest, name: "Jest" },
                    { icon: Sass, name: "Sass" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Bitbucket, name: "Bitbucket" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
        {
            id: 5,
            name: "Streamline Verify",
            description: "Admin Website",
            thumbnail: "/projects/elgada1.png",
            images: [
                "/projects/elgada2.png",
                "/projects/elgada3.png",
                "/projects/elgada4.png",
                "/projects/elgada5.png",
                "/projects/elgada6.png",
                "/projects/elgada7.png",
                "/projects/elgada8.png",
                "/projects/elgada9.png",
                "/projects/elgada10.png",
            ],
            info: "Landers offers a wide variety of local and imported products including groceries, household items, personal care, and specialty goods in spacious, well-organized aisles, similar to other membership club formats.",
            techStacks: {
                frontend: [
                    { icon: Reactjs, name: "Reactjs" },
                    { icon: MaterialUi, name: "MaterialUi" },
                    { icon: Css, name: "Css" },
                    { icon: Html, name: "Html" },
                    { icon: Javascript, name: "Javascript" },
                    { icon: Typescript, name: "Typescript" },
                    { icon: Jest, name: "Jest" },
                    { icon: Sass, name: "Sass" },
                ],
                tools: [
                    { icon: Docker, name: "Docker" },
                    { icon: Bitbucket, name: "Bitbucket" },
                    { icon: Jira, name: "Jira" },
                    { icon: Jenkins, name: "Jenkins" },
                ],
            },
        },
    ]

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProject, setCurrentProject] = useState(false)

    const handleClick = (
        project: boolean | ((prevState: boolean) => boolean),
    ) => {
        setCurrentProject(project)
        setIsModalOpen(true)
    }

    const handleClose = () => setIsModalOpen(false)

    return (
        <div
            id="projects"
            className="flex justify-center min-h-lvh items-center scroll-m-16 sm:scroll-m-0"
            ref={ref}
        >
            <div className="flex sm:justify-center flex-col w-full">
                <Fade in={inView} timeout={1000}>
                    <p className="text-center text-[16px] sm:text-3xl text-primary">
                        PROJECTS
                    </p>
                </Fade>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
                    {projects.map((project, index) => (
                        <Grow
                            in={inView}
                            timeout={1000 + index * 600}
                            key={project.id}
                        >
                            <Card
                                className="cursor-pointer transition-transform duration-300 border-t border-secondary-light ease-in-out hover:scale-110"
                                onClick={() => handleClick(project as any)}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe">R</Avatar>
                                    }
                                    title={project.name}
                                    subheader={project.description}
                                />
                                <Image
                                    src={project.thumbnail}
                                    width={300}
                                    height={100}
                                    alt="test"
                                    className="w-full"
                                />
                            </Card>
                        </Grow>
                    ))}
                </div>
                {currentProject && (
                    <ProjectsDialog
                        open={isModalOpen}
                        data={currentProject}
                        onClose={handleClose}
                    />
                )}
            </div>
        </div>
    )
}

export default Projects
