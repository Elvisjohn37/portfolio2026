import { useInView } from "react-intersection-observer"
import DescriptionIcon from "@mui/icons-material/Description"
import CallIcon from "@mui/icons-material/Call"
import SchoolIcon from "@mui/icons-material/School"
import { useMemo } from "react"
import classnames from "classnames"
import useSWR from "swr"
import Link from "next/link"
import TechStacks from "./TechStacks"
import { getAboutData } from "../api/about"
import WorkExperience from "./WorkExperience"

type TmoreAbout = {
    firstName: string
    middleName: string
    lastName: string
    position: string
    about2: string
    degree: string
    school: string
    schoolYear: string
    // add other fields from `res.data` if needed
}

const About = () => {
    const { ref, inView } = useInView({
        threshold: 0.2, // Trigger when 20% visible
        triggerOnce: true,
    })

    const { data, isLoading } = useSWR(["about-data", "about"], getAboutData, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    })

    const {
        firstName,
        middleName,
        lastName,
        position,
        about2,
        degree,
        school,
        schoolYear,
    } = useMemo(
        () =>
            data?.data || {
                firstName: "",
                middleName: "",
                lastName: "",
                position: "",
                about2: "",
                degree: "",
                school: "",
                schoolYear: "",
            },
        [data],
    )

    const fullName =
        [firstName, middleName, lastName].filter(Boolean).join(" ") ||
        "Elvis John"

    const revealClass = classnames("reveal", { "is-visible": inView })

    const loadingLine = <span className="loading-line" />

    return (
        <section className="about" ref={ref} aria-labelledby="about-title">
            <div className="app-shell">
                <header className="section-head section-head--start">
                    <p className="section-eyebrow">About me</p>
                    <h2 id="about-title" className="section-title">
                        The story behind the{" "}
                        <span className="text-gradient">code</span>
                    </h2>
                    <p className="section-subtitle">
                        What I build, the stack I reach for and where I have
                        worked so far.
                    </p>
                </header>

                <div className="about__grid">
                    <div className={revealClass}>
                        <p className="about__name">
                            {isLoading ? (
                                <span className="loading-line loading-line--sm" />
                            ) : (
                                fullName
                            )}
                        </p>

                        <p className="about__position">
                            {isLoading ? loadingLine : position}
                        </p>

                        {isLoading ? (
                            <div className="lead">
                                {loadingLine}
                                {loadingLine}
                                {loadingLine}
                                {loadingLine}
                            </div>
                        ) : (
                            <p className="lead">{about2}</p>
                        )}

                        <div className="about__actions">
                            <Link href="/cv" className="pill pill--primary">
                                <DescriptionIcon aria-hidden="true" />
                                View my CV
                            </Link>
                            <Link
                                href="#contact"
                                scroll={false}
                                className="pill pill--ghost"
                            >
                                <CallIcon aria-hidden="true" />
                                Contact me
                            </Link>
                        </div>

                        <div className="about__education">
                            <p className="about__education-title">
                                <SchoolIcon aria-hidden="true" />
                                Education
                            </p>
                            <dl className="about__education-list">
                                <div>
                                    <dt>Degree</dt>
                                    <dd>{isLoading ? loadingLine : degree}</dd>
                                </div>
                                <div>
                                    <dt>School</dt>
                                    <dd>{isLoading ? loadingLine : school}</dd>
                                </div>
                                <div>
                                    <dt>School year</dt>
                                    <dd>
                                        {isLoading ? loadingLine : schoolYear}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div
                        className={classnames(
                            "about__stacks surface stack-panel",
                            revealClass,
                        )}
                    >
                        <TechStacks />
                    </div>
                </div>

                <WorkExperience />
            </div>
        </section>
    )
}

export default About