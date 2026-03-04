/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material"
import ThemeContext, { ThemeReducer, Ttheme } from "./utils/js/ThemeContext"
import { useEffect, useMemo, useReducer } from "react"

declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: string
        }
    }
    // allow configuration using `createTheme()`
    interface ThemeOptions {
        status?: {
            danger?: string
        }
    }
}

const theme = (activeTheme: Ttheme) => {
    console.log(activeTheme)
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
                secondary: "#7b8383", // 👈 your new secondary text color
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
                        borderColor: "#30374c",
                        borderTopWidth: 1,
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
                        backgroundColor: isLight
                            ? "1px solid #ffff"
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThemeProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(ThemeReducer, {
        theme: "dark",
    })

    const value: any = useMemo(() => ({ state, dispatch }), [state])

    const muiTheme = useMemo(() => theme(state.theme), [state.theme])

    const bgClass =
        state.theme === "dark" ? "bg-secondary-dark" : "bg-background"

    useEffect(() => {
        const currentTheme = window.localStorage.getItem("theme") || "dark"
        window.localStorage.setItem("theme", currentTheme)
        dispatch({
            type: "CHANGE_THEME",
            theme: currentTheme as Ttheme,
        })
    }, [])

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={muiTheme}>
                <div className={bgClass}>{children}</div>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
