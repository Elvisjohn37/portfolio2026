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
            images: ["/projects/338a_bsi.png", "/projects/338a_bsi.png"],
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil dolorem dignissimos cupiditate veniam. Voluptatem molestiae sequi corrupti, ipsa laboriosam recusandae aut quas nemo consequuntur exercitationem facilis earum? Explicabo, voluptate unde?",
            url: "https://338a.com",
            techStacks: [
                { icon: Reactjs, name: "Reactjs" },
                { icon: Bootstrap, name: "Bootstrap" },
                { icon: Css, name: "Css" },
                { icon: Html, name: "Html" },
                { icon: Jest, name: "Jest" },
                { icon: MaterialUi, name: "MaterialUi" },
                { icon: Sass, name: "Sass" },
                { icon: Webpack, name: "Webpack" },
            ],
        },
        {
            id: 2,
            name: "GOSDSB",
            description: "Online Gaming",
            thumbnail: "/projects/gobetx_asi.png",
            images: ["/projects/gobetx_asi.png", "/projects/gobetx_asi.png"],
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil dolorem dignissimos cupiditate veniam. Voluptatem molestiae sequi corrupti, ipsa laboriosam recusandae aut quas nemo consequuntur exercitationem facilis earum? Explicabo, voluptate unde?",
            url: "https://338a.com",
            techStacks: [{ icon: Reactjs, name: "Reactjs" }],
        },
        {
            id: 3,
            name: "GOBETX",
            description: "Online Gaming",
            thumbnail: "/projects/gosdsb_asi.png",
            images: ["/projects/gosdsb_asi.png", "/projects/gosdsb_asi.png"],
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil dolorem dignissimos cupiditate veniam. Voluptatem molestiae sequi corrupti, ipsa laboriosam recusandae aut quas nemo consequuntur exercitationem facilis earum? Explicabo, voluptate unde?",
            url: "https://338a.com",
            techStacks: [{ icon: Reactjs, name: "Reactjs" }],
        },
        {
            id: 4,
            name: "SBOBET Classic games",
            description: "Online Gaming",
            thumbnail: "/projects/338a_bsi.png",
            images: ["/projects/338a_bsi.png", "/projects/338a_bsi.png"],
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil dolorem dignissimos cupiditate veniam. Voluptatem molestiae sequi corrupti, ipsa laboriosam recusandae aut quas nemo consequuntur exercitationem facilis earum? Explicabo, voluptate unde?",
            url: "https://338a.com",
            techStacks: [{ icon: Reactjs, name: "Reactjs" }],
        },
    ]

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProject, setCurrentProject] = useState(false)

    const handleClick = (project) => {
        setCurrentProject(project)
        setIsModalOpen(true)
    }

    const handleClose = () => setIsModalOpen(false)

    return (
        <div
            id="projects"
            className="flex flex-col sm:items-center min-h-lvh scroll-m-16"
            ref={ref}
        >
            {inView && (
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
                                    onClick={() => handleClick(project)}
                                >
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe">
                                                R
                                            </Avatar>
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
            )}
        </div>
    )
}

export default Projects
