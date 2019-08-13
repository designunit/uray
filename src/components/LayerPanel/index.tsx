import * as React from 'react'
import { List, Button } from 'antd'
import { ILayer } from '../../app/types'
import { LayerPanelItem } from './LayerPanelItem'

export interface ILayerItem {
    layer: ILayer
    info?: string
    visible: boolean
    render?: () => React.ReactNode
}

export interface ILayerPanelProps {
    style?: React.CSSProperties
    onChangeVisible: (visible: boolean, index: number) => void
    onClickLayerEdit: (layer: ILayer) => void
    onDeleteLayer: (id: number) => Promise<void>
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
            renderItem={(item, index) => (
                <LayerPanelItem
                    item={item}
                    index={index}
                    onChangeVisible={props.onChangeVisible}
                    onClickLayerEdit={props.onClickLayerEdit}
                    onDeleteLayer={props.onDeleteLayer}
                    onAddLayer={props.onAddLayer}
                />
            )}
        />
    )
}
