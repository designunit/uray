import { NextApiRequest, NextApiResponse } from 'next'
import { GithubClient } from '../../../src/server/github'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const path = 'vk_photo.geojson'

    const github = GithubClient.create()

    try {
        const content = await github.getFileBlob(path)

        res.json(JSON.parse(content))
    } catch (error) {
        res.status(500).json({ error })
    }
}
