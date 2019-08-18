import * as React from 'react'
import { Button } from 'antd'

export interface ILayerActionButtonProps {
    disabled?: boolean
    icon: string
    action: any
    dispatch: any
}

export const LayerActionButton: React.FC<ILayerActionButtonProps> = props => {
    const onClickCallback = React.useCallback(() => {
        props.dispatch(props.action)
    }, [props.action, props.dispatch])

    return (
        <Button
            disabled={props.disabled}
            icon={props.icon}
            type={'link'}
            onClick={onClickCallback}
        />
    )
}
