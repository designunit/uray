import * as React from 'react'
import { List, Button } from 'antd'
import { ILayer, LayerId } from '../../app/types'
import { LayerPanelItem } from './LayerPanelItem'

export interface ILayerItem {
    layer: ILayer
    info?: string
    visible: boolean
    canHide: boolean
    render?: () => React.ReactNode
}

export interface ILayerPanelProps {
    style?: React.CSSProperties
    canAddLayers: boolean
    onChangeVisible: (layer: ILayer, visible: boolean) => void
    onAddLayer: () => Promise<void>
    renderLayerActions: (layer: ILayer, index: number) => React.ReactNode
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
                            icon={'plus'}
                            loading={isAddingLayer}
                            disabled={isAddingLayer}
                            onClick={async () => {
                                setAddingLayer(true)
                                await props.onAddLayer()
                                setAddingLayer(false)
                            }}
                        />
                    )}
                </header>
            )}
            bordered
            dataSource={props.items}
            renderItem={(item, index) => (
                <LayerPanelItem
                    item={item}
                    renderActions={x => props.renderLayerActions(x, index)}
                    onChangeVisible={props.onChangeVisible}
                    onAddLayer={props.onAddLayer}
                />
            )}
        />
    )
}
