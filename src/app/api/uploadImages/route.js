import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"

export async function POST(req) {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const filename = `${Date.now()}-${file.name}`

    const uploadDir = path.join(process.cwd(), "public", "images")

    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, filename), buffer)

    const imagePath = `/images/${filename}`

    return NextResponse.json({ path: imagePath })
}
