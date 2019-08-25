import * as React from 'react'
import { Icon } from 'antd'

export interface IOnlineStatusProps {
    style?: React.CSSProperties
    status: 'online' | 'offline' | 'connecting' | 'failed'
}

export const OnlineStatus: React.FC<IOnlineStatusProps> = props => {
    const color = props.status === 'online' ? '#52c41a' : 'red'

    return (
        <div style={props.style}>
            <Icon
                type={'bulb'}
                theme={'twoTone'}
                twoToneColor={color}
            />
        </div>
    )
}
