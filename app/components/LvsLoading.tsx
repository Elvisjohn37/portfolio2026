"use client"

import Image from "next/image"
import { useContext } from "react"
import ThemeContext from "../utils/js/ThemeContext"

export default function LVSLoader({ size = 60 }) {
    const { state } = useContext(ThemeContext)
    const { theme } = state
    const dotCount = 12 // number of dots
    const radius = 20 // orbit radius
    const center = 25 // SVG center coordinate
    const dots = Array.from({ length: dotCount })
    const lvsText = `text-[20px] font-semibold tracking-[2px] ${theme === "light" ? "text-secondary-text" : ""}`
    const webSolutionsText = `text-[10px] tracking-[3px] opacity-80 ${theme === "light" ? "text-secondary-text" : ""}`

    // helper to round to 3 decimal places to avoid hydration mismatch
    const round = (num: number) => Math.round(num * 1000) / 1000

    return (
        <div className="flex items-center gap-[14px] px-4 py-2">
            <div
                className="relative flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                {/* Spinner Dots Orbiting */}
                <svg viewBox="0 0 50 50" className="absolute w-full h-full">
                    <g
                        style={{
                            transformOrigin: `${center}px ${center}px`,
                            animation: "spin 2.5s linear infinite",
                        }}
                    >
                        {dots.map((_, i) => {
                            const angle = (360 / dotCount) * i
                            const cx = round(
                                center +
                                    radius * Math.cos((angle * Math.PI) / 180),
                            )
                            const cy = round(
                                center +
                                    radius * Math.sin((angle * Math.PI) / 180),
                            )
                            return (
                                <circle
                                    key={i}
                                    cx={cx}
                                    cy={cy}
                                    r="3"
                                    fill="#00baab"
                                />
                            )
                        })}
                    </g>
                </svg>

                {/* Logo */}
                <div className="relative w-[55%] h-[55%]">
                    <Image
                        src="/logo-no-text.png"
                        alt="LVS Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Text */}
            <div className="text-[#e6e6e6] font-sans">
                <div className={lvsText}>LVS</div>
                <div className={webSolutionsText}>WEB SOLUTIONS</div>
            </div>

            {/* Extra CSS */}
            <style jsx>{`
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    )
}
