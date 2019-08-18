import * as React from 'react'
import { Button } from 'antd'
import isPromise from 'is-promise'

export interface ILayerActionButtonProps {
    inProgress?: boolean
    disabled?: boolean
    icon: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any
    dispatch?: {
        action: any
        dispatcher: any
    }
}

export const LayerActionButton: React.FC<ILayerActionButtonProps> = props => {
    const [progress, setProgress] = React.useState(false)
    const inProgress = props.inProgress || progress
    const disabled = props.disabled || inProgress
    const onClickCallback = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) {
            const result = props.onClick(event)
            if (isPromise(result)) {
                setProgress(true)
                result.then(() => {
                    setProgress(false)
                })
            }
        } else {
            props.dispatch.dispatcher(
                props.dispatch.action
            )
        }
    }, [props.onClick, props.dispatch])

    return (
        <Button
            disabled={disabled}
            loading={inProgress}
            icon={props.icon}
            type={'link'}
            onClick={onClickCallback}
        />
    )
}
