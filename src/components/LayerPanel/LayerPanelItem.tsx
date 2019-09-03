import * as React from 'react'
import { List, Switch, Icon } from 'antd'
import { ILayer } from '../../app/types'
import { isWhite, isBlack } from '../../lib/color'

export interface ILayerPanelItemProps {
    style?: React.CSSProperties
    onChangeVisible: (layer: ILayer, visible: boolean) => void
    onAddLayer: () => Promise<void>
    renderActions: (layer: ILayer) => React.ReactNode
    layer: ILayer
    info?: string
    canHide: boolean
    visible: boolean
    extra?: React.ReactNode
    hideActions: boolean
}

export const LayerPanelItem: React.FC<ILayerPanelItemProps> = React.memo(({ layer, info, canHide, visible, ...props }) => {
    const white = isWhite(layer.color)
    const black = isBlack(layer.color)
    const specialColor = white || black
    const icon = 'environment'

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

                    .layer-name {
                        display: flex;
                        align-items: center;
                    }
                `}</style>

                <section>
                    <span className={'layer-name'}>
                        <Icon
                            type={icon}
                            theme={specialColor ? null : 'twoTone'}
                            twoToneColor={specialColor ? null : layer.color}
                            style={{
                                marginRight: 5,
                            }}
                        />

                        <span style={{
                            marginRight: 5,
                        }}>{layer.name}</span>

                        {!info ? null : (
                            <span style={{
                                color: '#ccc',
                                marginRight: 5,
                            }}>{`(${info})`}</span>
                        )}
                    </span>

                    <div className={'action-block'}>
                        {props.hideActions ? null : (
                            <div className={'actions'}>
                                {props.renderActions(layer)}
                            </div>
                        )}

                        <div className={'actions'}>
                            <Switch
                                disabled={!canHide}
                                defaultChecked={visible}
                                unCheckedChildren={(
                                    <Icon type={'eye-invisible'} />
                                )}
                                checkedChildren={(
                                    <Icon type={'eye'} />
                                )}
                                onChange={(checked) => {
                                    props.onChangeVisible(layer, checked)
                                }}
                            />
                        </div>
                    </div>
                </section>

                {props.extra}
            </div>
        </List.Item>
    )
})
