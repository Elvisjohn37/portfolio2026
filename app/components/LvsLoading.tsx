import React from "react"

export default function LVSLoader({ size = 60 }) {
    return (
        <div style={styles.wrapper}>
            <div
                style={{ ...styles.spinnerWrapper, width: size, height: size }}
            >
                {/* Spinner Ring */}
                <svg viewBox="0 0 50 50" style={styles.spinner}>
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

                {/* Logo (only globe icon) */}
                <img
                    src="/logo-no-text.png"
                    alt="LVS Logo"
                    style={styles.logo}
                />
            </div>

            {/* Text outside spinner */}
            <div style={styles.text}>
                <div style={styles.main}>LVS</div>
                <div style={styles.sub}>WEB SOLUTIONS</div>
            </div>

            <style>
                {`
        @keyframes lvsSpin {
          100% { transform: rotate(360deg); }
        }
        `}
            </style>
        </div>
    )
}

const styles = {
    wrapper: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "10px 16px",
    },
    spinnerWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    spinner: {
        position: "absolute",
        width: "100%",
        height: "100%",
        animation: "lvsSpin 1.2s linear infinite",
    },
    logo: {
        width: "55%",
        height: "55%",
        objectFit: "contain",
    },
    text: {
        color: "#e6e6e6",
        fontFamily: "Arial, sans-serif",
    },
    main: {
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "2px",
    },
    sub: {
        fontSize: "10px",
        letterSpacing: "3px",
        opacity: 0.8,
    },
}
