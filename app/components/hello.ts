const hello = async () => {
    const test = await fetch("http://localhost:8080")
    const data = await test.json()
    return data
}

export { hello }
