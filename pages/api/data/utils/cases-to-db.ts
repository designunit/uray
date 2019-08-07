import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await axios.get(
        'https://raw.githubusercontent.com/designunit/oymyakon-data/master/oymyakon_cases.geojson'
    )

    const cases = response.data.features.map(feature => ({
        id: feature.properties.id,
        feature,
    }))

    try {
        res.json({
            cases,
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}
