import { Button, Grow, Popover, Tooltip, Typography } from "@mui/material"
import {
    Laravel,
    Php,
    Nodejs,
    Expressjs,
    Mysql,
    Postgresql,
    Mongodb,
} from "./Icons"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

const BackendTechStack = () => {
    const backendTechStacks = [
        {
            id: 1,
            Component: Laravel,
            title: "Laravel",
            details: "4 years experience",
        },
        {
            id: 2,
            Component: Php,
            title: "Php",
            details: "4 years experience",
        },
        {
            id: 3,
            Component: Nodejs,
            title: "Nodejs",
            details: "4 years experience",
        },
        {
            id: 4,
            Component: Expressjs,
            title: "Expressjs",
            details: "4 years experience",
        },
        {
            id: 5,
            Component: Mysql,
            title: "Mysql",
            details: "4 years experience",
        },
        {
            id: 6,
            Component: Postgresql,
            title: "Postgresql",
            details: "4 years experience",
        },
        {
            id: 7,
            Component: Mongodb,
            title: "Mongodb",
            details: "4 years experience",
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
        const currentTeckstacks = backendTechStacks.find(
            (item) => item.id === id,
        )
        setCurrentDetails(currentTeckstacks)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentDetails, setCurrentDetails] = useState<any>(
        backendTechStacks[0],
    )

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    return (
        <div ref={ref} className="grid grid-cols-5 gap-5">
            {backendTechStacks.map((item, index) => (
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

export default BackendTechStack
