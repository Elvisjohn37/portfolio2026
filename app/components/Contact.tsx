"use client"

import {
    Alert,
    Button,
    Snackbar,
    SnackbarCloseReason,
    TextField,
    Tooltip,
} from "@mui/material"
import { useContext, useState } from "react"
import { useInView } from "react-intersection-observer"
import { REVEAL_IN_VIEW_OPTIONS } from "../utils/js/inView"
import classnames from "classnames"
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
    const { ref, inView } = useInView(REVEAL_IN_VIEW_OPTIONS)

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

    const revealClass = classnames("reveal", { "is-visible": inView })

    return (
        <section className="contact" ref={ref} aria-labelledby="contact-title">
            <div className="app-shell">
                <header className="section-head section-head--start">
                    <p className="section-eyebrow">Contact</p>
                    <h2 id="contact-title" className="section-title">
                        Let&apos;s build{" "}
                        <span className="text-gradient">together</span>
                    </h2>
                    <p className="section-subtitle">
                        Have a project, a role or a question? Send a message and
                        I will get back to you as soon as I can.
                    </p>
                </header>

                <div className="contact__grid">
                    <div
                        className={classnames(
                            "contact__form-wrap surface",
                            revealClass,
                        )}
                    >
                        <form
                            action={handleFormAction}
                            noValidate
                            className="contact__form"
                        >
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                disabled={isPending}
                                label="Your Email"
                                variant="outlined"
                                fullWidth
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                onChange={() => clearError("email")}
                            />
                            <TextField
                                id="subject"
                                name="subject"
                                disabled={isPending}
                                label="Subject"
                                variant="outlined"
                                fullWidth
                                error={Boolean(errors.subject)}
                                helperText={errors.subject}
                                onChange={() => clearError("subject")}
                            />
                            <TextField
                                id="message"
                                name="message"
                                disabled={isPending}
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                error={Boolean(errors.message)}
                                helperText={errors.message}
                                onChange={() => clearError("message")}
                            />
                            <Button
                                type="submit"
                                loading={isPending}
                                disabled={isPending}
                                variant="contained"
                                className="contact__submit"
                            >
                                Send message
                            </Button>
                        </form>
                    </div>
                    <aside
                        className={classnames("contact__aside", revealClass)}
                    >
                        <div className="contact__info surface">
                            <span
                                className="contact__info-icon"
                                aria-hidden="true"
                            >
                                <Location />
                            </span>
                            <div>
                                <p className="contact__info-label">Based in</p>
                                <p className="contact__info-value">
                                    Barangay 175 Camarin, Caloocan City,
                                    Philippines
                                </p>
                            </div>
                        </div>

                        <div className="contact__info surface">
                            <span
                                className="contact__info-icon"
                                aria-hidden="true"
                            >
                                <Whatsapp />
                            </span>
                            <div>
                                <p className="contact__info-label">
                                    Call or message
                                </p>
                                <p className="contact__info-value">
                                    09306915794
                                </p>
                                <div className="contact__info-icons">
                                    <Tooltip title="Viber" placement="top" arrow>
                                        <span className="contact__chip">
                                            <Viber
                                                fill={
                                                    theme === "dark"
                                                        ? "#ffffff"
                                                        : "#30374c"
                                                }
                                            />
                                        </span>
                                    </Tooltip>
                                    <Tooltip
                                        title="WhatsApp"
                                        placement="top"
                                        arrow
                                    >
                                        <span className="contact__chip">
                                            <Whatsapp
                                                fill={
                                                    theme === "dark"
                                                        ? "#ffffff"
                                                        : "#30374c"
                                                }
                                            />
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        <div className="contact__info surface">
                            <span
                                className="contact__info-icon"
                                aria-hidden="true"
                            >
                                <Viber />
                            </span>
                            <div>
                                <p className="contact__info-label">
                                    Response time
                                </p>
                                <p className="contact__info-value">
                                    Usually within 24 hours on weekdays
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={currentState.success ? "success" : "error"}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {currentState.message || currentState.error}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default Contact
