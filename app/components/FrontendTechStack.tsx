import { Button, Grow, Popover, Tooltip, Typography } from "@mui/material"
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
import { useState } from "react"

const FrontendTechStack = () => {
    const frontendTechStacks = [
        {
            Component: Reactjs,
            title: "Reactjs",
            id: 1,
            details:
                "7 years of experience building dynamic, high-performance applications using ReactJS.",
        },
        {
            id: 2,
            Component: Css,
            title: "Css",
            details: "4 years experience",
        },
        {
            id: 3,
            Component: Gulp,
            title: "Gulp",
            details: "4 years experience",
        },
        {
            id: 4,
            Component: Html,
            title: "Html",
            details: "4 years experience",
        },
        {
            id: 5,
            Component: Javascript,
            title: "Javascript",
            details: "4 years experience",
        },
        {
            id: 6,
            Component: Jest,
            title: "Jest",
            details: "4 years experience",
        },
        {
            id: 7,
            Component: Jquery,
            title: "Jquery",
            details: "4 years experience",
        },
        {
            id: 8,
            Component: MaterialUi,
            title: "MaterialUi",
            details: "4 years experience",
        },
        {
            id: 9,
            Component: Bootstrap,
            title: "Bootstrap",
            details: "4 years experience",
        },
        {
            id: 10,
            Component: Sass,
            title: "Sass",
            details: "4 years experience",
        },
        {
            id: 11,
            Component: Tailwindcss,
            title: "Tailwindcss",
            details: "4 years experience",
        },
        {
            id: 12,
            Component: Vuejs,
            title: "Vuejs",
            details: "4 years experience",
        },
        {
            id: 13,
            Component: Webpack,
            title: "Webpack",
            details: "4 years experience",
        },
        {
            id: 14,
            Component: Vitejs,
            title: "Vitejs",
            details: "4 years experience",
        },
        {
            id: 15,
            Component: Typescript,
            title: "Typescript",
            details: "4 years experience",
        },
        {
            id: 16,
            Component: Es6,
            title: "Es6",
            details: "4 years experience",
        },
        {
            id: 17,
            Component: Nextjs,
            title: "Nextjs",
            details: "4 years experience",
        },
        {
            id: 18,
            Component: Wordpress,
            title: "Wordpress",
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
        const currentTeckstacks = frontendTechStacks.find(
            (item) => item.id === id,
        )
        setCurrentDetails(currentTeckstacks)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentDetails, setCurrentDetails] = useState<any>(
        frontendTechStacks[0],
    )

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    return (
        <div ref={ref} className="grid grid-cols-5 gap-2 md:gap-3 lg:gap-5">
            {frontendTechStacks.map((item, index) => (
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

export default FrontendTechStack
