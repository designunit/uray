import * as React from 'react'
import ReactMapGL, { ViewState, PointerEvent, LinearInterpolator } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

export interface IMapViewport extends ViewState {
    transitionDuration?: number
}

export interface IMapboxGLProps {
    mapboxToken: string
    center: [number, number]
    zoom: number
    mapStyle: string
    onLoad: (map: mapboxgl.Map) => void
    onClick: (event: PointerEvent) => void
    onMouseMove?: (event: PointerEvent) => void
}

export const MapboxGL: React.FC<IMapboxGLProps> = props => {
    const [latitude, longitude] = props.center
    const [viewport, setViewport] = React.useState<IMapViewport>({
        latitude,
        longitude,
        zoom: props.zoom,
    })
    const mapRef = React.useRef()
    const interpolator = React.useRef(new LinearInterpolator())

    return (
        <div>
            <style jsx>{`
                div {
                    width: 100%;
                    height: 100%;

                    position: relative;
                }
            `}</style>

            <ReactMapGL
                {...viewport}
                width={'100%'}
                height={'100%'}
                ref={mapRef}
                onLoad={() => {
                    props.onLoad((mapRef.current as any).getMap())
                }}
                transitionInterpolator={interpolator.current}
                mapStyle={props.mapStyle}
                mapboxApiAccessToken={props.mapboxToken}
                onViewportChange={x => setViewport(x)}
                onClick={props.onClick}
                onMouseMove={props.onMouseMove}
                attributionControl={false}
            >
                {props.children}
            </ReactMapGL>
        </div>
    )
}
