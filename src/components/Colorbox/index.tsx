import * as React from 'react'

export interface ILayerPanelProps {
    style?: React.CSSProperties
    color: string
    width: string | number
    height: string | number
}

export const Colorbox: React.FC<ILayerPanelProps> = props => {
    return (
        <span style={{
            ...props.style,
            display: 'inline-block',
            width: props.width,
            height: props.height,
            backgroundColor: props.color,
        }}/>
    )
}
