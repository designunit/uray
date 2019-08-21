import * as React from 'react'
import { PropertyTable } from './PropertyTable'
import { Feature } from 'geojson'

export interface IFeaturePropertiesViewerProps {
    style?: React.CSSProperties
    feature: Feature
    renderActions: (feature: Feature) => React.ReactNode
}

export const FeaturePropertiesViewer: React.FC<IFeaturePropertiesViewerProps> = props => {
    const data = Object
        .entries(props.feature.properties)
        .map(([key, value]) => ({
            key,
            value: value,
        }))

    return (
        <>
            <PropertyTable
                style={props.style}
                data={data}
            />

            <footer style={{
                display: 'flex',
                marginTop: 10,
            }}>
                <div style={{
                    flex: 1,
                }} />

                {props.renderActions(props.feature)}
            </footer>
        </>
    )
}
