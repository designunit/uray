import * as React from 'react'
import { Spin, Icon } from 'antd'


export interface IAppHeaderProps {
    title: string
    isSyncing: boolean
    actions: React.ReactNode
}

export const AppHeader: React.FC<IAppHeaderProps> = props => (
    <section>
        <style jsx>{`
            section {
                //position: absolute;
                //background-color: rgba(255, 255, 255, 0.9);
                //width: 100%;
                //top: 0;
                //left: 0;

                display: flex;
                align-items: center;
                justify-content: space-between;

                //padding: 5px 10px;
            }

            .actions {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .header {
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            h1 {
                margin: 0;
                padding: 0 10px;
                font-size: 1.75em;
            }
        `}</style>

        <div className={'header'}>
            <h1>{props.title}</h1>

            {!props.isSyncing ? null : (
                <Spin
                    indicator={(
                        <Icon
                            type={'loading'}
                            style={{
                                fontSize: 24
                            }}
                            spin
                        />
                    )}
                />
            )}
        </div>

        <div className={'actions'}>
            {props.actions}
        </div>
    </section>
)
