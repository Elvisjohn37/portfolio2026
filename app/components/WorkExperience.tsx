"use client"

import { Chip, Collapse, useMediaQuery } from "@mui/material"
import { useState } from "react"
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded"
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import { useInView } from "react-intersection-observer"
import { REVEAL_IN_VIEW_OPTIONS } from "../utils/js/inView"
import Link from "next/link"
import useSWR from "swr"
import { getExperiences } from "../api/experiences"
import { getProjects } from "../api/projects"
import type { Experience } from "../utils/js/experiences"
import type { Project } from "../utils/js/projects"

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

/**
 * The timeline only carries a light project projection (name / slug /
 * thumbnail / url), so the full project list is matched by id to recover each
 * role's tech stacks.
 */
function getProjectStacks(projects: Project[], experience: Experience) {
    const ids = new Set(experience.projects.map((project) => project._id))
    const matchedProjects = projects.filter((project) => ids.has(project._id))
    return stackGroups.map(({ key, label }) => ({
        label,
        technologies: [...new Set(matchedProjects.flatMap((project) =>
            (project.techStacks[key] ?? []).map((name) => techLabels[name] ?? name),
        ))],
    })).filter(({ technologies }) => technologies.length > 0)
}

const ExperienceCard = ({ experience, index, projects }: {
    experience: Experience
    index: number
    projects: Project[]
}) => {
    const { ref, inView } = useInView(REVEAL_IN_VIEW_OPTIONS)
    const current = !experience.endDate
    // The API already populated each role's projects, so the chips come
    // straight from the response; only roles with a live site get a chip.
    const linkedProjects = experience.projects.filter((project) => project.url)
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
                    {[...getProjectStacks(projects, experience), {
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
                                <li key={project._id}>
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
    // Roles are managed in the admin panel and served by the API.
    const { data: experiences = [], isLoading } = useSWR(["work-experience"], getExperiences, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    })

    // Full project documents, needed only for the per-role tech stacks.
    const { data: projects = [] } = useSWR(["projects"], getProjects, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    })

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
            {isLoading && experiences.length === 0 ? (
                <p className="experience-empty">Loading work experience…</p>
            ) : experiences.length === 0 ? (
                <p className="experience-empty">No work experience published yet.</p>
            ) : (
                <ol className="experience-timeline">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={experience._id} experience={experience} index={index} projects={projects} />
                    ))}
                </ol>
            )}
        </section>
    )
}
