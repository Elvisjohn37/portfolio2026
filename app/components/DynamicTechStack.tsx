import { Grow, Popover, Tooltip, Typography } from "@mui/material"
import TechnologyIcon from "./TechnologyIcon"
import { useInView } from "react-intersection-observer"
import { REVEAL_IN_VIEW_OPTIONS } from "../utils/js/inView"
import { useState, type MouseEvent } from "react"
import useSWR from "swr"
import { getAboutTechStacks } from "../api/about"

/** Placeholder tiles rendered while the stack request is in flight. */
const SKELETON_TILES = 10

interface TechStack {
    _id: string
    name: string
    description: string
}

interface TechItem {
    title: string
    id: string
    details: string
}

const DynamicTechStack = ({ group }: { group: string }) => {
    const { data = [], isLoading } = useSWR<TechStack[]>(
        ["about-tech", group],
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
        useState<TechItem | null>(null)

    const techStacks: TechItem[] = data.map((datum) => ({
        title: datum.name,
        id: datum._id,
        details: datum.description,
    }))

    const handleClick = (event: MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget)

        const selected = techStacks.find((item) => item.id === id)
        setCurrentDetails(selected ?? null)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? `${group}-tech-popover` : undefined

    if (isLoading)
        return (
            <div className="tech" aria-hidden="true">
                {Array.from({ length: SKELETON_TILES }, (_, index) => (
                    <div
                        className="tech__skeleton"
                        key={`${group}-skeleton-${index}`}
                    >
                        <span className="tech__skeleton-icon" />
                        <span className="tech__skeleton-label" />
                    </div>
                ))}
            </div>
        )

    if (data.length === 0) return <Typography sx={{ py: 3 }}>No technologies to display yet.</Typography>

    return (
        <>
            <ul className="tech" ref={ref}>
                {techStacks.map((item, index) => (
                    <Grow
                        in={inView}
                        timeout={600 + index * 120}
                        key={`${group}-${item.id}`}
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
                                    <TechnologyIcon name={item.title} size={26} />
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

export default DynamicTechStack
