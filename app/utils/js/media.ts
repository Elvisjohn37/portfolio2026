/**
 * Uploaded images live in MongoDB and are referenced from the project document
 * as API-relative paths (`/api/media/<id>`) rather than absolute URLs, so the
 * same document renders against the local API and the deployed one.
 *
 * `resolveMediaUrl` turns a stored value into a URL this deployment can
 * actually load, and repairs documents written by an older admin build that
 * stored whichever API origin the upload happened to go through (typically
 * `http://localhost:8080/api/media/<id>`, which is unreachable for visitors of
 * the deployed site).
 */

/** Only `NEXT_PUBLIC_*` is available in the browser, where the SWR fetchers run. */
const API_ORIGIN = (
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_API
)?.replace(/\/+$/, "")

/** The API serves images from `/api/media/<24-hex id>` and nothing else. */
const MEDIA_PATH = /^\/api\/media\/[a-f0-9]{24}$/i

/**
 * Returns the media path when `value` points at the API's image endpoint,
 * whatever origin it was stored with, or `""` when it points anywhere else
 * (a portfolio static asset such as `/projects/x.png`, or an external URL).
 */
const mediaPath = (value: string): string => {
    try {
        // Relative values resolve against a throwaway base; for absolute ones
        // the parsed pathname drops the origin we deliberately discard.
        const { pathname } = new URL(value, "http://placeholder.invalid")

        return MEDIA_PATH.test(pathname) ? pathname : ""
    } catch {
        return ""
    }
}

/** Absolute, loadable URL for a stored image value. */
export const resolveMediaUrl = (value?: string | null): string => {
    const raw = (value ?? "").trim()

    if (!raw) return ""

    const path = mediaPath(raw)

    // Not API media - leave portfolio assets and external URLs untouched.
    if (!path) return raw

    return API_ORIGIN ? `${API_ORIGIN}${path}` : raw
}

/** Applies `resolveMediaUrl` to every image field of a project document. */
export const withResolvedProjectMedia = <T extends {
    logoSrc?: string
    thumbnail?: string
    images?: string[]
}>(project: T): T => ({
    ...project,
    logoSrc: resolveMediaUrl(project.logoSrc),
    thumbnail: resolveMediaUrl(project.thumbnail),
    images: (project.images ?? []).map(resolveMediaUrl),
})

/**
 * True when the image is served by a host the Next.js optimizer refuses to
 * fetch from. It blocks private addresses as an SSRF guard, so images from the
 * local API in development have to bypass it; public hosts are still optimized.
 */
export const isLocalMedia = (src: string): boolean => {
    if (!/^https?:\/\//i.test(src)) return false

    try {
        const { hostname } = new URL(src)
        const isPrivate =
            /^127\./.test(hostname) ||
            /^10\./.test(hostname) ||
            /^192\.168\./.test(hostname) ||
            /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)

        return (
            hostname === "localhost" ||
            hostname === "0.0.0.0" ||
            hostname === "::1" ||
            hostname.endsWith(".local") ||
            isPrivate
        )
    } catch {
        return false
    }
}
