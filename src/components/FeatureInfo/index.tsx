import * as React from 'react'
import {Switch, Icon} from 'antd'

export interface IFeatureInfoProps {
    imageUrl: string
    fav: boolean
    onChangeFav(checked: boolean, event: Event): void
}

export const FeatureInfo: React.FC<IFeatureInfoProps> = props => {
    return (
        <div>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    margin-top: 10px;
                }
            `}</style>
            <Switch
                checked={props.fav}
                onChange={props.onChangeFav}
                checkedChildren={(
                    <Icon type={'like'} />
                )}
                unCheckedChildren={(
                    <Icon type={'dislike'} />
                )}
                style={{
                    marginBottom: '10px',
                }}
            />
            <img
                width={240}
                src={props.imageUrl}
            />

            <section>{props.children}</section>
        </div>
    )
}
