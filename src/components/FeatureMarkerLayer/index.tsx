import * as React from 'react'
import { Marker } from 'react-map-gl'
import { Cluster } from '../Cluster'
import { Pin } from '../MarkerIcon/Pin'
import { FeatureCollection, Point, Feature } from 'geojson'

export interface IFeatureLayerProps<T> {
    map: mapboxgl.Map
    features: FeatureCollection<Point, T>
    onClickFeature: (feature: Feature<Point, T>) => void
    // pinSize: (feature: Feature<Point, T>) => number
    pinColor: (feature: Feature<Point, T>) => string
}

export function FeatureMarkerLayer<T>(props: IFeatureLayerProps<T>) {
    return (
        <>
            {props.features.features.map((feature, i) => {
                const [longitude, latitude] = feature.geometry.coordinates
                const key = `feature-${i}`

                const size = 20
                const fill = props.pinColor(feature)

                return (
                    <Marker
                        key={key}
                        longitude={longitude}
                        latitude={latitude}
                    >
                        <Pin
                            size={size}
                            fill={fill}
                            onClick={() => {
                                props.onClickFeature(feature)
                            }}
                        />
                    </Marker>
                )
            })}
        </>
    )
}
