import React from "react"
import Image from "next/image"

export default function LVSLoader({ size = 60 }) {
    const dotCount = 12 // 12 dots
    const radius = 20 // orbit radius
    const dots = Array.from({ length: dotCount })

    return (
        <div className="flex items-center gap-[14px] px-4 py-2">
            <div
                className="relative flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                {/* Spinner Dots Orbiting with fancy animation */}
                <svg viewBox="0 0 50 50" className="absolute w-full h-full">
                    <g
                        style={{
                            transformOrigin: "25px 25px",
                            animation: "spin 2.5s linear infinite",
                        }}
                    >
                        {dots.map((_, i) => {
                            const angle = (360 / dotCount) * i
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
                                    style={{
                                        animation: `fade 1.2s linear infinite`,
                                        animationDelay: `${(i * 1.2) / dotCount}s`,
                                    }}
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

                @keyframes fade {
                    0%,
                    39%,
                    100% {
                        opacity: 0.2;
                    }
                    40% {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}
