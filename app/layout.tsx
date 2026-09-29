import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import MainNav from "./components/MainNav"
import ThemeProvider from "./ThemeProvider"

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
    <footer className="border-t border-line">
        <div className="app-shell flex min-h-16 flex-wrap items-center justify-between gap-2 py-4 text-sm text-secondary-text">
            <p>© {new Date().getFullYear()} Elvis John. All rights reserved.</p>
            <p>Built with Next.js, TypeScript &amp; Tailwind CSS</p>
        </div>
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
                    {children}
                    {modal}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
