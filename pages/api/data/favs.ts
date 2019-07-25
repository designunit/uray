import { NextApiRequest, NextApiResponse } from 'next'
import { GithubClient } from '../../../src/server/github'
import { decodeCsv, encodeCsv } from '../../../src/lib/csv'

const favFile = 'favs.csv'

type Fav = {
    id: number,
    fav: boolean,
}

export async function getFavs(github: GithubClient): Promise<{ [name: string]: boolean }> {
    const content = await github.getFileContent(
        favFile
    )

    const data: Fav[] = await decodeCsv<Fav>(content, row => ({
        id: Number(row.id),
        fav: row.fav === '1',
    }))

    return data.reduce((data, x) => {
        return {
            ...data,
            [x.id]: x.fav,
        }
    }, {})
}

export async function saveFavs(github: GithubClient, data: { [name: string]: boolean }): Promise<boolean> {
    const items = Object
        .keys(data)
        .map(key => ({
            id: Number(key),
            fav: data[key]
        }))
        .sort((a, b) => {
            return a.id - b.id
        })
    const content = await encodeCsv<Fav>(items, ['id', 'fav'], x => [
        `${x.id}`,
        x.fav ? '1' : '0',
    ])

    return github.updateFile(favFile, content, 'update favs.csv')
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const github = GithubClient.create()

    if (req.method === 'POST') {
        const status = await saveFavs(github, req.body)

        res.json({
            status,
        })
    } else {
        const data = await getFavs(github)

        res.json({
            data,
        })
    }
}
