import * as React from 'react'
import { Pin, IPinProps } from '../MarkerIcon/Pin'
import { IMarkerIconProps } from '.'

export interface ITextPinProps {
    text: string
}

export const TextPin: React.FC<IMarkerIconProps & IPinProps & ITextPinProps> = props => (
    <>
        <Pin
            size={props.size}
            fill={props.fill}
            outlineColor={props.outlineColor}
            onClick={props.onClick}
        />
        <span style={{
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 26,
            height: 26,
            position: 'absolute',
            top: -28,
            left: -13,
            fontSize: 12,
        }}>
            {props.text}
        </span>
    </>
)
