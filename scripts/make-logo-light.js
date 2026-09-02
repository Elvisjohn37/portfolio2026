// One-off script: generates public/logo-light.png from public/logo.png
// by recoloring near-white pixels to dark slate (#0f172a) while keeping
// the cyan globe and alpha transparency untouched.
const path = require("path")
const sharp = require(path.join(__dirname, "node_modules", "sharp"))

const src = path.join(__dirname, "public", "logo.png")
const out = path.join(__dirname, "public", "logo-light.png")

;(async () => {
    const { data, info } = await sharp(src)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

    const [rT, gT, bT] = [0x0f, 0x17, 0x2a] // dark slate target
    for (let i = 0; i < data.length; i += info.channels) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const a = data[i + 3]
        if (a === 0) continue
        // near-white pixels (the text) -> dark slate
        if (r > 200 && g > 200 && b > 200) {
            data[i] = rT
            data[i + 1] = gT
            data[i + 2] = bT
        }
    }

    await sharp(data, { raw: info })
        .png({ compressionLevel: 9 })
        .toFile(out)
    console.log("Created", out)
})().catch((err) => {
    console.error(err)
    process.exit(1)
})
