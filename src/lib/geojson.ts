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

export function filterFeatures<T>(geojson: FeatureCollection<Geometry, T>, predicatFn: (feature: Feature<Geometry, T>) => boolean): FeatureCollection<Geometry, T> {
    return {
        ...geojson,
        features: geojson.features.filter(predicatFn),
    }
}
