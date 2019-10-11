import * as React from 'react'

import { Button, Icon, Spin } from 'antd'
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
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <title>{props.title}</title>
        </Head>

        <ExtraBlock
            extra={props.actions}
            style={props.style}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <Button
                    icon={'left'}
                    href={'/'}
                    style={{
                        marginRight: 10,
                    }}
                />

                <h1
                    style={{
                        fontSize: '1.5em',
                        marginBottom: 0,
                        marginRight: 10,
                    }}
                >{props.title}</h1>

                {!props.isSyncing ? null : (
                    <Spin
                        indicator={(
                            <Icon
                                type={'loading'}
                                style={{
                                    fontSize: '1em',
                                }}
                                spin
                            />
                        )}
                    />
                )}
            </div>
        </ExtraBlock>
    </>
)
