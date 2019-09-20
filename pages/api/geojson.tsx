import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { FeatureId, ILayer } from '../../src/app/types'
import { createGeojson } from '../../src/lib/geojson'

const api = axios.create({
    baseURL: process.env.API_BASE_URL,
})

async function getFeatures(ids: FeatureId[]): Promise<any[]> {
    return Promise.all(ids.map(async id => {
        const res = await api.get<any>(`/features/${id}`)

        return res.data.feature
    }))
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const layerId = req.query.layer
    const layerResponse = await api.get<ILayer>(`/layers/${layerId}`)
    const featureIds = layerResponse.data.featureIds
    const features = await getFeatures(featureIds)
    const geojson = createGeojson(features)

    try {
        res.json(geojson)
    } catch (error) {
        res.status(500).json({
            error,
        })
    }
}
