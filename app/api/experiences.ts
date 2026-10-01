import type { Experience } from "../utils/js/experiences"

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
        return Array.isArray(data?.experiences) ? (data.experiences as Experience[]) : []
    } catch {
        return []
    }
}

export { getExperiences }
