import React from "react"
import Image from "next/image"

export default function LVSLoader({ size = 60 }) {
    const dotCount = 12 // now 12 dots
    const radius = 20 // distance from center
    const dots = Array.from({ length: dotCount })

    return (
        <div className="flex items-center gap-[14px] px-4 py-2">
            <div
                className="relative flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                {/* Spinner Dots Orbiting */}
                <svg viewBox="0 0 50 50" className="absolute w-full h-full">
                    <g
                        className="animate-spin"
                        style={{
                            transformOrigin: "25px 25px",
                            animationDuration: "2.5s",
                        }}
                    >
                        {dots.map((_, i) => {
                            const angle = (360 / dotCount) * i // evenly spaced
                            const cx =
                                25 + radius * Math.cos((angle * Math.PI) / 180)
                            const cy =
                                25 + radius * Math.sin((angle * Math.PI) / 180)
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
                <div className="text-[20px] font-semibold tracking-[2px]">
                    LVS
                </div>
                <div className="text-[10px] tracking-[3px] opacity-80">
                    WEB SOLUTIONS
                </div>
            </div>

            {/* Extra CSS for spinning */}
            <style jsx>{`
                .animate-spin {
                    animation: spin 2.5s linear infinite; /* slower rotation */
                }

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
