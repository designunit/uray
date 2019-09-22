import * as React from 'react'

import ReactMapGL, { PointerEvent, ViewState } from 'react-map-gl'

export interface IMapboxGLProps {
    mapboxToken: string
    center: [number, number]
    zoom: number
    mapStyle: string
    onLoad: (map: mapboxgl.Map) => void
    onClick: (event: PointerEvent) => void
    onMouseMove?: (event: PointerEvent) => void
    viewport: ViewState
    onChangeViewport: (value: ViewState) => void
    scrollZoom?: boolean
}

export const MapboxGL: React.FC<IMapboxGLProps> = props => {
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
                {...props.viewport}
                width={'100%'}
                height={'100%'}
                ref={mapRef}
                scrollZoom={props.scrollZoom}
                onLoad={() => {
                    props.onLoad((mapRef.current as any).getMap())
                }}
                mapStyle={props.mapStyle}
                mapboxApiAccessToken={props.mapboxToken}
                onViewportChange={props.onChangeViewport}
                onClick={props.onClick}
                onMouseMove={props.onMouseMove}
                attributionControl={false}
            >
                {props.children}
            </ReactMapGL>
        </div>
    )
}
