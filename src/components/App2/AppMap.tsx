import * as React from 'react'
import { Popup, ViewState } from 'react-map-gl'
import { MapboxGL } from '../MapboxGL'
import { FeatureAttributesEditor } from '../FeatureAttributesEditor'
import { FeatureMarkerLayer } from '../FeatureMarkerLayer'
import { FeatureCollection, Point, Feature } from 'geojson'
import { ICase, IFeatureProperties } from '../../app/types'

export interface IAppProps {
    mapboxToken: string
    center: [number, number]
    zoom: number
    mapStyle: string

    data: FeatureCollection<Point, IFeatureProperties>
    // featureMap: Map<number, Feature<Point, IFeatureProperties>>
    featureMap: { [name: string]: Feature<Point, IFeatureProperties>}
    activeFeature: Feature<Point, IFeatureProperties>
    onClickFeature: (feature: Feature<Point, IFeatureProperties>) => void
    onChangeFeatureCases: (feature: Feature<Point, IFeatureProperties>, newCases: ICase[]) => void
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
            onClick={event => {
                console.log('click', event.lngLat)
            }}
        >
            <FeatureMarkerLayer<IFeatureProperties>
                features={props.data}
                map={null}
                pinColor={f => {
                    const feature = props.featureMap[f.properties.id]

                    return feature.properties.cases.length
                        ? 'tomato'
                        : 'gray'
                }}
                onClickFeature={props.onClickFeature}
            />

            {props.activeFeature && (
                <Popup
                    tipSize={5}
                    anchor={'top'}
                    longitude={props.activeFeature.geometry.coordinates[0]}
                    latitude={props.activeFeature.geometry.coordinates[1]}
                    closeOnClick={false}
                    onClose={() => props.onClickFeature(null)}
                >
                    <FeatureAttributesEditor
                        feature={props.activeFeature}
                        onChangeFeatureCases={props.onChangeFeatureCases}
                    />
                </Popup>
            )}
        </MapboxGL>
    )
}
