import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const backgroundsDir = path.join(process.cwd(), 'public', 'backgrounds')

    // Check if directory exists
    if (!fs.existsSync(backgroundsDir)) {
      return NextResponse.json({ backgrounds: [] })
    }

    // Read directory and filter image files
    const files = fs.readdirSync(backgroundsDir)
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']

    const images = files
      .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
      .sort() // Sort by filename
      .map((file, index) => ({
        id: `image-${index + 1}`,
        name: `背景图片${index + 1}`,
        value: 'bg-cover bg-center',
        preview: `/backgrounds/${file}`,
      }))

    return NextResponse.json({ backgrounds: images })
  } catch (error) {
    return NextResponse.json({ backgrounds: [] })
  }
}
