import { Grow, Popover, Tooltip, Typography } from "@mui/material"
import { Docker, Github, Bitbucket, Jira, Trello, Jenkins } from "./Icons"
import { useInView } from "react-intersection-observer"
import { useContext, useState } from "react"
import classnames from "classnames"
import ThemeContext from "../utils/js/ThemeContext"
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
    const { state } = useContext(ThemeContext)
    const { theme } = state

    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null)

    const handleClick = (event: React.MouseEvent<SVGSVGElement>, id: number) => {
        setAnchorEl(event.currentTarget)
        const currentTeckstacks = TOOLS_TECH_STACKS.find((item) => item.id === id)
        setCurrentDetails(currentTeckstacks)
    }

    const handleClose = () => setAnchorEl(null)

    const [currentDetails, setCurrentDetails] = useState<ToolItem | undefined>(
        TOOLS_TECH_STACKS[0],
    )

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    return (
        <div ref={ref} className="grid grid-cols-5 gap-5">
            {TOOLS_TECH_STACKS.map((item, index) => (
                <Grow
                    in={inView}
                    timeout={1000 + index * 200}
                    key={`tools-${item.id}`}
                >
                    <Tooltip title={item.title} placement="top" arrow>
                        <div
                            className={classnames([
                                "icon-container",
                                theme === "dark"
                                    ? "bg-secondary border-secondary-light border hover:shadow-[0_0_8px_#30374c]"
                                    : "bg-secondary border-secondary-light border shadow-md hover:shadow-[0_0_8px_#0d9488]",
                            ])}
                        >
                            <item.Component
                                onClick={(event) =>
                                    handleClick(event, item.id)
                                }
                                className="w-full h-full"
                                width={100}
                                height={100}
                            />
                        </div>
                    </Tooltip>
                </Grow>
            ))}
            <div>
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
                    <Typography sx={{ p: 2 }}>
                        {currentDetails?.details}
                    </Typography>
                </Popover>
            </div>
        </div>
    )
}

export default ToolsTechStack
