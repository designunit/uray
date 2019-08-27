import * as React from 'react'
import { Popup, PointerEvent, ViewState } from 'react-map-gl'
import { MapboxGL } from '../MapboxGL'

export interface IAppProps {
    mapboxToken: string
    center: [number, number]
    zoom: number
    mapStyle: string

    popup?: {
        latitude: number,
        longitude: number,
    }
    onClosePopup: () => void
    renderPopup: () => React.ReactNode
    onClickMap: (event: PointerEvent) => void
    onMouseMove?: (event: PointerEvent) => void
    onLoad: (map: mapboxgl.Map) => void
    viewport: ViewState
    onChangeViewport: (value: ViewState) => void
}

export const AppMap: React.FC<IAppProps> = props => {
    return (
        <MapboxGL
            center={props.center}
            zoom={props.zoom}
            mapStyle={props.mapStyle}
            mapboxToken={props.mapboxToken}
            onLoad={props.onLoad}
            onClick={props.onClickMap}
            onMouseMove={props.onMouseMove}
            viewport={props.viewport}
            onChangeViewport={props.onChangeViewport}
        >
            {props.children}
            {props.popup && (
                <Popup
                    tipSize={5}
                    anchor={'top'}
                    longitude={props.popup.longitude}
                    latitude={props.popup.latitude}
                    closeOnClick={false}
                    onClose={props.onClosePopup}
                >
                    <div>
                        <style jsx>{`
                            div {
                                min-width: 400px;
                            }
                        `}</style>
                        
                        {props.renderPopup()}
                    </div>
                </Popup>
            )}
        </MapboxGL>
    )
}
