import * as React from 'react'
import { repeat } from 'lodash'
import numeral from 'numeral'
import { GeoCoord } from '../../app/types'
import { Tag } from 'antd'

export interface IGeoCoordWidgetProps {
    style?: React.CSSProperties
    coord: GeoCoord
    precision: number
}

export const GeoCoordWidget: React.FC<IGeoCoordWidgetProps> = props => {
    const [lat, lng] = props.coord
    const format = `0.${repeat('0', props.precision)}`

    return (
        <div style={props.style}>
            <style jsx>{`
                div {
                    font-family: monospace;
                }
            `}</style>

            <Tag>lat: {numeral(lat).format(format)}</Tag>
            <Tag>lng: {numeral(lng).format(format)}</Tag>
        </div>
    )
}
