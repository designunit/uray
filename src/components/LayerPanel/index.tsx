import * as React from 'react'
import { List, Button } from 'antd'
import { ILayer } from '../../app/types'
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
    onChangeVisible: (layer: ILayer, visible: boolean) => void
    onClickLayerEdit: (layer: ILayer) => void
    onDeleteLayer: (id: number) => Promise<void>
    onClickDownload: (id: number) => Promise<void>
    onAddLayer: () => Promise<void>
    items: ILayerItem[]
}

export const LayerPanel: React.FC<ILayerPanelProps> = props => {
    const [isAddingLayer, setAddingLayer] = React.useState(false)

    return (
        <List
            style={props.style}
            size={'small'}
            header={<strong>Layers</strong>}
            footer={(
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
            bordered
            dataSource={props.items}
            renderItem={item => (
                <LayerPanelItem
                    item={item}
                    onChangeVisible={props.onChangeVisible}
                    onClickLayerEdit={props.onClickLayerEdit}
                    onDeleteLayer={props.onDeleteLayer}
                    onClickDownload={props.onClickDownload}
                    onAddLayer={props.onAddLayer}
                />
            )}
        />
    )
}
