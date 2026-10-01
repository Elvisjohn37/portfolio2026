/**
 * Work-experience shape returned by `GET /api/work-experiences/`. The API
 * populates `projects` with a light projection (name / slug / thumbnail / url),
 * so the timeline renders straight from the response.
 */
export type ExperienceProject = {
    _id: string
    name: string
    slug?: string
    thumbnail?: string
    url?: string
}

export type Experience = {
    _id: string
    title: string
    company: string
    /** Human readable labels, e.g. "March 2024" / "Present". */
    start: string
    startDate: string
    end: string
    /** Empty when the role is current. */
    endDate: string
    focus: string
    highlights: string[]
    skills: string[]
    projects: ExperienceProject[]
    order: number
    isPublished: boolean
}
