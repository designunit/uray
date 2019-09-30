import * as React from 'react'

import { Point } from 'geojson'
import MapGL, { Marker, ViewState } from 'react-map-gl'

import { Pin } from '../../../components/MarkerIcon/Pin'
import { ImageMarker } from './ImageMarker'
import { useFeatures } from './useFeatures'

interface IProperties {
    url: string
    value: number
}

interface IPhotoMapProps {
    mapboxToken: string
    mapStyle: string | object
    dataUrl: string
    size: number
    startZoom: number
    startCoord: {
        latitude: number,
        longitude: number,
    },
    extra: object
}

const PhotoMap: React.FC<IPhotoMapProps> = props => {
    const features = useFeatures<Point, IProperties>(props.dataUrl)
    const [viewport, setViewport] = React.useState<ViewState>({
        latitude: props.startCoord.latitude,
        longitude: props.startCoord.longitude,
        zoom: props.startZoom,
        bearing: 0,
        pitch: 0,
    })
    const onChangeViewport = React.useCallback((newViewport: ViewState) => {
        setViewport(newViewport)
    }, [])

    return (
        <MapGL
            {...viewport}
            {...props.extra}
            width={'100%'}
            height={'100%'}
            mapStyle={props.mapStyle}
            mapboxApiAccessToken={props.mapboxToken}
            onViewportChange={onChangeViewport}
        >
            {features.map(f => (
                <Marker
                    key={f.id}
                    longitude={f.geometry.coordinates[0]}
                    latitude={f.geometry.coordinates[1]}
                >
                    <ImageMarker
                        size={props.size}
                        src={f.properties.url}
                    />
                </Marker>
            ))}
        </MapGL>
    )
}

export default PhotoMap
