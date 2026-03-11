/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material"
import ThemeContext, { ThemeReducer, Ttheme } from "./utils/js/ThemeContext"
import { useEffect, useMemo, useReducer, ReactNode } from "react"

declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: string
        }
    }

    interface ThemeOptions {
        status?: {
            danger?: string
        }
    }
}

interface Props {
    children: ReactNode
}

const createAppTheme = (activeTheme: Ttheme) => {
    const isLight = activeTheme === "light"

    return createTheme({
        cssVariables: true,
        status: {
            danger: "#ea1f1f",
        },
        palette: {
            mode: activeTheme,
            primary: {
                main: "#58dad2",
            },
            secondary: {
                main: "#0f172a",
            },
            text: {
                primary: "#dbf6f5",
                secondary: "#7b8383",
            },
        },
        components: {
            MuiTypography: {
                defaultProps: {
                    color: "text.secondary",
                },
            },
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isLight ? "#ffffff" : "#080d1b",
                        color: "#7b8383",
                        border: "1px solid #30374c",
                        maxWidth: 300,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight ? "#ffffff" : "#0f172a",
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        border: isLight
                            ? "1px solid #ffffff"
                            : "1px solid #30374c",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderTop: isLight
                            ? "1px solid #ffffff"
                            : "1px solid #30374c",
                    },
                },
            },
        },
    })
}

const ThemeProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(ThemeReducer, { theme: "dark" })

    const muiTheme = useMemo(() => createAppTheme(state.theme), [state.theme])

    const contextValue: any = useMemo(() => ({ state, dispatch }), [state])

    const bgClass =
        state.theme === "dark" ? "bg-secondary-dark" : "bg-background"

    useEffect(() => {
        const storedTheme = (localStorage.getItem("theme") as Ttheme) || "dark"

        dispatch({
            type: "CHANGE_THEME",
            theme: storedTheme,
        })
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", state.theme)
    }, [state.theme])

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={muiTheme}>
                <div className={bgClass}>{children}</div>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
