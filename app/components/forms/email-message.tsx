const ContactThankYouEmail = ({
    message,
    email,
}: {
    message: string
    email: string
}) => {
    return (
        <div className="w-full p-10 flex flex-col gap-5">
            <div>From: {email}</div>
            <div>{message}</div>
        </div>
    )
}

export default ContactThankYouEmail
