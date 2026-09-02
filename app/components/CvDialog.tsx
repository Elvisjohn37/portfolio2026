"use client"

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import CloseIcon from "@mui/icons-material/Close"
import DownloadIcon from "@mui/icons-material/Download"

const PdfViewer = dynamic(() => import("./PdfViewer"), {
    ssr: false,
})

type TCvDialogParams = {
    open?: boolean
    onClose?: () => void
    /** true when the dialog is rendered from a route (/cv or the @modal interception) */
    hasParams?: boolean
}

const CvDialog = ({ open = true, onClose, hasParams = false }: TCvDialogParams) => {
    const router = useRouter()
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))

    const filePath = "/cv/updated CV 01-15-2026.pdf"
    const handleDownload = () => {
        // Create an invisible link and click it programmatically
        const link = document.createElement("a")
        link.href = filePath
        link.download = "CAYETANO_ELVIS_JOHN_REYES.pdf" // File name when downloaded
        link.click()
    }

    const handleClose = () => {
        if (hasParams) router.back()
        else onClose?.()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullScreen={isSmallScreen}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: { xs: '100%', md: '900px' },
                    maxHeight: { xs: '100%', md: '90vh' },
                    m: isSmallScreen ? 0 : 2,
                },
            }}
        >
            <DialogTitle>
                <p className="text-primary">Updated CV</p>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "#7b8383",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    p: { xs: 0.5, sm: 1, md: 2 },
                }}
            >
                <PdfViewer />
            </DialogContent>
            <DialogActions>
                <div className="hidden sm:flex gap-2">
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                    >
                        Download CV
                    </Button>
                    <Button
                        size="small"
                        startIcon={<CloseIcon />}
                        onClick={handleClose}
                        variant="outlined"
                    >
                        Close
                    </Button>
                </div>
                <div className="flex sm:hidden gap-2">
                    <IconButton color="primary" onClick={handleDownload}>
                        <DownloadIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default CvDialog
