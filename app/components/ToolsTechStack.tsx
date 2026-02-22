import { Button, Grow, Popover, Tooltip, Typography } from "@mui/material"
import { Docker, Github, Bitbucket, Jira, Trello, Jenkins } from "./Icons"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

const ToolsTechStack = () => {
    const toolsTechStacks = [
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
            id: 4,
            Component: Trello,
            title: "Trello",
            details: "7 years of experience",
        },
        {
            id: 5,
            Component: Jenkins,
            title: "Jenkins",
            details: "7 years of experience",
        },
    ]

    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        id: number,
    ) => {
        setAnchorEl(event.currentTarget)
        const currentTeckstacks = toolsTechStacks.find((item) => item.id === id)
        setCurrentDetails(currentTeckstacks)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentDetails, setCurrentDetails] = useState<any>(
        toolsTechStacks[0],
    )

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    return (
        <div ref={ref} className="grid grid-cols-5 gap-5">
            {toolsTechStacks.map((item, index) => (
                <Grow in={inView} timeout={1000 + index * 200} key={item.id}>
                    <Tooltip title={item.title} placement="top" arrow>
                        <div className="icon-container">
                            <item.Component
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onClick={(event: any) =>
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
                        {currentDetails.details}
                    </Typography>
                </Popover>
            </div>
        </div>
    )
}

export default ToolsTechStack
