import * as React from 'react'
import { IMarkerIconProps } from '.';

const style = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
};

export const Circle: React.FC<IMarkerIconProps & {
    radius: number,
    size: number,
}> = ({ size, radius, onClick }) => (
    <svg
        height={size}
        viewBox="0 0 24 24"
        style={{
            ...style,
            transform: `translate(${-size / 2}px,${-size}px)`
        }}
        onClick={onClick}
    >
        <circle cx={radius} cy={radius} r={radius} />
    </svg>
)
