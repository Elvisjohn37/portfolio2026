"use client"
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material"

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

const theme = createTheme({
    cssVariables: true,
    status: {
        danger: "#ea1f1f",
    },
    palette: {
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
                    backgroundColor: "#080d1b",
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
                    backgroundColor: "#0f172a",
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderTop: "1px solid #30374c",
                },
            },
        },
    },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThemeProvider = ({ children }: any) => (
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
)

export default ThemeProvider
