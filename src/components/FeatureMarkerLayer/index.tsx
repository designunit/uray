import * as React from 'react'
import { DragEvent, Marker } from 'react-map-gl'

import { Feature, FeatureCollection, Point } from 'geojson'
import { TextPin } from '../MarkerIcon/TextPin'
import { ClusterLayer } from './ClusterLayer'

export interface IFeatureLayerProps<T> {
    map: mapboxgl.Map
    features: FeatureCollection<Point, T>
    onClickFeature?: (feature: Feature<Point, T>) => void
    // pinSize: (feature: Feature<Point, T>) => number
    pinColor: (feature: Feature<Point, T>) => [string, string, string]
    pinText: (feature: Feature<Point, T>) => string
    onDragStart?: (event: DragEvent, feature: Feature<Point, T>) => void
    onDragEnd?: (event: DragEvent, feature: Feature<Point, T>) => void
    onDrag?: (event: DragEvent, feature: Feature<Point, T>) => void
    draggable: boolean
    cluster?: {
        minZoom: number
        maxZoom: number
        radius: number
        labelColor: string,
    }
}

export function FeatureMarkerLayer<T>(props: IFeatureLayerProps<T>) {
    const renderFeature = feature => {
        const [longitude, latitude] = feature.geometry.coordinates

        const cursor = props.draggable
            ? 'move'
            : 'pointer'
        const size = 25
        const [fill, backgroundColor, outline] = props.pinColor(feature)

        return (
            <Marker
                key={feature.id}
                longitude={longitude}
                latitude={latitude}
                draggable={props.draggable}
                onDragStart={event => {
                    if (props.onDragStart) {
                        props.onDragStart(event, feature)
                    }
                }}
                onDrag={event => {
                    if (props.onDrag) {
                        props.onDrag(event, feature)
                    }
                }}
                onDragEnd={event => {
                    if (props.onDragEnd) {
                        props.onDragEnd(event, feature)
                    }
                }}
            >
                <TextPin
                    cursor={cursor}
                    size={size}
                    fill={fill}
                    outlineColor={outline}
                    onClick={() => {
                        if (props.onClickFeature) {
                            props.onClickFeature(feature)
                        }
                    }}
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
