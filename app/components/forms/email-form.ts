"use server"

import { Resend } from "resend"
import * as z from "zod"
import ContactThankYouEmail from "./email-message"

const resend = new Resend(process.env.RESEND_API_KEY)

export type FormState = {
    success?: boolean
    error?: string
    message?: string
}
export async function submitContactForm(
    _prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    try {
        const formSchema = z.object({
            email: z.email(),
            message: z.string(),
            subject: z.string(),
        })

        const { data, success } = formSchema.safeParse(
            Object.fromEntries(formData.entries()),
        )

        const getEmailName = () => {
            const name = data?.email.split("@") || ["unkownsender"]
            return name[0]
        }

        if (!success)
            return {
                success: false,
                error: "Please enter a valid email address",
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
            return {
                success: false,
                error: "Failed to send email. Please try again.",
            }
        }

        return {
            success: true,
            message: "Success! I'll get back to you as soon as possible.",
        }
    } catch (error) {
        console.error("Server action error:", error)
        return {
            success: false,
            error: "Something went wrong. Please try again.",
        }
    }
}
