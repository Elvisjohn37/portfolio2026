import { Grow, Popover, Tooltip, Typography } from "@mui/material"
import {
    Laravel,
    Php,
    Nodejs,
    Expressjs,
    Mysql,
    Postgresql,
    Mongodb,
    IconProps,
} from "./Icons"
import { useInView } from "react-intersection-observer"
import { REVEAL_IN_VIEW_OPTIONS } from "../utils/js/inView"
import { useState, type MouseEvent } from "react"
import useSWR from "swr"
import { getAboutTechStacks } from "../api/about"

/** Placeholder tiles rendered while the stack request is in flight. */
const SKELETON_TILES = 10

type IconComponent = React.ComponentType<IconProps>

const components: Record<string, IconComponent> = {
    Laravel,
    PHP: Php,
    NodeJS: Nodejs,
    Express: Expressjs,
    Mysql,
    Postgresql,
    Mongodb,
}

interface TechStack {
    _id: string
    name: keyof typeof components
    description: string
}

interface BackendTechItem {
    Component: IconComponent
    title: string
    id: string
    details: string
}

const BackendTechStack = () => {
    const { data = [], isLoading } = useSWR<TechStack[]>(
        ["about-tech", "backend"],
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
        useState<BackendTechItem | null>(null)

    const backendTechStacks: BackendTechItem[] = data.map((datum) => ({
        Component: components[datum.name],
        title: datum.name,
        id: datum._id,
        details: datum.description,
    }))

    const handleClick = (event: MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget)

        const selected = backendTechStacks.find((item) => item.id === id)
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
                        key={`backend-skeleton-${index}`}
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
                {backendTechStacks.map((item, index) => (
                    <Grow
                        in={inView}
                        timeout={600 + index * 120}
                        key={`backend-${item.id}`}
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
                                    <item.Component
                                        aria-hidden="true"
                                        width={100}
                                        height={100}
                                    />
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

export default BackendTechStack