import * as React from 'react'
import { Layout } from 'antd'

const Header = Layout.Header
const Content = Layout.Content
const Footer = Layout.Footer
const Sider = Layout.Sider

export interface IAppLayoutProps {
    header: React.ReactNode
    sider: React.ReactNode
    content: React.ReactNode
    theme: 'dark' | 'light'
    layout: 'default' | 'mobile'
}

export const AppLayout: React.FC<IAppLayoutProps> = ({ ...props }) => {
    const isMobile = props.layout === 'mobile'

    return (
        <Layout
            style={{
                height: '100%',
            }}
        >
            <Header
                style={{
                    backgroundColor: '#e8ecf0',
                    padding: '0 20px',
                }}
            >
                {props.header}
            </Header>
            <Layout
                style={{
                    flex: 1,
                }}
            >
                {isMobile ? null : (
                    <Sider
                        theme={props.theme}
                        width={'30%'}
                    >
                        {props.sider}
                    </Sider>
                )}

                <Content
                >
                    {props.content}
                </Content>
            </Layout>

            {!isMobile ? null : (
                <Footer
                    style={{
                        padding: '0px 5px',
                        flex: 1,
                        overflow: 'auto',
                        zIndex: 1,
                    }}
                >
                    {props.sider}
                </Footer>
            )}
        </Layout >
    )
}