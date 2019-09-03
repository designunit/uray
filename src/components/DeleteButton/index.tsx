import * as React from 'react'
import { Button, Popconfirm, Icon } from 'antd'

export interface IDeleteButtonProps {
    loading?: boolean
    disabled?: boolean
    onClick: () => void
}

export const DeleteButton: React.FC<IDeleteButtonProps> = props => (
    <Popconfirm
        title={'Are you sure?'}
        okType={'danger'}
        okText={'Delete'}
        cancelText={'No'}
        onConfirm={props.onClick}
        icon={(
            <Icon
                type='question-circle-o'
                style={{
                    color: 'red'
                }}
            />
        )}
    >
        <Button
            loading={props.loading}
            disabled={props.disabled}
            type={'danger'}
        >
            {props.children}
        </Button>
    </Popconfirm>
)
