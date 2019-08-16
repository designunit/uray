import * as React from 'react'
import { Marker } from 'react-map-gl'
import { ClusterLayer } from './ClusterLayer'
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
        labelColor: string
    }
}

export function FeatureMarkerLayer<T>(props: IFeatureLayerProps<T>) {
    const renderFeature = feature => {
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
    }

    if (props.map && props.cluster) {
        return (
            <ClusterLayer
                features={props.features}
                map={props.map}
                minZoom={props.cluster.minZoom}
                maxZoom={props.cluster.maxZoom}
                radius={props.cluster.radius}
                clusterLabelColor={props.cluster.labelColor}
                renderFeature={renderFeature}
            />
        )
    }

    return (
        <>
            {props.features.features.map(renderFeature)}
        </>
    )
}
