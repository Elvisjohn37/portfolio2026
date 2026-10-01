import type { Project } from "../utils/js/projects"
import { withResolvedProjectMedia } from "../utils/js/media"

const url =
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_API

/** Published projects, already sorted by the API (`order`, then `createdAt`). */
const getProjects = async (): Promise<Project[]> => {
    try {
        const res = await fetch(`${url}/api/projects/`)
        if (!res.ok) throw new Error("Projects are unavailable")
        const { data } = await res.json()
        return Array.isArray(data?.projects)
            ? (data.projects as Project[]).map(withResolvedProjectMedia)
            : []
    } catch {
        return []
    }
}

/** SWR fetcher: keyed as `["project", "<slug-or-id>"]`. */
const getProject = async ([, identifier]: [string, string]): Promise<Project | null> => {
    try {
        const res = await fetch(`${url}/api/projects/${encodeURIComponent(identifier)}`)
        if (!res.ok) return null
        const { data } = await res.json()
        const project = (data?.project as Project) ?? null

        return project ? withResolvedProjectMedia(project) : null
    } catch {
        return null
    }
}

export { getProjects, getProject }
