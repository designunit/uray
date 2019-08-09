import { FeatureCollection, Point, Feature } from 'geojson'
import { IFeatureProperties } from './types'
import axios from 'axios'
import equal from 'fast-deep-equal'

type FC = FeatureCollection<Point, IFeatureProperties>
type CaseContainer = {
    id: number,
    feature: Feature<Point, IFeatureProperties>
}

export const api = axios.create({
    baseURL: `//oymyakon.unit4.io/api`,
})

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

export async function getCases(): Promise<CaseContainer[]>{
    const res = await api.get<CaseContainer[]>('/cases')

    return res.data
}
