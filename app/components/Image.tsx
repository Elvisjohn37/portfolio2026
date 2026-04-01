"use client"

import Image, { ImageProps } from "next/image"
import { ReactElement, useState } from "react"
import { TLoaderParams } from "./Loader"

type Props = {
    src: string
    alt: string
    fallback?: string
    className?: string
    width?: number
    height?: number
    setIsReady?: (isReady: boolean) => void
    Loader?: (props: TLoaderParams) => ReactElement
} & ImageProps

export default function ImageWithSkeleton({
    src,
    alt,
    fallback = "/fallback.png",
    className = "",
    setIsReady,
    Loader = () => (
        <div className="absolute inset-0 animate-pulse bg-gray-300 h-full" />
    ),
    ...props
}: Props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Skeleton */}
            {loading && !error && <Loader />}

            <Image
                src={error ? fallback : src}
                alt={alt}
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
                {...props}
            />
        </div>
    )
}
