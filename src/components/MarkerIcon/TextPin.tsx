import * as React from 'react'
import { Pin, IPinProps } from '../MarkerIcon/Pin'
import { IMarkerIconProps } from '.'

export interface ITextPinProps {
    text: string
    backgroundColor?: string
}

export const TextPin: React.FC<IMarkerIconProps & IPinProps & ITextPinProps> = props => (
    <>
        <Pin
            size={props.size}
            fill={props.fill}
            outlineColor={props.outlineColor}
            onClick={props.onClick}
        />
        <div>
            <style jsx>{`
                div {
                    pointer-events: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 26px;
                    height: 26px;
                    position: absolute;
                    top: -28px;
                    left: -13px;
                    font-size: 12px;
                }

                i {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    position: absolute;
                }

                span {
                    z-index: 1;
                }
            `}</style>

            {!props.backgroundColor ? null : (
                <i style={{
                    backgroundColor: props.backgroundColor,
                }}/>
            )}
            <span>{props.text}</span>
        </div>
    </>
)
