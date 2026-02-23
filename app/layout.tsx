import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import MainNav from "./components/MainNav"
import ThemeProvider from "./ThemeProvider"
import { Typography } from "@mui/material"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Welcome to my portfolio",
    description: "My portfolio",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider>
                    <MainNav />
                    {children}
                    <div className="flex absolute w-full h-12.5 bg-secondary border-t border-secondary-light justify-center items-center text-secobg-secondary-text">
                        <Typography>All Rights Reserved</Typography>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
