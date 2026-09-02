import { Card, CardHeader, Grow, Slide } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { projects } from "../utils/js/projects"

// Grid image width hints so next/image can serve appropriately sized files
const THUMBNAIL_SIZES = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"

const Projects = () => {
    const { ref, inView } = useInView({
        threshold: 0.1, // Trigger when 10% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    return (
        <div
            className="flex justify-center h-full items-center scroll-m-16 sm:scroll-m-0"
            ref={ref}
        >
            <div className="flex sm:justify-center flex-col w-full">
                <div className="overflow-y-hidden">
                    <Slide in={inView} direction="up" timeout={1000}>
                        <p className="text-center text-[16px] sm:text-3xl text-primary">
                            PROJECTS
                        </p>
                    </Slide>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
                    {projects.map((project, index) => (
                        <Grow
                            in={inView}
                            timeout={1000 + index * 600}
                            key={`${project.name}-${project.id}`}
                        >
                            <Link
                                href={`/project/${project.id}`}
                                scroll={false}
                            >
                                <Card className="cursor-pointer transition-transform">
                                    <CardHeader
                                        avatar={
                                            <Image
                                                src={project.logoSrc}
                                                alt={project.name}
                                                width={20}
                                                height={20}
                                            />
                                        }
                                        title={project.name}
                                        subheader={project.description}
                                    />
                                    <Image
                                        src={project.thumbnail}
                                        width={300}
                                        height={100}
                                        alt={project.name}
                                        sizes={THUMBNAIL_SIZES}
                                        className="w-full duration-300 ease-in-out hover:scale-110"
                                    />
                                </Card>
                            </Link>
                        </Grow>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Projects






