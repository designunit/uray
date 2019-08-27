import * as React from 'react'
import { Marker } from 'react-map-gl'
import { IGeolocation } from '../../app/types'
// import { constrain } from '../../lib/math'

export interface IGeolocationMarker {
    maxAccuracyRadius: number
    color: string
    size: number
    geolocation: IGeolocation
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const GeolocationMarker: React.FC<IGeolocationMarker> = React.memo(props => {
    const longitude = props.geolocation.longitude || 0
    const latitude = props.geolocation.latitude || 0
    // const accuracy = props.geolocation.accuracy || 0
    // const radius = constrain(accuracy, 1, props.maxAccuracyRadius)

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
        >
            <div
                onClick={props.onClick}
            >
                <style jsx>{`
                    div {
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: ${props.size}px;
                        height: ${props.size}px;
                        border-radius: 50%;
                        background-color: ${props.color};
                        border: 3px solid #1890ff;
                        box-shadow: 0 0 10px #000000ba;

                        cursor: pointer;
                    }
                `}</style>
            </div>
        </Marker>
    )
})