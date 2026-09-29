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
import { useState, useContext, type MouseEvent } from "react"
import useSWR from "swr"
import { getAboutTechStacks } from "../api/about"
import Loader from "./Loader"
import classnames from "classnames"
import ThemeContext from "../utils/js/ThemeContext"

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

interface FrontendTechItem {
    Component: IconComponent
    title: string
    id: string
    details: string
}

const BackendTechStack = () => {
    const { state } = useContext(ThemeContext)
    const { theme } = state
    const { data = [], isLoading } = useSWR<TechStack[]>(
        ["about-tech", "backend"],
        getAboutTechStacks,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
        },
    )

    const backendTechStacks: FrontendTechItem[] = data.map((datum) => ({
        Component: components[datum.name],
        title: datum.name,
        id: datum._id,
        details: datum.description,
    }))

    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [currentDetails, setCurrentDetails] =
        useState<FrontendTechItem | null>(null)

    const handleClick = (event: MouseEvent<SVGSVGElement>, id: string) => {
        setAnchorEl(event.currentTarget.parentElement)

        const selected = backendTechStacks.find((item) => item.id === id)
        setCurrentDetails(selected ?? null)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    if (isLoading) return <Loader />

    return (
        <div ref={ref} className="grid grid-cols-5 gap-5">
            {backendTechStacks.map((item, index) => (
                <Grow
                    in={inView}
                    timeout={1000 + index * 200}
                    key={`backend-${item.id}`}
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

export default BackendTechStack
