import * as React from 'react'
import { List, Button, Switch, Icon, Popconfirm, Checkbox } from 'antd'
import { Colorbox } from '../Colorbox'
import { ILayer } from '../../app/types'
import { isWhite } from '../../lib/color'
import { ILayerItem } from '.'

export interface ILayerPanelItemProps {
    style?: React.CSSProperties
    onChangeVisible: (layer: ILayer, visible: boolean) => void
    onChangeCluster: (layer: ILayer, cluster: boolean) => void
    onClickLayerEdit: (layer: ILayer) => void
    onAddLayer: () => Promise<void>
    onClickDownload: (id: number) => Promise<void>
    item: ILayerItem
}

export const LayerPanelItem: React.FC<ILayerPanelItemProps> = props => {
    const [isDownloading, setDownloading] = React.useState(false)
    const item = props.item

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

                    .action-block {
                        display: flex;
                        align-items: center;
                    }

                    .actions {
                        display: flex;
                        align-items: center;

                        transition: opacity 0.15s ease-in-out;
                    }
                `}</style>

                <section>
                    <span>
                        <Colorbox
                            width={10}
                            height={10}
                            color={item.layer.color}
                            style={{
                                marginRight: 5,
                                boxShadow: isWhite(item.layer.color)
                                    ? '0 0 0 1px rgba(0, 0, 0, 0.15)'
                                    : null,
                            }}
                        />

                        <span style={{
                            marginRight: 5,
                        }}>{item.layer.name}</span>

                        {!item.info ? null : (
                            <span style={{
                                color: '#ccc',
                                marginRight: 5,
                            }}>{`(${item.info})`}</span>
                        )}
                    </span>

                    <div className={'action-block'}>
                        <div
                            className={'actions'}
                            style={{
                                marginRight: 5,
                            }}
                        >
                            {item.layer.readonly ? null : (
                                <>
                                    <Button
                                        icon={'edit'}
                                        size={'small'}
                                        type={'link'}
                                        onClick={() => {
                                            props.onClickLayerEdit(item.layer)
                                        }}
                                    />
                                </>
                            )}

                            <Checkbox
                                checked={item.cluster}
                                onChange={event => {
                                    props.onChangeCluster(item.layer, event.target.checked)
                                }}
                            />

                            <Button
                                loading={isDownloading}
                                disabled={isDownloading}
                                icon={'download'}
                                size={'small'}
                                type={'link'}
                                onClick={async () => {
                                    setDownloading(true)
                                    await props.onClickDownload(item.layer.id)
                                    setDownloading(false)
                                }}
                            />
                        </div>

                        <div className={'actions'}>
                            <Switch
                                disabled={!item.canHide}
                                defaultChecked={item.visible}
                                unCheckedChildren={(
                                    <Icon type={'eye-invisible'} />
                                )}
                                checkedChildren={(
                                    <Icon type={'eye'} />
                                )}
                                onChange={(checked) => {
                                    props.onChangeVisible(props.item.layer, checked)
                                }}
                            />
                        </div>
                    </div>
                </section>

                {!item.render ? null : (
                    item.render()
                )}
            </div>
        </List.Item>
    )
}
