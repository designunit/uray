import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import toGeojson from '@mapbox/togeojson'
import { DOMParser } from 'xmldom'
import { mapFeatureProperties, filterFeatures } from '../../../src/lib/geojson'
import { decodeCsv } from '../../../src/lib/csv'
import { ICase } from '../../../src/app/types'
import { IFeatureProperties } from '../../../src/app/types'
import { Point } from 'geojson'

type InProps = {
    id?: string,
    name: string,
    description: string,
    описание: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const csvRes = await axios.get(
        'https://raw.githubusercontent.com/designunit/oymyakon-data/master/oymyakon_cases.csv'
    )
    let cases: {location: string, case: ICase}[] = await decodeCsv(csvRes.data, (row, id) => ({
        location: row.location,
        case: {
            id,
            topic: row.topic,
            user: row.users,
            season: row.season,
        }
    }))
    cases = cases.filter(x => x.location)
    const caseMap = cases.reduce((acc, x) => {
        if (!acc.has(x.location)) {
            acc.set(x.location, [])
        }

        acc.get(x.location)!.push(x.case)

        return acc
    }, new Map<string, ICase[]>())


    const kmlRes = await axios.get(
        'https://raw.githubusercontent.com/designunit/oymyakon-data/master/oymyakon.kml'
    )
    const kml = new DOMParser().parseFromString(kmlRes.data)

    const points = filterFeatures<InProps, Point>(
        toGeojson.kml(kml),
        feature => feature.geometry.type === 'Point',
    )
    const result = mapFeatureProperties<InProps, IFeatureProperties>(points, (feature, index) => ({
        id: feature.properties.id ? Number(feature.properties.id) : index,
        name: feature.properties.name,
        description: [feature.properties.описание, feature.properties.description].join('\n\n'),
        cases: caseMap.get(feature.properties.name) || [],
    }))

    try {
        res.json(result)
    } catch (error) {
        res.status(500).json({ error })
    }
}
