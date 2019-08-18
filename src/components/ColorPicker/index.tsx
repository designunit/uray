import * as React from 'react'
import { Button, Popover } from 'antd'
import { SketchPicker } from 'react-color'

import './style.css'

export interface IColorPickerProps {
    style?: React.CSSProperties
    color: string
    onChange: (color: string) => void
    pop?: boolean
}

export const ColorPicker: React.FC<IColorPickerProps> = ({ pop = true, ...props }) => {
    const [showPicker, setShowPicker] = React.useState<boolean>(false)

    const colorPicker = (
        <SketchPicker
            disableAlpha={true}
            color={props.color}
            onChangeComplete={color => {
                props.onChange(color.hex)
            }}
        />
    )

    return !pop ? colorPicker : (
        <div style={props.style}>
            <style jsx>{`
                .color {
                    width: 20px;
                    height: 20px;
                    border-radius: 2px;
                    background-color: ${props.color};
                }
            `}</style>

            <Popover
                overlayClassName={'app-color-picker'}
                content={(
                    colorPicker
                )}
                trigger={'click'}
                visible={showPicker}
                onVisibleChange={setShowPicker}
            >
                <Button
                    style={{
                        padding: '0 5px',
                    }}
                    onClick={() => {
                        setShowPicker(!showPicker)
                    }}
                >
                    <div className={'color'} />
                </Button>
            </Popover>
        </div>
    )
}
