const getHomeData = async () => {
    try {
        const about = await fetch(
            "http://portfolio2026backend.vercel.app/api/about/69b7b3deae50c7eb975112fd",
        )
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
            "http://portfolio2026backend.vercel.app/api/about/more-about/69b7b3deae50c7eb975112fd",
        )
        if (!about.ok) throw new Error("About data is unavailable")
        const data = await about.json()
        return data
    } catch {
        return { errorMessage: "Server error" }
    }
}

export { getHomeData, getAboutData }
