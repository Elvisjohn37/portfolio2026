import React from "react"
import Image from "next/image"

export default function LVSLoader({ size = 60 }) {
    return (
        <div className="flex items-center gap-[14px] px-4 py-2">
            <div
                className="relative flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                {/* Spinner Ring */}
                <svg
                    viewBox="0 0 50 50"
                    className="absolute w-full h-full animate-spin"
                    style={{ animationDuration: "1.2s" }}
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="#58dad2"
                        strokeWidth="4"
                        opacity="0.3"
                    />
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="#00baab"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="90"
                        strokeDashoffset="60"
                    />
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
        </div>
    )
}
