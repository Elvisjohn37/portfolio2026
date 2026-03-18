import { Grow, Popover, Tooltip, Typography } from "@mui/material"
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
    Vitejs,
    Typescript,
    Es6,
    Nextjs,
    Wordpress,
} from "./Icons"
import { useInView } from "react-intersection-observer"
import { useState, MouseEvent } from "react"
import { getAboutTechStacks } from "../api/about"
import Loader from "./Loader"
import useSWR from "swr"

/**
 * API response type
 */
interface TechStack {
    _id: string
    name: keyof typeof components
    description: string
}

/**
 * Icon component type
 */
type IconComponent = React.ComponentType<{
    onClick?: (event: MouseEvent<HTMLElement>) => void
    className?: string
    width?: number
    height?: number
}>

/**
 * Component mapping type
 */
const components: Record<string, IconComponent> = {
    Bootstrap,
    CSS3: Css,
    Gulp,
    HTML5: Html,
    Javascript,
    Jest,
    jQuery: Jquery,
    MaterialUI: MaterialUi,
    ReactJS: Reactjs,
    SASS: Sass,
    TailwindCSS: Tailwindcss,
    VueJS: Vuejs,
    Webpack,
    Vite: Vitejs,
    Typescript,
    ES6: Es6,
    NextJS: Nextjs,
    Wordpress,
}

/**
 * Transformed UI type
 */
interface FrontendTechItem {
    Component: IconComponent
    title: string
    id: string
    details: string
}

const FrontendTechStack = () => {
    const { data = [], isLoading } = useSWR<TechStack[]>(
        ["about-tech", "frontend"],
        getAboutTechStacks,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
        },
    )

    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false,
    })

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [currentDetails, setCurrentDetails] =
        useState<FrontendTechItem | null>(null)

    const frontendTechStacks: FrontendTechItem[] = data.map((datum) => ({
        Component: components[datum.name],
        title: datum.name,
        id: datum._id,
        details: datum.description,
    }))

    const handleClick = (event: MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget)

        const selected = frontendTechStacks.find((item) => item.id === id)
        setCurrentDetails(selected ?? null)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    if (isLoading) return <Loader />

    return (
        <div ref={ref} className="grid grid-cols-5 gap-2 md:gap-3 lg:gap-5">
            {frontendTechStacks.map((item, index) => (
                <Grow
                    in={inView}
                    timeout={1000 + index * 200}
                    key={`frontend-${item.id}`}
                >
                    <Tooltip title={item.title} placement="top" arrow>
                        <div className="icon-container">
                            <item.Component
                                onClick={(event) => handleClick(event, item.id)}
                                className="w-full h-full duration-300 transition transform-[translate] hover:scale-110"
                                width={100}
                                height={100}
                            />
                        </div>
                    </Tooltip>
                </Grow>
            ))}

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Typography sx={{ p: 2 }}>{currentDetails?.details}</Typography>
            </Popover>
        </div>
    )
}

export default FrontendTechStack
