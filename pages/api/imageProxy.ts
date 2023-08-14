import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const handler = async (req: NextApiRequest,
    res: NextApiResponse) => {

    const FALLBACK_IMAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/readnews-d8d86.appspot.com/o/mqdefault_6s.png?alt=media&token=6e5541ef-6fe6-4ea3-ad42-9727ccb016af';

    const queryURL = req.query.url as string;

    // console.log(queryURL)

    let url = '';

    if (queryURL.toLowerCase() === 'testimageurl' || queryURL.toLowerCase() === 'testvideourl'  || !queryURL) {
        url = decodeURIComponent(FALLBACK_IMAGE_URL);
    } else {
        url = decodeURIComponent(queryURL);
    };

    // console.log(url)

    const result = await fetch(url);
    const body = result.body;
    body?.pipe(res);
}

export default handler;