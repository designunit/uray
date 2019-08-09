import { FeatureCollection, Point, Feature } from 'geojson'
import { IFeatureProperties } from './types'
import axios from 'axios'
import equal from 'fast-deep-equal'
import { createPointFeature } from '../lib/geojson'

type FC = FeatureCollection<Point, IFeatureProperties>
type FeatureResponse = {
    id: number, 
    feature: Feature<Point, IFeatureProperties>
}

export const api = axios.create({
    baseURL: process.env.API_BASE_URL,
})

export async function createFeature<T>(latLng: [number, number], properties: T): Promise<Feature<Point, IFeatureProperties>> {
    const feature = createPointFeature(latLng, properties)
    const res = await api.post<FeatureResponse>('/cases', { feature })

    const newFeature = res.data.feature
    newFeature.properties.id = res.data.id

    return updateFeature(newFeature)
}

export async function updateFeature(feature: Feature<Point, IFeatureProperties>): Promise<Feature<Point, IFeatureProperties>> {
    const id = feature.properties.id

    const res = await api.put<FeatureResponse>(`/cases/${id}`, { feature })

    return res.data.feature
}

export async function sync(geojson: FC): Promise<void> {
    // const changed = geojson.features
    //     .filter(
    //         feature => !equal(feature, featureMap[feature.properties.id])
    //     )
    //     .map(
    //         feature => featureMap[feature.properties.id]
    //     )
    const changed = geojson.features

    if (changed.length === 0) {
        return
    }

    console.log(`Sync ${changed.length} items`)

    await Promise.all(changed.map(feature => {
        const id = feature.properties.id
        return api.put(`/cases/${id}`, { feature })
    }))
}

export async function getCases(): Promise<FeatureResponse[]>{
    const res = await api.get<FeatureResponse[]>('/cases')

    return res.data
}
