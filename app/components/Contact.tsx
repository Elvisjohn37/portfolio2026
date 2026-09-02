"use client"

import {
    Alert,
    Button,
    Divider,
    Paper,
    Slide,
    Snackbar,
    SnackbarCloseReason,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material"
import { useContext, useState } from "react"
import { useInView } from "react-intersection-observer"
import * as yup from "yup"
import { Viber, Whatsapp, Location } from "./Icons"
import ThemeContext from "../utils/js/ThemeContext"

const contactSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address"),
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required"),
})

type ContactFormField = keyof yup.InferType<typeof contactSchema>
type ContactFormErrors = Partial<Record<ContactFormField, string>>

type ContactFormResult = {
    success?: boolean
    error?: string
    message?: string
}

const Contact = () => {
    const { state } = useContext(ThemeContext)
    const { theme } = state
    const { ref, inView } = useInView({
        threshold: 0.1, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const [currentState, setCurrentState] = useState<ContactFormResult>({})
    const [isPending, setIsPending] = useState(false)
    const [open, setOpen] = useState(false)

    const [errors, setErrors] = useState<ContactFormErrors>({})

    const clearError = (field: ContactFormField) =>
        setErrors((prev) => ({ ...prev, [field]: undefined }))

    // Client-side action wrapper: React intercepts the submit event for
    // forms using the "action" prop (no native submission / page reload),
    // and this wrapper only posts to the API route once all fields pass
    // yup validation. Using fetch keeps the submission completely outside
    // of the App Router server-action pipeline, so nothing refreshes or
    // remounts after the form is sent.
    const handleFormAction = (formData: FormData) => {
        contactSchema
            .validate(Object.fromEntries(formData.entries()), {
                abortEarly: false,
            })
            .then(async () => {
                setErrors({})
                setIsPending(true)
                try {
                    const response = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(
                            Object.fromEntries(formData.entries()),
                        ),
                    })
                    const state: ContactFormResult = await response.json()
                    setCurrentState(state)
                    setOpen(true)
                } catch {
                    setCurrentState({
                        success: false,
                        error: "Something went wrong. Please try again.",
                    })
                    setOpen(true)
                } finally {
                    setIsPending(false)
                }
            })
            .catch((validationError: yup.ValidationError) => {
                const fieldErrors: ContactFormErrors = {}
                validationError.inner.forEach((issue) => {
                    const field = issue.path as ContactFormField | undefined
                    // keep only the first message per field
                    if (field && !fieldErrors[field]) {
                        fieldErrors[field] = issue.message
                    }
                })
                setErrors(fieldErrors)
            })
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === "clickaway") {
            return
        }

        setOpen(false)
    }

    return (
        <div
            className="flex justify-center min-h-lvh scroll-m-16 sm:scroll-m-0 pt-10"
            ref={ref}
        >
            <div className="flex sm:justify-center flex-col w-full">
                <div className="flex sm:justify-center flex-col w-full gap-20">
                    <div className="overflow-y-hidden">
                        <Slide in={inView} direction="up" timeout={1000}>
                            <p className="text-center text-[16px] sm:text-3xl text-primary">
                                Contact
                            </p>
                        </Slide>
                    </div>
                    <div className="flex gap-5 flex-col sm:flex-row">
                        <Slide in={inView} direction="right" timeout={1000}>
                            <div className="flex justify-center items-center flex-1">
                                <Snackbar
                                    open={open}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                >
                                    <Alert
                                        onClose={handleClose}
                                        severity={
                                            currentState.success
                                                ? "success"
                                                : "error"
                                        }
                                        variant="filled"
                                        sx={{ width: "100%" }}
                                    >
                                        {currentState.message ||
                                            currentState.error}
                                    </Alert>
                                </Snackbar>
                                <form
                                    action={handleFormAction}
                                    noValidate
                                    className="flex gap-5 flex-col w-full"
                                >
                                    <div className="flex flex-col gap-2">
                                        <TextField
                                            id="email"
                                            name="email"
                                            disabled={isPending}
                                            label="Your Email:"
                                            variant="outlined"
                                            fullWidth
                                            error={Boolean(errors.email)}
                                            helperText={errors.email}
                                            onChange={() => clearError("email")}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <TextField
                                            id="subject"
                                            name="subject"
                                            disabled={isPending}
                                            label="Subject:"
                                            variant="outlined"
                                            fullWidth
                                            error={Boolean(errors.subject)}
                                            helperText={errors.subject}
                                            onChange={() =>
                                                clearError("subject")
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <TextField
                                            id="message"
                                            name="message"
                                            disabled={isPending}
                                            label="Message:"
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                            fullWidth
                                            error={Boolean(errors.message)}
                                            helperText={errors.message}
                                            onChange={() =>
                                                clearError("message")
                                            }
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        loading={isPending}
                                        disabled={isPending}
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </Slide>
                        <Divider className="none sm:block" />
                        <Slide in={inView} direction="left" timeout={1000}>
                            <div className="flex justify-center flex-1 flex-col gap-5">
                                <Paper className="flex flex-col gap-2 p-5">
                                    <Typography>Contact Number</Typography>
                                    <div className="flex gap-2 items-center">
                                        <Typography>09306915794</Typography>
                                        <Tooltip
                                            placement="top"
                                            arrow
                                            title="Viber"
                                        >
                                            <Viber
                                                fill={
                                                    theme === "dark"
                                                        ? "#ffffff"
                                                        : "#30374c"
                                                }
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            placement="top"
                                            arrow
                                            title="Whatsapp"
                                        >
                                            <Whatsapp
                                                fill={
                                                    theme === "dark"
                                                        ? "#ffffff"
                                                        : "#30374c"
                                                }
                                            />
                                        </Tooltip>
                                    </div>
                                </Paper>
                                <Paper className="flex flex-col gap-2 p-5">
                                    <Typography>Address</Typography>
                                    <div className="flex gap-2 items-center">
                                        <Typography>
                                            Barangay 175 Camarin Caloocan City
                                        </Typography>
                                        <Location
                                            fill={
                                                theme === "dark"
                                                    ? "#ffffff"
                                                    : "#30374c"
                                            }
                                        />
                                    </div>
                                </Paper>
                            </div>
                        </Slide>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
