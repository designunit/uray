import { FeatureCollection, Feature, Geometry } from 'geojson'

export function mapFeatureProperties<T, K>(geojson: FeatureCollection<Geometry, T>, mapFn: (feature: Feature<Geometry, T>, index: number) => K): FeatureCollection<Geometry, K> {
    return {
        ...geojson,
        features: geojson.features.map((feature, index) => ({
            ...feature,
            properties: mapFn(feature, index),
        }))
    }
}

export function filterFeatures<T, G extends Geometry>(geojson: FeatureCollection<G, T>, predicatFn: (feature: Feature<G, T>) => boolean): FeatureCollection<G, T> {
    return {
        ...geojson,
        features: geojson.features.filter(predicatFn),
    }
}
