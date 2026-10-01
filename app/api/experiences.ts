import type { Experience } from "../utils/js/experiences"
import { resolveMediaUrl } from "../utils/js/media"

const url =
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_API

/** Published roles, newest first, with each role's projects populated. */
const getExperiences = async (): Promise<Experience[]> => {
    try {
        const res = await fetch(`${url}/api/work-experiences/`)
        if (!res.ok) throw new Error("Work experience is unavailable")
        const { data } = await res.json()
        if (!Array.isArray(data?.experiences)) return []

        // Each role embeds a light project projection (name / slug / thumbnail),
        // so the thumbnails need the same API-origin resolution as the grid.
        return (data.experiences as Experience[]).map(experience => ({
            ...experience,
            projects: (experience.projects ?? []).map(project => ({
                ...project,
                thumbnail: resolveMediaUrl(project.thumbnail),
            })),
        }))
    } catch {
        return []
    }
}

export { getExperiences }
