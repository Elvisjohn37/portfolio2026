import { Grow, Popover, Tooltip, Typography } from "@mui/material"
import {
    Docker,
    Github,
    Bitbucket,
    Jira,
    Trello,
    Jenkins,
} from "./Icons"
import { useInView } from "react-intersection-observer"
import { useState, type MouseEvent } from "react"
import type { TechIcon } from "../utils/js/projects"

type ToolItem = {
    id: number
    Component: TechIcon
    title: string
    details: string
}

// Module scope: created once instead of on every render
const TOOLS_TECH_STACKS: ToolItem[] = [
    {
        id: 1,
        Component: Docker,
        title: "Docker",
        details: "7 years of experience",
    },
    {
        id: 2,
        Component: Github,
        title: "Github",
        details: "7 years of experience",
    },
    {
        id: 3,
        Component: Bitbucket,
        title: "Bitbucket",
        details: "7 years of experience",
    },
    {
        id: 4,
        Component: Jira,
        title: "Jira",
        details: "7 years of experience",
    },
    {
        id: 5,
        Component: Trello,
        title: "Trello",
        details: "7 years of experience",
    },
    {
        id: 6,
        Component: Jenkins,
        title: "Jenkins",
        details: "7 years of experience",
    },
]

const ToolsTechStack = () => {
    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [currentDetails, setCurrentDetails] = useState<ToolItem | undefined>(
        TOOLS_TECH_STACKS[0],
    )

    const handleClick = (event: MouseEvent<HTMLElement>, id: number) => {
        setAnchorEl(event.currentTarget)
        const currentTechStacks = TOOLS_TECH_STACKS.find(
            (item) => item.id === id,
        )
        setCurrentDetails(currentTechStacks)
    }

    const handleClose = () => setAnchorEl(null)

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    return (
        <>
            <ul className="tech" ref={ref}>
                {TOOLS_TECH_STACKS.map((item, index) => (
                    <Grow
                        in={inView}
                        timeout={600 + index * 120}
                        key={`tools-${item.id}`}
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

export default ToolsTechStack