"use client"

import { IconButton } from "@mui/material"
import { useContext } from "react"
import {
    ModeNight as ModeNightIcon,
    LightMode as LightModeIcon,
} from "@mui/icons-material"
import ThemeContext from "../utils/js/ThemeContext"

const ColorTheme = () => {
    const { state, dispatch } = useContext(ThemeContext)
    const { theme } = state

    const handleChange = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        dispatch({
            type: "CHANGE_THEME",
            theme: newTheme,
        })
        window.localStorage.setItem("theme", newTheme)
    }

    const iconClass =
        theme === "dark" ? "color-primary-dark" : "color-primary-light"

    return (
        <IconButton
            onClick={handleChange}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="!absolute right-2 top-[60px]"
            size="small"
            sx={{
                bgcolor: theme === "dark" ? "#30374c" : "#e2e8f0",
                "&:hover": {
                    bgcolor: theme === "dark" ? "#3d4560" : "#d7dee9",
                },
                transition: "background-color 0.3s ease, transform 0.2s ease",
                "&:active": { transform: "scale(0.92)" },
            }}
        >
            {theme === "dark" ? (
                <LightModeIcon className={iconClass} fontSize="small" />
            ) : (
                <ModeNightIcon className={iconClass} fontSize="small" />
            )}
        </IconButton>
    )
}

export default ColorTheme
