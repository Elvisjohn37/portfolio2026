const url =
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_API

const getHomeData = async () => {
    try {
        const about = await fetch(`${url}/api/about/69b7b3deae50c7eb975112fd`)
        if (!about.ok) throw new Error("About data is unavailable")
        const data = await about.json()
        return data
    } catch {
        return { errorMessage: "Server error" }
    }
}

const getAboutData = async () => {
    try {
        const about = await fetch(
            `${url}/api/about/more-about/69b7b3deae50c7eb975112fd`,
        )
        if (!about.ok) throw new Error("About data is unavailable")
        const data = await about.json()
        return data
    } catch {
        return { errorMessage: "Server error" }
    }
}

const getAboutTechStacks = async ([, techStack]: [string, string]) => {
    try {
        const res = await fetch(
            `${url}/api/about/about-tech-stacks/${techStack}`,
        )
        if (!res.ok) throw new Error("About data is unavailable")
        const { data } = await res.json()
        return data
    } catch {
        return []
    }
}

export { getHomeData, getAboutData, getAboutTechStacks }
