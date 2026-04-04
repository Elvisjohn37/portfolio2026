import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import MainNav from "./components/MainNav"
import ThemeProvider from "./ThemeProvider"
import ColorTheme from "./components/ColorTheme"

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

const Footer = () => (
    <footer className="flex absolute w-full h-12.5 bg-secondary border-t border-secondary-light justify-center items-center text-secobg-secondary-text">
        <p>All Rights Reserved</p>
    </footer>
)

export default function RootLayout({
    children,
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider>
                    <MainNav />
                    <ColorTheme />
                    {children}
                    {modal}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
