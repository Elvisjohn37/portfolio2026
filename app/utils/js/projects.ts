import type { ComponentType, SVGProps } from "react"
import {
    Bitbucket,
    Bootstrap,
    Css,
    Docker,
    Expressjs,
    Github,
    Gulp,
    Html,
    Javascript,
    Jenkins,
    Jest,
    Jira,
    Laravel,
    MaterialUi,
    Mongodb,
    Mysql,
    Nextjs,
    Nodejs,
    Php,
    Reactjs,
    Sass,
    Tailwindcss,
    Trello,
    Typescript,
    Vitejs,
    Vuejs,
    Webpack,
} from "../../components/Icons"

export type TechIcon = ComponentType<SVGProps<SVGSVGElement>>

export type TechItem = {
    icon: TechIcon
    name: string
}

export type ProjectTechStacks = {
    frontend: TechItem[]
    backend?: TechItem[]
    tools?: TechItem[]
}

export type Project = {
    id: number
    logoSrc: string
    name: string
    description: string
    thumbnail: string
    images?: string[]
    info: string
    url?: string
    techStacks: ProjectTechStacks
}

// Single source of truth, defined at module scope so it is created once
// instead of being rebuilt on every render of the projects grid/dialog.
export const projects: Project[] = [
    {
        id: 1,
        logoSrc: "/projects/elgada/streameline verify/favicon.webp",
        name: "Streamline Verify",
        description: "Admin Website",
        thumbnail: "/projects/elgada1.png",
        images: [
            "/projects/elgada2.png",
            "/projects/elgada3.png",
            "/projects/elgada4.png",
            "/projects/elgada5.png",
            "/projects/elgada6.png",
            "/projects/elgada7.png",
            "/projects/elgada8.png",
            "/projects/elgada9.png",
            "/projects/elgada10.png",
        ],
        info: "This is an admin website of employee records, organization records, etc.",
        techStacks: {
            frontend: [
                { icon: Reactjs, name: "Reactjs" },
                { icon: MaterialUi, name: "MaterialUi" },
                { icon: Css, name: "Css" },
                { icon: Html, name: "Html" },
                { icon: Javascript, name: "Javascript" },
                { icon: Typescript, name: "Typescript" },
                { icon: Jest, name: "Jest" },
                { icon: Sass, name: "Sass" },
            ],
            tools: [
                { icon: Docker, name: "Docker" },
                { icon: Bitbucket, name: "Bitbucket" },
                { icon: Jira, name: "Jira" },
                { icon: Jenkins, name: "Jenkins" },
            ],
            backend: [
                { icon: Laravel, name: "Laravel" },
                { icon: Php, name: "PHP" },
                { icon: Nodejs, name: "Nodejs" },
                { icon: Expressjs, name: "Expressjs" },
                { icon: Mysql, name: "Mysql" },
                { icon: Mongodb, name: "Mongodb" },
            ],
        },
    },
    {
        id: 2,
        logoSrc: "/projects/landers/favicon.ico",
        name: "Landers Admin Website",
        description: "Admin Website",
        thumbnail: "/projects/landers_admin.png",
        info: "Landers offers a wide variety of local and imported products including groceries, household items, personal care, and specialty goods in spacious, well-organized aisles, similar to other membership club formats.",
        url: "https://admin.snapmart.ph",
        techStacks: {
            frontend: [
                { icon: Reactjs, name: "Reactjs" },
                { icon: MaterialUi, name: "MaterialUi" },
                { icon: Css, name: "Css" },
                { icon: Html, name: "Html" },
                { icon: Javascript, name: "Javascript" },
                { icon: Typescript, name: "Typescript" },
                { icon: Jest, name: "Jest" },
                { icon: Sass, name: "Sass" },
            ],
            tools: [
                { icon: Docker, name: "Docker" },
                { icon: Bitbucket, name: "Bitbucket" },
                { icon: Jira, name: "Jira" },
                { icon: Jenkins, name: "Jenkins" },
            ],
        },
    },
    {
        id: 3,
        logoSrc: "/projects/landers/favicon.ico",
        name: "Landers",
        description: "E-commerce",
        thumbnail: "/projects/landers1.png",
        images: [
            "/projects/landers2.png",
            "/projects/landers3.png",
            "/projects/landers4.png",
            "/projects/landers5.png",
        ],
        info: "Landers offers a wide variety of local and imported products including groceries, household items, personal care, and specialty goods in spacious, well-organized aisles, similar to other membership club formats.",
        url: "http://landers.ph",
        techStacks: {
            frontend: [
                { icon: Reactjs, name: "Reactjs" },
                { icon: MaterialUi, name: "MaterialUi" },
                { icon: Css, name: "Css" },
                { icon: Html, name: "Html" },
                { icon: Javascript, name: "Javascript" },
                { icon: Typescript, name: "Typescript" },
                { icon: Jest, name: "Jest" },
                { icon: Sass, name: "Sass" },
            ],
            tools: [
                { icon: Docker, name: "Docker" },
                { icon: Bitbucket, name: "Bitbucket" },
                { icon: Jira, name: "Jira" },
                { icon: Jenkins, name: "Jenkins" },
            ],
        },
    },
    {
        id: 4,
        logoSrc: "/projects/leekie/sbobet/favicon.ico",
        name: "SBOBET Classic games",
        description: "Online Gaming",
        thumbnail: "/projects/sbobet_asi.png",
        images: [
            "/projects/sbobet_bsi.png",
            // "/projects/sbobet_mobile.png",
            // "/projects/sbobet_mobile_reports.png",
        ],
        info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
        url: "https://games.classicku.com",
        techStacks: {
            frontend: [
                { icon: Reactjs, name: "Reactjs" },
                { icon: MaterialUi, name: "MaterialUi" },
                { icon: Css, name: "Css" },
                { icon: Html, name: "Html" },
                { icon: Javascript, name: "Javascript" },
                { icon: Typescript, name: "Typescript" },
                { icon: Jest, name: "Jest" },
                { icon: Nextjs, name: "Nextjs" },
                { icon: Tailwindcss, name: "Tailwindcss" },
            ],
            backend: [
                { icon: Laravel, name: "Laravel" },
                { icon: Php, name: "PHP" },
                { icon: Nodejs, name: "Nodejs" },
                { icon: Expressjs, name: "Expressjs" },
                { icon: Mysql, name: "Mysql" },
                { icon: Mongodb, name: "Mongodb" },
            ],
            tools: [
                { icon: Docker, name: "Docker" },
                { icon: Github, name: "Github" },
                { icon: Jira, name: "Jira" },
                { icon: Jenkins, name: "Jenkins" },
            ],
        },
    },
    {
        id: 5,
        logoSrc: "/projects/leekie/gosdsb/favicon.png",
        name: "GOSDSB",
        description: "Online Gaming",
        thumbnail: "/projects/gosdsb_bsi.png",
        images: ["/projects/gosdsb_asi.png", "/projects/gosdsb_reports.png"],
        info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
        url: "https://gosdsb.com",
        techStacks: {
            frontend: [
                { icon: Reactjs, name: "Reactjs" },
                { icon: MaterialUi, name: "MaterialUi" },
                { icon: Css, name: "Css" },
                { icon: Html, name: "Html" },
                { icon: Javascript, name: "Javascript" },
                { icon: Typescript, name: "Typescript" },
                { icon: Sass, name: "Sass" },
                { icon: Jest, name: "Jest" },
                { icon: Vitejs, name: "Vitejs" },
            ],
            backend: [
                { icon: Laravel, name: "Laravel" },
                { icon: Php, name: "PHP" },
                { icon: Nodejs, name: "Nodejs" },
                { icon: Expressjs, name: "Expressjs" },
                { icon: Mysql, name: "Mysql" },
                { icon: Mongodb, name: "Mongodb" },
            ],
            tools: [
                { icon: Docker, name: "Docker" },
                { icon: Github, name: "Github" },
                { icon: Trello, name: "Trello" },
                { icon: Jenkins, name: "Jenkins" },
            ],
        },
    },
    {
        id: 6,
        logoSrc: "/projects/leekie/gobetx/favicon.png",
        name: "GOBETX",
        description: "Online Gaming",
        thumbnail: "/projects/gobetx_asi.png",
        images: [
            "/projects/gobetx_games.png",
            "/projects/gobetx_account.png",
        ],
        info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
        url: "https://gobetx.com",
        techStacks: {
            frontend: [
                { icon: Reactjs, name: "Reactjs" },
                { icon: MaterialUi, name: "MaterialUi" },
                { icon: Css, name: "Css" },
                { icon: Html, name: "Html" },
                { icon: Javascript, name: "Javascript" },
                { icon: Typescript, name: "Typescript" },
                { icon: Sass, name: "Sass" },
                { icon: Jest, name: "Jest" },
                { icon: Webpack, name: "Webpack" },
            ],
            backend: [
                { icon: Laravel, name: "Laravel" },
                { icon: Php, name: "PHP" },
                { icon: Nodejs, name: "Nodejs" },
                { icon: Expressjs, name: "Expressjs" },
                { icon: Mysql, name: "Mysql" },
                { icon: Mongodb, name: "Mongodb" },
            ],
            tools: [
                { icon: Docker, name: "Docker" },
                { icon: Github, name: "Github" },
                { icon: Jira, name: "Jira" },
                { icon: Jenkins, name: "Jenkins" },
            ],
        },
    },
    {
        id: 7,
        logoSrc: "/projects/leekie/338a/favicon.png",
        name: "338a",
        description: "Online Gaming",
        thumbnail: "/projects/338a_bsi.png",
        images: [
            "/projects/338a_account.png",
            "/projects/338a_asi.png",
            "/projects/338a_reports.png",
            // "/projects/338a_mobile.png",
            // "/projects/338a_mobile_bsi.png",
        ],
        info: "Online gaming casino platform, designed exclusively for players across Indonesia. Our website offers a secure, fast, and immersive gaming experience featuring popular slot games, live casino tables, sports betting, and exciting jackpot opportunities. Built with user-friendly navigation and mobile compatibility, players can enjoy seamless access anytime, anywhere within Indonesia.",
        url: "https://338a.com",
        techStacks: {
            frontend: [
                { icon: Vuejs, name: "Vuejs" },
                { icon: Bootstrap, name: "Bootstrap" },
                { icon: Css, name: "Css" },
                { icon: Html, name: "Html" },
                { icon: Javascript, name: "Javascript" },
                { icon: Typescript, name: "Typescript" },
                { icon: Sass, name: "Sass" },
                { icon: Gulp, name: "Gulp" },
            ],
            backend: [
                { icon: Laravel, name: "Laravel" },
                { icon: Php, name: "PHP" },
                { icon: Nodejs, name: "Nodejs" },
                { icon: Expressjs, name: "Expressjs" },
                { icon: Mysql, name: "Mysql" },
                { icon: Mongodb, name: "Mongodb" },
            ],
            tools: [
                { icon: Docker, name: "Docker" },
                { icon: Github, name: "Github" },
                { icon: Jira, name: "Jira" },
                { icon: Jenkins, name: "Jenkins" },
            ],
        },
    },
]
