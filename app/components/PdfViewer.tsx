"use client"

import { Document, Page, pdfjs } from "react-pdf"
import { useState } from "react"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { DotLoader } from "react-spinners"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString()

const Loading = () => (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DotLoader color="#30374c" />
    </div>
)

const PdfViewer = () => {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const onDocumentLoadSuccess = ({
        numPages,
    }: {
        numPages: number | null
    }) => {
        setNumPages(numPages)
        setIsLoading(false)
    }

    return (
        <div className="flex justify-center scale-50 lg:scale-100 w-[50vw] h-[50vh] sm:h-screen">
            {isLoading && <Loading />}
            <Document
                file="/cv/updated CV 01-15-2026.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    )
}

export default PdfViewer
