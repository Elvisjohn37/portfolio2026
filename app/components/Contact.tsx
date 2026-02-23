import { Slide, Typography } from "@mui/material"
import { useInView } from "react-intersection-observer"

const Contact = () => {
    const { ref, inView } = useInView({
        threshold: 0.3, // Trigger when 30% visible
        triggerOnce: false, // Animate in and out repeatedly
    })

    return (
        <div
            id="contact"
            className="flex justify-center min-h-lvh items-center scroll-m-16 sm:scroll-m-0"
            ref={ref}
        >
            <div className="flex sm:justify-center flex-col w-full">
                <div className="flex sm:justify-center flex-col w-full">
                    <div className="overflow-y-hidden">
                        <Slide in={inView} direction="up" timeout={1000}>
                            <p className="text-center text-[16px] sm:text-3xl text-primary">
                                Contact
                            </p>
                        </Slide>
                    </div>
                    <div className="flex">
                        <div className="flex justify-center items-center flex-1">
                            col1
                        </div>
                        <div className="flex justify-center items-center flex-1">
                            col2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
