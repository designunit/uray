import { Feature, FeatureCollection, Geometry, Point } from 'geojson'
import { FeatureId, IFeatureIndex } from '../../app/types'
import { createGeojson } from '../../lib/geojson'

export function createFeatureMap<K, T, G extends Geometry = Geometry>(
    features: Array<Feature<G, T>>,
    key: (properties: T) => K,
) {
    return features.reduce(
        (acc, feature) => {
            acc.set(key(feature.properties), feature)

            return acc
        },
        new Map<K, Feature<G, T>>(),
    )
}

function stringValue(value: any): string {
    if (typeof value === 'boolean') {
        return `${value}`
    }

    if (value === null || value === undefined) {
        return null
    }

    return value
}

export function createFeatureFilter<T>(
    checkedValues: {
        [name: string]: string[],
    },
): (feature: Feature<Point, T>) => boolean {
    const filterKeys: string[] = Object.keys(checkedValues)
    const notSpecified = true

    if (filterKeys.length === 0) {
        return () => notSpecified
    }

    return feature => filterKeys.every(key => {
        const value = stringValue(feature.properties[key])

        if (!value) {
            return notSpecified
        }
        const checkedValue = checkedValues[key]

        return checkedValue.includes(value)
    })
}

export function selectFeatures<T, G extends Geometry = Geometry>(
    featureIndex: IFeatureIndex<T, G>,
    featureIds: FeatureId[] = [],
    filter: (feature: Feature<G, T>) => boolean,
): FeatureCollection<G, T> {
    const features = featureIds.reduce((fs, id) => {
        const feature = featureIndex[id]
        if (feature && filter(feature)) {
            fs.push(feature)
        }

        return fs
    }, [])

    return createGeojson(features)
}
