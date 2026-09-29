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
import { REVEAL_IN_VIEW_OPTIONS } from "../utils/js/inView"
import { useState, type MouseEvent } from "react"
import { getAboutTechStacks } from "../api/about"
import useSWR from "swr"

/** Placeholder tiles rendered while the stack request is in flight. */
const SKELETON_TILES = 10

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

    const { ref, inView } = useInView(REVEAL_IN_VIEW_OPTIONS)

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

    if (isLoading)
        return (
            <div className="tech" aria-hidden="true">
                {Array.from({ length: SKELETON_TILES }, (_, index) => (
                    <div
                        className="tech__skeleton"
                        key={`frontend-skeleton-${index}`}
                    >
                        <span className="tech__skeleton-icon" />
                        <span className="tech__skeleton-label" />
                    </div>
                ))}
            </div>
        )

    return (
        <>
            <ul className="tech" ref={ref}>
                {frontendTechStacks.map((item, index) => (
                    <Grow
                        in={inView}
                        timeout={600 + index * 120}
                        key={`frontend-${item.id}`}
                    >
                        <li className="tech__item">
                            <Tooltip title={item.title} placement="top" arrow>
                                <button
                                    type="button"
                                    className="tech__icon"
                                    aria-label={`${item.title}: ${item.details}`}
                                    onClick={(event) =>
                                        handleClick(event, item.id)
                                    }
                                >
                                    <item.Component width={100} height={100} />
                                </button>
                            </Tooltip>
                            <span className="tech__label">{item.title}</span>
                        </li>
                    </Grow>
                ))}
            </ul>

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
        </>
    )
}

export default FrontendTechStack