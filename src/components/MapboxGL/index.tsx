import * as React from 'react'
import ReactMapGL, { ViewState, PointerEvent } from 'react-map-gl'

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
}

export const MapboxGL: React.FC<IMapboxGLProps> = props => {
    const [latitude, longitude] = props.center
    const [viewport, setViewport] = React.useState<IMapViewport>({
        latitude,
        longitude,
        zoom: props.zoom,
    })
    const mapRef = React.useRef()

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
                mapStyle={props.mapStyle}
                mapboxApiAccessToken={props.mapboxToken}
                onViewportChange={x => setViewport(x)}
                onClick={props.onClick}
            >
                {props.children}
            </ReactMapGL>
        </div>
    )
}
