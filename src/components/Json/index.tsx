import * as React from 'react'

export interface IJsonProps {
    style?: React.CSSProperties
    data: any
}

export const Json: React.FC<IJsonProps> = props => (
    <pre style={props.style}>
        {JSON.stringify(props.data, null, 4)}
    </pre>
)
