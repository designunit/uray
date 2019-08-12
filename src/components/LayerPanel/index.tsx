import * as React from 'react'
import { List, Button, Switch, Icon, Input } from 'antd'
import { Colorbox } from '../Colorbox'
import { ILayer } from '../../app/types'

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

        info ?: string
        visible: boolean
        readonly: boolean
        render?: () => React.ReactNode
    }[]
}

export const LayerPanel: React.FC<ILayerPanelProps> = props => {
    const [isAddingLayer, setAddingLayer] = React.useState(false)
    const [isDeletingLayer, setDeletingLayer] = React.useState(false)

    return (
        <List
            style={props.style}
            size={'small'}
            header={<strong>Layers</strong>}
            footer={(
                <Button
                    icon={'plus'}
                    loading={isAddingLayer}
                    disabled={true || isAddingLayer}
                    onClick={async () => {
                        setAddingLayer(true)
                        await props.onAddLayer()
                        setAddingLayer(false)
                    }}
                />
            )}
            bordered
            dataSource={props.items}
            renderItem={(item, index) => {
                return (
                    <List.Item>
                        <div className={'list'}>
                            <style jsx>{`
                                .list {
                                    width: 100%;
                                }

                                section {
                                    display: flex;
                                    justify-content: space-between;
                                }

                                .actions {
                                    display: flex;
                                    align-items: center;
                                }
                            `}</style>

                            <section>
                                <span>
                                    <span style={{
                                        marginRight: 5,
                                    }}>{item.name}</span>

                                    {!item.info ? null : (
                                        <span style={{
                                            color: '#ccc',
                                            marginRight: 5,
                                        }}>{`(${item.info})`}</span>
                                    )}

                                    <Colorbox
                                        width={25}
                                        height={8}
                                        color={item.color}
                                    />
                                </span>

                                <div className={'actions'}>
                                    {item.readonly ? null : (
                                        <>
                                            <Button
                                                style={{
                                                    marginRight: 5,
                                                }}
                                                loading={isDeletingLayer}
                                                disabled={isDeletingLayer}
                                                icon={'delete'}
                                                size={'small'}
                                                onClick={async () => {
                                                    setDeletingLayer(true)
                                                    await props.onDeleteLayer(item.id)
                                                    setDeletingLayer(false)
                                                }}
                                            />
                                            <Button
                                                style={{
                                                    marginRight: 5,
                                                }}
                                                loading={isDeletingLayer}
                                                disabled={isDeletingLayer}
                                                icon={'edit'}
                                                size={'small'}
                                                onClick={() => {
                                                    props.onClickLayerEdit(item)
                                                }}
                                            />
                                        </>
                                    )}

                                    <Button
                                        disabled={true}
                                        style={{
                                            marginRight: 5,
                                        }}
                                        icon={'download'}
                                        size={'small'}
                                        type={'default'}
                                    />

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
                                </div>
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
