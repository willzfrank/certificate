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

  const filePath = path.resolve('.', 'public/images/darkwoman.png')
  const fileStat = fs.statSync(filePath)

  res.writeHead(200, {
    'Content-Type': 'img/png',
    'Content-Length': fileStat.size
  })

  const readStream = fs.createReadStream(filePath)
  
  readStream.pipe(res)
}
