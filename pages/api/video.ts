// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const filePath = path.resolve('.', 'public/video.mp4')
    const fileStat = fs.statSync(filePath)

    res.writeHead(206, {
        'Content-Length': fileStat.size,
        'Content-Type': 'video/mp4'
    })

    const readStream = fs.createReadStream(filePath)

    readStream.pipe(res)
}
