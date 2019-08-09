import * as React from 'react'
import { List, Button, Switch, Icon } from 'antd'

export interface ILayerPanelProps {
    style?: React.CSSProperties
    onChangeVisible: (visible: boolean, index: number) => void
    items: {
        name: string
        visible: boolean
        render?: () => React.ReactNode
    }[]
}

export const LayerPanel: React.FC<ILayerPanelProps> = props => {
    return (
        <List
            style={props.style}
            size={'small'}
            header={<strong>Layers</strong>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={props.items}
            renderItem={(item, index) => {
                return (
                    <List.Item>
                        <div>
                            <style jsx>{`
                                div {
                                    width: 100%;
                                }

                                section {
                                    display: flex;
                                    justify-content: space-between;
                                }
                            `}</style>

                            <section>
                                {item.name}
                                <Switch
                                    defaultChecked={item.visible}
                                    unCheckedChildren={(
                                        <Icon type={'eye-invisible'} />
                                    )}
                                    checkedChildren={(
                                        <Icon type={'eye'} />
                                    )}
                                    onChange={(checked) => {
                                        props.onChangeVisible(checked, index)
                                    }}
                                />
                            </section>
                            {!item.render ? null : (
                                item.render()
                            )}
                        </div>
                    </List.Item>
                )
            }}
        />
    )
}
