import * as React from 'react'
import { Button, Icon, Dropdown, Menu } from 'antd'

export interface IActionButtonProps {
    style?: React.CSSProperties
    icon?: string
    type?: 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'danger'
    loading?: boolean
    disabled?: boolean

    optionsTitle: string
    options: {
        name: string
        key: string
    }[]
    onSelectOption: (option: string) => void
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}

export const ActionButton: React.FC<IActionButtonProps> = props => {
    return (
        <Button.Group
            style={props.style}
        >
            <Button
                icon={props.icon}
                onClick={props.onClick}
                disabled={props.disabled}
                loading={props.loading}
                type={props.type}
            />
            <Dropdown
                disabled={props.disabled}
                overlay={(
                    <Menu
                        onClick={param => {
                            props.onSelectOption(param.key)
                        }}
                    >
                        {props.options.map(x => (
                            <Menu.Item key={x.key}>
                                {x.name}
                            </Menu.Item>
                        ))}
                    </Menu>
                )}>
                <Button
                    disabled={props.disabled}
                >
                    {props.optionsTitle}
                    <Icon type={'down'} />
                </Button>
            </Dropdown>
        </Button.Group>
    )
}
