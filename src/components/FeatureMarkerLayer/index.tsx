import * as React from 'react'
import { Marker } from 'react-map-gl'
import { Cluster } from '../Cluster'
import { Pin } from '../MarkerIcon/Pin'
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
                        <>
                            <Pin
                                size={size}
                                fill={fill}
                                onClick={onClick}
                            />
                            <span style={{
                                pointerEvents: 'none',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 24,
                                height: 24,
                                position: 'absolute',
                                top: -24,
                                left: -12,
                                fontSize: 12,
                            }}>
                                {props.pinText(feature)}
                            </span>
                        </>
                    </Marker>
                )
            })}
        </>
    )
}
