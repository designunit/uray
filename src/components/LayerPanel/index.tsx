import * as React from 'react'
import { List, Button, Switch, Icon, Input } from 'antd'
import { ILayer } from '../../app/types'
import { LayerPanelItem } from './LayerPanelItem'

export interface ILayerPanelProps {
    style?: React.CSSProperties
    onChangeVisible: (visible: boolean, index: number) => void
    onClickLayerEdit: (layer: ILayer) => void
    onDeleteLayer: (id: number) => Promise<void>
    onAddLayer: () => Promise<void>
    items: {
        id: number
        name: string
        color: string

        info?: string
        visible: boolean
        readonly: boolean
        render?: () => React.ReactNode
    }[]
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
