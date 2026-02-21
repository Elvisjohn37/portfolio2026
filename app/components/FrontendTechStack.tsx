import { Grow, Tooltip } from "@mui/material"
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
} from "./Icons"
import { useInView } from "react-intersection-observer"

const FrontendTechStack = () => {
    const FrontendTechStacks = [
        {
            id: 1,
            Component: Bootstrap,
            title: "Bootstrap",
            label: "4 years experience",
        },
        {
            id: 2,
            Component: Css,
            title: "Css",
            label: "4 years experience",
        },
        {
            id: 3,
            Component: Gulp,
            title: "Gulp",
            label: "4 years experience",
        },
        {
            id: 4,
            Component: Html,
            title: "Html",
            label: "4 years experience",
        },
        {
            id: 5,
            Component: Javascript,
            title: "Javascript",
            label: "4 years experience",
        },
        {
            id: 6,
            Component: Jest,
            title: "Jest",
            label: "4 years experience",
        },
        {
            id: 7,
            Component: Jquery,
            title: "Jquery",
            label: "4 years experience",
        },
        {
            id: 8,
            Component: MaterialUi,
            title: "MaterialUi",
            label: "4 years experience",
        },
        {
            id: 9,
            Component: Reactjs,
            title: "Reactjs",
            label: "4 years experience",
        },
        {
            id: 10,
            Component: Sass,
            title: "Sass",
            label: "4 years experience",
        },
        {
            id: 11,
            Component: Tailwindcss,
            title: "Tailwindcss",
            label: "4 years experience",
        },
        {
            id: 12,
            Component: Vuejs,
            title: "Vuejs",
            label: "4 years experience",
        },
        {
            id: 13,
            Component: Webpack,
            title: "Webpack",
            label: "4 years experience",
        },
    ]

    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    return (
        <div ref={ref} className="grid grid-cols-5 gap-5">
            {FrontendTechStacks.map((item, index) => (
                <Grow in={inView} timeout={1000 + index * 200} key={item.id}>
                    <Tooltip title={item.title} placement="top" arrow>
                        <div className="icon-container">
                            <item.Component
                                className="w-full h-full"
                                width={100}
                                height={100}
                            />
                        </div>
                    </Tooltip>
                </Grow>
            ))}
        </div>
    )
}

export default FrontendTechStack
