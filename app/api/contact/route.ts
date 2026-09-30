import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"
import ContactThankYouEmail from "../../components/forms/email-message"

const resend = new Resend(process.env.RESEND_API_KEY)

/** Same env resolution the rest of the portfolio uses to reach the Express API. */
const apiBaseUrl =
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_API

const formSchema = z.object({
    email: z.email(),
    message: z.string(),
    subject: z.string(),
})

type ContactForm = z.infer<typeof formSchema>

/**
 * Persist the submission in the backend `messages` collection so it lands in
 * the admin dashboard's Messages inbox. Kept best-effort: a backend outage
 * must not break the contact form as long as the email still goes out.
 */
const saveToInbox = async (data: ContactForm, userAgent: string | null) => {
    if (!apiBaseUrl) {
        console.error("Contact API: NEXT_PUBLIC_API(_LOCALHOST) is not configured")
        return false
    }

    try {
        const response = await fetch(`${apiBaseUrl}/api/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Forward the visitor's browser instead of this server fetch's.
                "user-agent": userAgent || "portfolio-contact-form",
            },
            body: JSON.stringify({ ...data, source: "portfolio" }),
            cache: "no-store",
            // A slow backend must not hold the form hostage.
            signal: AbortSignal.timeout(8000),
        })

        if (!response.ok) {
            console.error(
                `Contact API: inbox save failed (${response.status})`,
                await response.text(),
            )
            return false
        }

        return true
    } catch (error) {
        console.error("Contact API: inbox save failed", error)
        return false
    }
}

/** Email notification copy for the admin (also best-effort). */
const notifyByEmail = async (data: ContactForm) => {
    try {
        const senderName = data.email.split("@")[0] || "unknownsender"

        const { error } = await resend.emails.send({
            from: `${senderName}@resend.dev`,
            to: ["elvisreyescayetano37@gmail.com"],
            subject: data.subject,
            react: ContactThankYouEmail({
                message: data.message,
                email: data.email,
            }),
        })

        if (error) {
            console.error("Contact API: Resend error:", error)
            return false
        }

        return true
    } catch (error) {
        console.error("Contact API: Resend error:", error)
        return false
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const { data, success } = formSchema.safeParse(body)

        if (!success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Please enter a valid email address",
                },
                { status: 400 },
            )
        }

        // Persist + notify in parallel. The visitor only sees a failure when
        // BOTH channels fail, so the message is captured whenever possible.
        const [saved, emailed] = await Promise.all([
            saveToInbox(data, request.headers.get("user-agent")),
            notifyByEmail(data),
        ])

        if (!saved && !emailed) {
            return NextResponse.json(
                { success: false, error: "Something went wrong. Please try again." },
                { status: 500 },
            )
        }

        return NextResponse.json({
            success: true,
            message: "Success! I'll get back to you as soon as possible.",
        })
    } catch (error) {
        console.error("Contact API error:", error)
        return NextResponse.json(
            { success: false, error: "Something went wrong. Please try again." },
            { status: 500 },
        )
    }
}
