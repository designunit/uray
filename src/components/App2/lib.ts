import { Feature, Geometry } from 'geojson'

export function createFeatureMap<K, T, G extends Geometry = Geometry>(features: Feature<G, T>[], key: (properties: T) => K) {
    console.log('createFeatureMap')
    const map = features.reduce(
        (acc, feature) => {
            acc.set(key(feature.properties), feature)
            return acc
        },
        new Map<K, Feature<G, T>>()
    )

    return Object.fromEntries(map)
}
