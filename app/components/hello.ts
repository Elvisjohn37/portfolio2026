const hello = async () => {
    const test = await fetch(
        "https://portfolio2026backend.vercel.app/api/about/69b7b3deae50c7eb975112fd",
    )
    const data = await test.json()
    return data
}

export { hello }
