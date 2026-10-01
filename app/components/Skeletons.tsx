/**
 * Placeholders rendered while the Projects and Work experience requests are in
 * flight.
 *
 * They mirror the real markup - same grid, same card padding, same timeline
 * columns - so nothing shifts when the data lands, and they reuse the shimmer
 * that the About text placeholders already use. Everything is `aria-hidden`
 * because the surrounding section announces its own loading state.
 */

/** Roughly one grid row / one screen of timeline, to keep the page stable. */
const PROJECT_PLACEHOLDERS = 3
const EXPERIENCE_PLACEHOLDERS = 3
const STACK_PLACEHOLDERS = 5

/** Matches `.projects__stack`: five 30px tiles above a hairline. */
const StackPlaceholders = () => (
    <div className="projects__skeleton-stack" aria-hidden="true">
        {Array.from({ length: STACK_PLACEHOLDERS }).map((_, index) => (
            <span key={`stack-${index}`} className="skeleton" />
        ))}
    </div>
)

const ProjectPlaceholder = () => (
    <li>
        <div className="projects__card projects__skeleton">
            <div className="projects__media skeleton" />
            <div className="projects__body">
                <div className="projects__title-row">
                    <span className="projects__skeleton-logo skeleton" />
                    <span className="projects__skeleton-name skeleton" />
                </div>
                <span className="projects__skeleton-line skeleton" />
                <span className="projects__skeleton-line skeleton" />
                <StackPlaceholders />
            </div>
        </div>
    </li>
)

const ProjectsSkeleton = ({ count = PROJECT_PLACEHOLDERS }: { count?: number }) => (
    <>
        <span className="sr-only" role="status">
            Loading projects…
        </span>
        <ul
            className="projects__grid projects__grid--skeleton"
            aria-hidden="true"
        >
            {Array.from({ length: count }).map((_, index) => (
                <ProjectPlaceholder key={`project-${index}`} />
            ))}
        </ul>
    </>
)

const ExperienceSkeleton = ({
    count = EXPERIENCE_PLACEHOLDERS,
}: {
    count?: number
}) => (
    <>
        <span className="sr-only" role="status">
            Loading work experience…
        </span>
        <ol className="experience-timeline" aria-hidden="true">
            {Array.from({ length: count }).map((_, index) => (
                <li
                    className="experience-entry experience-skeleton"
                    key={`experience-${index}`}
                >
                    <div className="experience-period">
                        <p>
                            <span className="experience-skeleton-line skeleton" />
                            <span className="experience-skeleton-line skeleton" />
                        </p>
                    </div>
                    <article className="experience-card experience-skeleton-card">
                        <span className="experience-skeleton-company skeleton" />
                        <span className="experience-skeleton-role skeleton" />
                        <span className="experience-skeleton-line skeleton" />
                        <span className="experience-skeleton-line skeleton" />
                    </article>
                </li>
            ))}
        </ol>
    </>
)

export { ExperienceSkeleton, ProjectsSkeleton }
