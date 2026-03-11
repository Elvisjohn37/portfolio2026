const hello = async () => {
    const test = await fetch("https://portfolio2026nodejs.vercel.app")
    const data = await test.json()
    return data
}

export { hello }
