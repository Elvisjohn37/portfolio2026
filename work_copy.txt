"use client"

import { Chip, Collapse, useMediaQuery } from "@mui/material"
import { useState } from "react"
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded"
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { projects } from "../utils/js/projects"

const techLabels: Record<string, string> = {
    Reactjs: "React", Vuejs: "Vue", Nextjs: "Next.js", Nodejs: "Node.js",
    Expressjs: "Express", MaterialUi: "Material UI", Css: "CSS", Html: "HTML",
    Javascript: "JavaScript", Typescript: "TypeScript", Sass: "Sass",
    Mysql: "MySQL", Mongodb: "MongoDB", Github: "GitHub",
    Tailwindcss: "Tailwind CSS", Vitejs: "Vite",
}

const stackGroups = [
    { key: "frontend", label: "Frontend & testing" },
    { key: "backend", label: "Backend & databases" },
    { key: "tools", label: "Tools & delivery" },
] as const

function getProjectStacks(projectIds: number[]) {
    const matchedProjects = projects.filter((project) => projectIds.includes(project.id))
    return stackGroups.map(({ key, label }) => ({
        label,
        technologies: [...new Set(matchedProjects.flatMap((project) =>
            (project.techStacks[key] ?? []).map(({ name }) => techLabels[name] ?? name),
        ))],
    })).filter(({ technologies }) => technologies.length > 0)
}

// Role titles, dates, and contributions are sourced from the portfolio resume.
const experiences = [
    {
        title: "AI Engineer",
        company: "Elgada BPO Solutions Inc.",
        start: "March 2024",
        startDate: "2024-03",
        end: "Present",
        endDate: undefined,
        focus: "Modern web development, powered by AI-assisted engineering.",
        highlights: [
            "Redesign and rebuild legacy websites with React, focusing on maintainability, responsive design, and user experience.",
            "Use Claude AI, GitHub Copilot, and OpenAI Codex for development, code analysis, debugging, and refactoring.",
            "Integrate RESTful APIs, GraphQL, and third-party services; collaborate with designers and project owners on iterative improvements.",
            "Contribute to CI/CD, testing, QA, code reviews, and Agile delivery across browsers and devices.",
        ],
        projectIds: [1],
        skills: ["AI-assisted development", "REST APIs", "GraphQL", "CI/CD"],
    },
    {
        title: "Frontend Web Developer",
        company: "Snapmart Incorporated",
        start: "April 2023",
        startDate: "2023-04",
        end: "March 2024",
        endDate: "2024-03",
        focus: "React interfaces and the modernization of established applications.",
        highlights: [
            "Developed React-based interfaces and managed application state using modern frontend patterns.",
            "Modernized legacy web applications and improved frontend maintainability while adapting to the team's stack and workflows.",
            "Worked toward delivery milestones, participated in field testing, and resolved implementation issues.",
        ],
        projectIds: [2, 3],
        skills: ["State management", "Legacy modernization", "Field testing"],
    },
    {
        title: "Senior Fullstack Web Developer",
        company: "Leekie Enterprises Incorporated",
        start: "October 2018",
        startDate: "2018-10",
        end: "April 2023",
        endDate: "2023-04",
        focus: "Full-stack delivery for online gaming applications.",
        highlights: [
            "Built frontend-heavy applications with React, Vue, SASS, Webpack, and Material UI, alongside backend functionality in PHP, Laravel, Node.js, and Express.",
            "Translated design mockups and workflows into responsive, cross-browser interfaces in collaboration with UI/UX stakeholders.",
            "Maintained and optimized production applications through patching, debugging, and performance tuning, with attention to security and stability.",
        ],
        projectIds: [4, 5, 6, 7],
        skills: ["Performance tuning"],
    },
]

const ExperienceCard = ({ experience, index }: {
    experience: typeof experiences[number]
    index: number
}) => {
    const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: false })
    const current = !experience.endDate
    const linkedProjects = projects.filter((project) =>
        experience.projectIds.includes(project.id) && project.url,
    )
    const [stackExpanded, setStackExpanded] = useState(false)
    const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

    return (
        <li ref={ref} className={`experience-entry ${inView ? "is-visible" : ""}`}>
            <div className="experience-period">
                <span className="experience-dot" aria-hidden="true" />
                <p>
                    <time dateTime={experience.startDate}>{experience.start}</time>
                    <span className="experience-date-divider">—</span>
                    {experience.endDate
                        ? <time dateTime={experience.endDate}>{experience.end}</time>
                        : <span>{experience.end}</span>}
                </p>
                {current && <span className="experience-current">Current role</span>}
            </div>
            <article className="experience-card" aria-labelledby={`experience-role-${index}`}>
                <header>
                    <p className="experience-company">{experience.company}</p>
                    <h3 id={`experience-role-${index}`}>{experience.title}</h3>
                    <p className="experience-focus">{experience.focus}</p>
                </header>
                <ul className="experience-highlights">
                    {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div className="experience-stack-disclosure">
                    <button
                        type="button"
                        className="experience-stack-toggle"
                        id={`experience-stack-toggle-${index}`}
                        aria-expanded={stackExpanded}
                        aria-controls={`experience-stack-${index}`}
                        onClick={() => setStackExpanded((expanded) => !expanded)}
                    >
                        <span>Tech stack & focus areas</span>
                        <ExpandMoreRoundedIcon className="experience-stack-chevron" aria-hidden="true" />
                    </button>
                    <Collapse
                        in={stackExpanded}
                        timeout={reduceMotion ? 0 : 280}
                        id={`experience-stack-${index}`}
                        role="region"
                        aria-labelledby={`experience-stack-toggle-${index}`}
                        aria-hidden={!stackExpanded}
                    >
                    <div className="experience-stack-groups">
                    {[...getProjectStacks(experience.projectIds), {
                        label: "Additional focus",
                        technologies: experience.skills,
                    }].map(({ label, technologies }) => (
                        <div key={label}>
                            <h4 className="experience-stack-label">{label}</h4>
                            <ul className="experience-skills" aria-label={label}>
                                {technologies.map((technology) => (
                                    <li key={technology}><Chip label={technology} size="small" variant="outlined" /></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                    </Collapse>
                </div>
                {linkedProjects.length > 0 && (
                    <div className="experience-projects">
                        <span>Selected projects</span>
                        <ul className="experience-project-links">
                            {linkedProjects.map((project) => (
                                <li key={project.id}>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.name} (opens in a new tab)`}
                                    >
                                        {new URL(project.url!).hostname}
                                        <ArrowOutwardRoundedIcon aria-hidden="true" sx={{ fontSize: 14 }} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </article>
        </li>
    )
}

export default function WorkExperience() {
    return (
        <section className="work-experience" aria-labelledby="work-experience-title">
            <header className="experience-heading">
                <div>
                    <p className="experience-eyebrow"><WorkOutlineRoundedIcon fontSize="small" /> Career journey</p>
                    <h2 id="work-experience-title">Work experience<span aria-hidden="true">.</span></h2>
                    <p className="experience-intro">Building across the stack. Evolving with AI.</p>
                </div>
                <Link href="/cv" className="experience-resume-link">
                    View full resume <ArrowOutwardRoundedIcon fontSize="small" />
                </Link>
            </header>
            <ol className="experience-timeline">
                {experiences.map((experience, index) => (
                    <ExperienceCard key={experience.company} experience={experience} index={index} />
                ))}
            </ol>
        </section>
    )
}
