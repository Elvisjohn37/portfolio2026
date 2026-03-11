"use client"

import Image from "next/image"
import { useState } from "react"

type Props = {
    src: string
    alt: string
    fallback?: string
    className?: string
    width?: number
    height?: number
    setIsReady?: (isReady: boolean) => void
}

export default function ImageWithSkeleton({
    src,
    alt,
    fallback = "/fallback.png",
    className = "",
    width,
    height,
    setIsReady,
}: Props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Skeleton */}
            {loading && !error && (
                <div className="absolute inset-0 animate-pulse bg-gray-300" />
            )}

            <Image
                src={error ? fallback : src}
                alt={alt}
                width={width}
                height={height}
                onLoadingComplete={() => {
                    setLoading(false)
                    setIsReady?.(true)
                }}
                onError={() => {
                    setError(true)
                    setLoading(false)
                }}
                className={`transition-opacity duration-500 ${
                    loading ? "opacity-0" : "opacity-100"
                }`}
            />
        </div>
    )
}
