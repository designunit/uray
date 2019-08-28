import * as React from 'react'
import { Layout } from 'antd'

const Content = Layout.Content
const Footer = Layout.Footer
const Sider = Layout.Sider

export interface IAppLayoutProps {
    sider: React.ReactNode
    content: React.ReactNode
    theme: 'dark' | 'light'
    layout: 'default' | 'mobile'
    bigSider: boolean
}

export const AppLayout: React.FC<IAppLayoutProps> = ({ ...props }) => {
    const isMobile = props.layout === 'mobile'

    return (
        <Layout
            style={{
                height: '100%',
            }}
        >
            <Layout
                style={{
                    flex: 1,
                }}
            >
                {isMobile ? null : (
                    <Sider
                        theme={props.theme}
                        width={'400px'}
                    >
                        {props.sider}
                    </Sider>
                )}

                <Content
                    style={{
                        position: 'relative',
                    }}
                >
                    {props.content}
                </Content>
            </Layout>

            {!isMobile ? null : (
                <Footer
                    style={{
                        padding: 0,
                        flex: props.bigSider ? 3 : 1,
                        overflow: 'auto',
                        zIndex: 2,
                        backgroundColor: 'white',
                        
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div>
                        {props.sider}
                    </div>
                </Footer>
            )}
        </Layout >
    )
}