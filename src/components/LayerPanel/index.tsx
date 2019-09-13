import * as React from 'react'

import { Button, Dropdown, Icon, List, Menu } from 'antd'
import { isFunction } from 'util'

import { ILayer } from '../../app/types'
import { all } from '../../lib/array'
import { LayerPanelItem } from './LayerPanelItem'

export interface ILayerItem {
    layer: ILayer
    info?: string
    visible: boolean
    canHide: boolean
    extra?: React.ReactNode
}

export type LayerAction = (layer: ILayer, key: string) => void
export interface ILayerActionItem {
    key: string
    name: string
    icon?: string
    disabled?: boolean
    action: LayerAction
}

export interface ILayerPanelProps {
    style?: React.CSSProperties
    canAddLayers: boolean
    onChangeVisible: (layer: ILayer, visible: boolean) => void
    onAddLayer: () => Promise<void>
    getLayerActions: (layer: ILayer, index: number) => ILayerActionItem[]
    items: ILayerItem[]
}

export const LayerPanel: React.FC<ILayerPanelProps> = props => {
    const [isAddingLayer, setAddingLayer] = React.useState(false)

    return (
        <List
            style={props.style}
            size={'small'}
            header={(
                <header>
                    <style jsx>{`
                        header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }
                    `}</style>

                    <strong>Layers</strong>

                    {!props.canAddLayers ? null : (
                        <Button
                            size={'small'}
                            loading={isAddingLayer}
                            disabled={isAddingLayer}
                            onClick={async () => {
                                setAddingLayer(true)
                                await props.onAddLayer()
                                setAddingLayer(false)
                            }}
                        >Add layer</Button>
                    )}
                </header>
            )}
            bordered
            dataSource={props.items}
            renderItem={(item, index) => {
                const layerActions = props.getLayerActions(item.layer, index)
                const hideActions = all(layerActions.map(x => x.disabled))
                const actions = layerActions.reduce((acc, x) => {
                    acc.set(x.key, x.action)
                    return acc
                }, new Map<string, LayerAction>())

                return (
                    <LayerPanelItem
                        extra={item.extra}
                        layer={item.layer}
                        info={item.info}
                        canHide={item.canHide}
                        visible={item.visible}
                        hideActions={hideActions}
                        renderActions={layer => (
                            <Dropdown
                                overlay={(
                                    <Menu
                                        onClick={({ key }) => {
                                            const action = actions.get(key)

                                            if (isFunction(action)) {
                                                action(layer, key)
                                            }
                                        }}
                                    >
                                        {layerActions.map(x => (
                                            <Menu.Item
                                                key={x.key}
                                                disabled={x.disabled}
                                            >
                                                <Icon type={x.icon} />
                                                {x.name}
                                            </Menu.Item>
                                        ))}
                                    </Menu>
                                )}
                            >
                                <Button
                                    icon={'more'}
                                    type={'link'}
                                />
                            </Dropdown>
                        )}
                        onChangeVisible={props.onChangeVisible}
                        onAddLayer={props.onAddLayer}
                    />
                )
            }}
        />
    )
}
