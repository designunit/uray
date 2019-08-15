import * as React from 'react'
import { Marker } from 'react-map-gl'
import { ClusterLayer } from './ClusterLayer'
import { Pin } from '../MarkerIcon/Pin'
import { TextPin } from '../MarkerIcon/TextPin'
import { FeatureCollection, Point, Feature } from 'geojson'

export interface IFeatureLayerProps<T> {
    map: mapboxgl.Map
    features: FeatureCollection<Point, T>
    onClickFeature?: (feature: Feature<Point, T>) => void
    // pinSize: (feature: Feature<Point, T>) => number
    pinColor: (feature: Feature<Point, T>) => [string, string, string]
    pinText: (feature: Feature<Point, T>) => string
    cluster?: {
        minZoom: number
        maxZoom: number
        radius: number
    }
}

export function FeatureMarkerLayer<T>(props: IFeatureLayerProps<T>) {
    if (props.map && props.cluster) {
        return (
            <ClusterLayer
                features={props.features}
                map={props.map}
                minZoom={props.cluster.minZoom}
                maxZoom={props.cluster.maxZoom}
                radius={props.cluster.radius}
                renderFeature={feature => {
                    const [longitude, latitude] = feature.geometry.coordinates
                    // const key = `feature-${latitude}-${longitude}`
                    const key = `feature-${feature.id}`
                    // const fill = isFav(feature)
                    //     ? 'gold'
                    //     : 'tomato'
                    const fill = 'gold'

                    console.log('cluster feature', Object.keys(feature.properties))

                    return (
                        <Marker
                            key={key}
                            longitude={longitude}
                            latitude={latitude}
                        >
                            <Pin
                                size={20}
                                fill={fill}
                            // onClick={() => {
                            //     setPopup({
                            //         latitude,
                            //         longitude,
                            //         feature,
                            //     })
                            // }}
                            />
                        </Marker>
                    )
                }}
            />
        )
    }

    return (
        <>
            {props.features.features.map(feature => {
                const [longitude, latitude] = feature.geometry.coordinates

                const size = 25
                const [fill, backgroundColor, outline] = props.pinColor(feature)
                const onClick = !props.onClickFeature ? null : props.onClickFeature.bind(null, feature)

                return (
                    <Marker
                        key={feature.id}
                        longitude={longitude}
                        latitude={latitude}
                    >
                        <TextPin
                            size={size}
                            fill={fill}
                            outlineColor={outline}
                            onClick={onClick}
                            text={props.pinText(feature)}
                            backgroundColor={backgroundColor}
                        />
                    </Marker>
                )
            })}
        </>
    )
}
