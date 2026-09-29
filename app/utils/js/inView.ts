/**
 * Shared options for the scroll-reveal animations (`useInView`).
 *
 * Why not a plain `threshold`?
 * A ratio threshold like `0.2` means "20% of the element must be on screen",
 * which silently breaks on elements that are taller than the viewport: on a
 * phone the About section stacks the bio, the tech panel and the whole work
 * timeline, so 20% of it can never be visible at the same time, `inView`
 * never turns `true`, and every `.reveal` child stays stuck at `opacity: 0`
 * (the section looks empty on mobile).
 *
 * `threshold: 0` reports the element as soon as any part of it crosses into
 * the viewport, so the reveal works no matter how tall the element or how
 * short the screen is. The small negative `rootMargin` keeps the trigger just
 * inside the bottom edge (so the fade-in is visible instead of happening off
 * screen) and keeps the fade-out until the element is fully scrolled away.
 * `triggerOnce: false` keeps the shipped fade-in / fade-out behaviour.
 */
export const REVEAL_IN_VIEW_OPTIONS = {
    threshold: 0,
    rootMargin: "0px 0px -8% 0px",
    triggerOnce: false,
}
