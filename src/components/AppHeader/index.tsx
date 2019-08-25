import * as React from 'react'
import { Spin, Icon } from 'antd'
import Head from 'next/head'
import { ExtraBlock } from '../Layout/ExtraBlock'

export interface IAppHeaderProps {
    style?: React.CSSProperties
    title: string
    isSyncing: boolean
    actions: React.ReactNode
}

export const AppHeader: React.FC<IAppHeaderProps> = props => (
    <>
        <Head>
            <title>{props.title}</title>
        </Head>

        <ExtraBlock
            extra={props.actions}
            style={props.style}
        >
            <h1
                style={{
                    fontSize: '1.5em',
                    marginBottom: 0,
                }}
            >{props.title}</h1>

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
        </ExtraBlock>
    </>
)
