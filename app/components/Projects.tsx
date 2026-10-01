"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import useSWR from "swr"
import { REVEAL_IN_VIEW_OPTIONS } from "../utils/js/inView"
import classnames from "classnames"
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded"
import TechnologyIcon from "./TechnologyIcon"
import { getProjects } from "../api/projects"
import { isLocalMedia } from "../utils/js/media"

// Grid image width hints so next/image can serve appropriately sized files
const THUMBNAIL_SIZES = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"

// How many stack icons fit comfortably on one card row
const STACK_PREVIEW_LIMIT = 5

// Media paths are resolved to absolute URLs by the data layer
// (`api/projects.ts`), so a src is either a local static asset or an API URL.

const ALL_PROJECTS = "All projects"

const Projects = () => {
    const { ref, inView } = useInView(REVEAL_IN_VIEW_OPTIONS)

    // Projects are managed in the admin panel and served by the API.
    const { data: projects = [], isLoading } = useSWR(["projects"], getProjects, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    })

    // Filter pills are derived from the categories present in the data set.
    const categories = useMemo(() => {
        const counts = new Map<string, number>()

        projects.forEach(({ description }) =>
            counts.set(description, (counts.get(description) ?? 0) + 1),
        )

        return [
            { label: ALL_PROJECTS, count: projects.length },
            ...[...counts].map(([label, count]) => ({ label, count })),
        ]
    }, [projects])

    const [activeCategory, setActiveCategory] = useState(ALL_PROJECTS)

    const visibleProjects = useMemo(
        () =>
            activeCategory === ALL_PROJECTS
                ? projects
                : projects.filter(
                      ({ description }) => description === activeCategory,
                  ),
        [activeCategory, projects],
    )

    return (
        <section className="projects" ref={ref} aria-labelledby="projects-title">
            <div className="app-shell">
                <header className="section-head section-head--start">
                    <p className="section-eyebrow">Selected work</p>
                    <h2 id="projects-title" className="section-title">
                        Projects<span aria-hidden="true">.</span>
                    </h2>
                    <p className="section-subtitle">
                        {projects.length} shipped products — admin dashboards,
                        gaming platforms and customer-facing websites.{" "}
                        {projects.length > 0 && "Open a card for the case study."}
                    </p>
                </header>

                <div className="projects__filters">
                    {categories.map(({ label, count }) => (
                        <button
                            key={label}
                            type="button"
                            className="pill pill--filter"
                            aria-pressed={activeCategory === label}
                            onClick={() => setActiveCategory(label)}
                        >
                            {label}
                            <span className="projects__count">{count}</span>
                        </button>
                    ))}
                </div>

                {isLoading && projects.length === 0 ? (
                    <p className="projects__empty">Loading projects…</p>
                ) : visibleProjects.length === 0 ? (
                    <p className="projects__empty">
                        No projects in this category yet.
                    </p>
                ) : (
                    <ul
                        className={classnames("projects__grid", {
                            "is-visible": inView,
                        })}
                    >
                        {visibleProjects.map((project) => (
                            <li key={project._id}>
                                <Link
                                    href={`/project/${project.slug || project._id}`}
                                    scroll={false}
                                    className="projects__card surface surface-hover"
                                    aria-label={`${project.name} — view the case study`}
                                >
                                    <div className="projects__media">
                                        {project.thumbnail ? (
                                            <Image
                                                src={project.thumbnail}
                                                alt={`${project.name} preview`}
                                                fill
                                                sizes={THUMBNAIL_SIZES}
                                                className="projects__thumb"
                                                unoptimized={isLocalMedia(
                                                    project.thumbnail,
                                                )}
                                            />
                                        ) : null}
                                        <span className="projects__tag">
                                            {project.description}
                                        </span>
                                    </div>

                                    <div className="projects__body">
                                        <div className="projects__title-row">
                                            {project.logoSrc ? (
                                                <Image
                                                    src={project.logoSrc}
                                                    alt=""
                                                    width={26}
                                                    height={26}
                                                    className="projects__logo"
                                                    unoptimized={isLocalMedia(
                                                        project.logoSrc,
                                                    )}
                                                />
                                            ) : null}
                                            <h3 className="projects__name">
                                                {project.name}
                                            </h3>
                                            <ArrowOutwardRoundedIcon
                                                className="projects__arrow"
                                                aria-hidden="true"
                                                sx={{ fontSize: 18 }}
                                            />
                                        </div>

                                        <p className="projects__info">
                                            {project.info}
                                        </p>

                                        <ul className="projects__stack">
                                            {project.techStacks.frontend
                                                .slice(0, STACK_PREVIEW_LIMIT)
                                                .map((name) => (
                                                    <li key={name} title={name}>
                                                        <TechnologyIcon
                                                            name={name}
                                                            size={20}
                                                        />
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default Projects

