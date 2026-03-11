/* eslint-disable react-hooks/set-state-in-effect */
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
    Typography,
} from "@mui/material"
import { useActionState, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { FormState, submitContactForm } from "./forms/email-form"
import { Viber, Whatsapp, Location } from "./Icons"

const Contact = () => {
    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    const [currentState, formAction, isPending] = useActionState<
        FormState,
        FormData
    >(submitContactForm, {})

    const [open, setOpen] = useState(currentState.success)

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === "clickaway") {
            return
        }

        setOpen(false)
    }

    useEffect(() => {
        if (isPending) return
        setOpen(currentState.success || Boolean(currentState.error))
    }, [isPending])

    return (
        <div
            id="contact"
            className="flex justify-center min-h-lvh scroll-m-16 sm:scroll-m-0"
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
                                    action={formAction}
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
                                        <Viber fill="#ffffff" />
                                        <Whatsapp fill="#ffffff" />
                                    </div>
                                </Paper>
                                <Paper className="flex flex-col gap-2 p-5">
                                    <Typography>Address</Typography>
                                    <div className="flex gap-2 items-center">
                                        <Typography>
                                            Barangay 175 Camarin Caloocan City
                                        </Typography>
                                        <Location fill="#ffffff" />
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
