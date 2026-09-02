"use client"

import { Document, Page, pdfjs } from "react-pdf"
import { DotLoader } from "react-spinners"
import { useContext, useState, useEffect, useRef, useCallback } from "react"
import ThemeContext from "../utils/js/ThemeContext"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString()

const Loading = () => {
    const { state } = useContext(ThemeContext)
    const { theme } = state
    return (
        <div className="flex items-center justify-center w-full h-full min-h-[200px]">
            <DotLoader color={theme === "dark" ? "#58dad2" : "#0d9488"} />
        </div>
    )
}

const PdfViewer = () => {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [pageWidth, setPageWidth] = useState<number | undefined>(undefined)
    const containerRef = useRef<HTMLDivElement>(null)

    const onDocumentLoadSuccess = ({
        numPages,
    }: {
        numPages: number | null
    }) => {
        setNumPages(numPages)
        setIsLoading(false)
    }

    const updateWidth = useCallback(() => {
        const container = containerRef.current
        if (!container) return
        
        const width = container.clientWidth
        if (width > 0) {
            // Subtract small padding to prevent overflow
            setPageWidth(width - 16)
        }
    }, [])

    useEffect(() => {
        // Initial width calculation with a small delay for mobile
        const timer = setTimeout(updateWidth, 100)

        const resizeObserver = new ResizeObserver(updateWidth)
        
        if (containerRef.current) resizeObserver.observe(containerRef.current)

        return () => {
            clearTimeout(timer)
            resizeObserver.disconnect()
        }
    }, [updateWidth])

    // Recalculate width when loading completes
    useEffect(() => {
        if (!isLoading) updateWidth()
    }, [isLoading, updateWidth])

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center w-full h-full overflow-auto"
        >
            {isLoading && <Loading />}
            <Document
                file="/cv/updated CV 01-15-2026.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {numPages && Array.from(new Array(numPages), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        className="mb-4 shadow-lg"
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={pageWidth}
                    />
                ))}
            </Document>
        </div>
    )
}

export default PdfViewer
