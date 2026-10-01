import type { NextConfig } from "next"

/**
 * Hosts that serve uploaded project images. Media uploaded from the admin is
 * stored by the Express API and returned as absolute URLs, so `next/image`
 * must be allowed to fetch from the API origin in both dev and production.
 */
const apiOrigins = [process.env.NEXT_PUBLIC_API, process.env.NEXT_PUBLIC_API_LOCALHOST]
    .filter((value): value is string => Boolean(value))
    .flatMap(value => {
        try {
            const origin = new URL(value)
            return {
                protocol: origin.protocol.replace(":", "") as "http" | "https",
                hostname: origin.hostname,
                port: origin.port,
            }
        } catch {
            return []
        }
    })

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: apiOrigins,
    },
}

export default nextConfig

