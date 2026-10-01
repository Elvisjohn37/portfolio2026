/**
 * Project shape returned by the API (`GET /api/projects/` and
 * `GET /api/projects/:idOrSlug`). Technology entries are plain names; the
 * `TechnologyIcon` component resolves each name to an icon at render time.
 */
export type ProjectTechStacks = {
    frontend: string[]
    backend: string[]
    tools: string[]
}

export type Project = {
    _id: string
    name: string
    slug: string
    description: string
    info: string
    logoSrc: string
    thumbnail: string
    images: string[]
    url: string
    techStacks: ProjectTechStacks
    featured: boolean
    isPublished: boolean
    order: number
}
