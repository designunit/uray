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
            onClick={props.onClick}
        />
        <span style={{
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 24,
            height: 24,
            position: 'absolute',
            top: -24,
            left: -12,
            fontSize: 12,
        }}>
            {props.text}
        </span>
    </>
)
