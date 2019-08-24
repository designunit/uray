import * as React from 'react'
import { List, Button, Switch, Icon, Popconfirm, Checkbox, Dropdown, Menu } from 'antd'
import { Colorbox } from '../Colorbox'
import { ILayer } from '../../app/types'
import { isWhite, isBlack } from '../../lib/color'
import { ILayerItem } from '.'

export interface ILayerPanelItemProps {
    style?: React.CSSProperties
    onChangeVisible: (layer: ILayer, visible: boolean) => void
    onChangeCluster: (layer: ILayer, cluster: boolean) => void
    onAddLayer: () => Promise<void>
    renderActions: (layer: ILayer) => React.ReactNode
    item: ILayerItem
}

export const LayerPanelItem: React.FC<ILayerPanelItemProps> = props => {
    const item = props.item
    const white = isWhite(item.layer.color)
    const black = isBlack(item.layer.color)
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
                        {/* <Colorbox
                            width={10}
                            height={10}
                            color={item.layer.color}
                            style={{
                                marginRight: 5,
                                boxShadow: isWhite(item.layer.color)
                                    ? '0 0 0 1px rgba(0, 0, 0, 0.15)'
                                    : null,
                            }}
                        /> */}

                        <Icon
                            type={icon}
                            theme={specialColor ? null : 'twoTone'}
                            twoToneColor={specialColor ? null : item.layer.color}
                            style={{
                                marginRight: 5,
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
                        <div className={'actions'}>
                            {props.renderActions(item.layer)}
                        </div>

                        <div
                            className={'actions'}
                            style={{
                                marginRight: 5,
                            }}
                        >
                            <Checkbox
                                checked={item.cluster}
                                onChange={event => {
                                    props.onChangeCluster(item.layer, event.target.checked)
                                }}
                            />
                        </div>

                        <div className={'actions'}>
                            {/* <Dropdown
                                overlay={(
                                    <Menu>
                                        <Menu.Item key="1">
                                            <Icon type="user" />
                                            1st menu item
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Icon type="user" />
                                            2nd menu item
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <Icon type="user" />
                                            3rd item
                                        </Menu.Item>
                                    </Menu>
                                )}
                            >
                                <Button
                                    icon={'more'}
                                    type={'link'}
                                />
                            </Dropdown> */}

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
