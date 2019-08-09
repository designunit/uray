import * as React from 'react'
import { Popup, PointerEvent } from 'react-map-gl'
import { MapboxGL } from '../MapboxGL'
import { FeatureAttributesEditor } from '../FeatureAttributesEditor'
import { FeatureMarkerLayer } from '../FeatureMarkerLayer'
import { FeatureCollection, Point, Feature } from 'geojson'
import { ICase, IFeatureProperties } from '../../app/types'

function numToStr(value: number): string {
    return value ? `${value}` : ''
}

export interface IAppProps {
    mapboxToken: string
    center: [number, number]
    zoom: number
    mapStyle: string

    data: FeatureCollection<Point, IFeatureProperties>
    activeFeature: Feature<Point, IFeatureProperties>
    onClickMap: (event: PointerEvent) => void
    onSubmitActiveFeature: (feature: Feature<Point, IFeatureProperties>) => void
    onClickFeature: (feature: Feature<Point, IFeatureProperties>, index: number) => void
    onChangeFeatureCases: (feature: Feature<Point, IFeatureProperties>, newCases: ICase[]) => void
    onChangeFeatureName: (feature: Feature<Point, IFeatureProperties>, newName: string) => void
    onDeleteFeature: (feature: Feature<Point, IFeatureProperties>) => Promise<void>
    onMoveFeature: (feature: Feature<Point, IFeatureProperties>) => void
}

export const AppMap: React.FC<IAppProps> = props => {
    return (
        <MapboxGL
            center={props.center}
            zoom={props.zoom}
            mapStyle={props.mapStyle}
            mapboxToken={props.mapboxToken}
            onLoad={map => {
                console.log('MapboxGL Loaded', map)
            }}
            onClick={props.onClickMap}
        >
            <FeatureMarkerLayer<IFeatureProperties>
                features={props.data}
                map={null}
                pinColor={
                    feature => feature.properties.cases.length
                        ? 'tomato'
                        : 'gray'
                }
                pinText={feature => numToStr(feature.properties.cases.length)}
                onClickFeature={props.onClickFeature}
            />

            {props.activeFeature && (
                <Popup
                    tipSize={5}
                    anchor={'top'}
                    longitude={props.activeFeature.geometry.coordinates[0]}
                    latitude={props.activeFeature.geometry.coordinates[1]}
                    closeOnClick={false}
                    onClose={() => props.onSubmitActiveFeature(props.activeFeature)}
                >
                    <FeatureAttributesEditor
                        feature={props.activeFeature}
                        onChangeFeatureCases={props.onChangeFeatureCases}
                        onChangeFeatureName={props.onChangeFeatureName}
                        onDeleteFeature={props.onDeleteFeature}
                        onMoveFeature={props.onMoveFeature}
                    />
                </Popup>
            )}
        </MapboxGL>
    )
}
