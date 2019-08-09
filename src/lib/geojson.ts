import { FeatureCollection, Feature, Geometry, Point } from 'geojson'

export function mapFeatureProperties<T, K>(geojson: FeatureCollection<Geometry, T>, mapFn: (feature: Feature<Geometry, T>, index: number) => K): FeatureCollection<Geometry, K> {
    return {
        ...geojson,
        features: geojson.features.map((feature, index) => ({
            ...feature,
            properties: mapFn(feature, index),
        }))
    }
}

export function replaceFeatureWithProperties<T, G extends Geometry = Geometry>(geojson: FeatureCollection<G, T>, featureIndex: number, mapProperties: (feature: Feature<G, T>, index: number) => T): FeatureCollection<G, T> {
    return {
        ...geojson,
        features: geojson.features.map((feature, index) => featureIndex !== index ? feature : ({
            ...feature,
            properties: mapProperties(feature, index),
        }))
    }
}

export function addPointFeature<T>(geojson: FeatureCollection<Point, T>, latLng: [number, number], properties: T): FeatureCollection<Point, T> {
    return {
        ...geojson,
        features: [
            ...geojson.features,
            {
                type: 'Feature',
                geometry: {
                    coordinates: latLng,
                    type: 'Point'
                },
                properties,
            }
        ]
    }
}

export function filterFeatures<T, G extends Geometry>(geojson: FeatureCollection<G, T>, predicatFn: (feature: Feature<G, T>) => boolean): FeatureCollection<G, T> {
    return {
        ...geojson,
        features: geojson.features.filter(predicatFn),
    }
}
