import { FeatureCollection, Point, Feature } from 'geojson'
import { IFeatureProperties } from './types'
import axios from 'axios'
import equal from 'fast-deep-equal'

type FC = FeatureCollection<Point, IFeatureProperties>
type FeatureMap = { [name: string]: Feature<Point, IFeatureProperties> }

export const api = axios.create({
    baseURL: `http://oymyakon.unit4.io:5580`,
})

export async function sync(geojson: FC, featureMap: FeatureMap): Promise<void> {
    const changed = geojson.features
        .filter(
            feature => !equal(feature, featureMap[feature.properties.id])
        )
        .map(
            feature => featureMap[feature.properties.id]
        )

    if (changed.length === 0) {
        return
    }

    console.log('Sync')
    console.log(changed)

    await Promise.all(changed.map(feature => {
        const id = feature.properties.id
        return api.put(`/cases/${id}`, { feature })
    }))
}
