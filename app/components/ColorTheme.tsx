"use client"

import { ToggleButton, ToggleButtonGroup } from "@mui/material"
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
        <ToggleButtonGroup
            color="primary"
            value={theme}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            className="absolute right-2 top-[60px]"
            size="small"
        >
            <ToggleButton value="light">
                <LightModeIcon className={iconClass} fontSize="small" />
            </ToggleButton>
            <ToggleButton value="dark">
                <ModeNightIcon className={iconClass} fontSize="small" />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default ColorTheme
