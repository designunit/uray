import * as React from 'react'
import { List, Button, Switch, Icon } from 'antd'
import { Colorbox } from '../Colorbox';

export interface ILayerPanelProps {
    style?: React.CSSProperties
    onChangeVisible: (visible: boolean, index: number) => void
    items: {
        name: string
        info: string
        visible: boolean
        color: string
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
                                <span>
                                    {item.name}
                                    <span style={{
                                        color: '#ccc',
                                        marginRight: 5,
                                    }}>{` (${item.info})`}</span>

                                    <Colorbox
                                        width={25}
                                        height={8}
                                        color={item.color}
                                    />
                                </span>
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
