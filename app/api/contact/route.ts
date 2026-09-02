import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"
import ContactThankYouEmail from "../../components/forms/email-message"

const resend = new Resend(process.env.RESEND_API_KEY)

const formSchema = z.object({
    email: z.email(),
    message: z.string(),
    subject: z.string(),
})

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

        const getEmailName = () => {
            const name = data.email.split("@") || ["unkownsender"]
            return name[0]
        }

        const { error } = await resend.emails.send({
            from: `${getEmailName()}@resend.dev`,
            to: ["elvisreyescayetano37@gmail.com"],
            subject: data.subject,
            react: ContactThankYouEmail({
                message: data.message,
                email: data.email,
            }),
        })

        if (error) {
            console.error("Resend error:", error)
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to send email. Please try again.",
                },
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
