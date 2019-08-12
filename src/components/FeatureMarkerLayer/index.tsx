import * as React from 'react'
import { Marker } from 'react-map-gl'
import { Cluster } from '../Cluster'
import { Pin } from '../MarkerIcon/Pin'
import { TextPin } from '../MarkerIcon/TextPin'
import { FeatureCollection, Point, Feature } from 'geojson'

type FeaturePropertyWithId = {
    id: number
}

export interface IFeatureLayerProps<T extends FeaturePropertyWithId> {
    map: mapboxgl.Map
    features: FeatureCollection<Point, T>
    onClickFeature?: (feature: Feature<Point, T>, index: number) => void
    // pinSize: (feature: Feature<Point, T>) => number
    pinColor: (feature: Feature<Point, T>) => string
    pinText: (feature: Feature<Point, T>) => string
}

export function FeatureMarkerLayer<T extends FeaturePropertyWithId>(props: IFeatureLayerProps<T>) {
    return (
        <>
            {props.features.features.map((feature, i) => {
                const [longitude, latitude] = feature.geometry.coordinates

                const size = 20
                const fill = props.pinColor(feature)

                const onClick = !props.onClickFeature ? null : () => {
                    props.onClickFeature(feature, i)
                }

                return (
                    <Marker
                        key={`${feature.properties.id}`}
                        longitude={longitude}
                        latitude={latitude}
                    >
                        <TextPin
                            size={size}
                            fill={fill}
                            onClick={onClick}
                            text={props.pinText(feature)}
                        />
                    </Marker>
                )
            })}
        </>
    )
}
