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
    footer: React.ReactNode
    showFooter?: boolean
    theme: 'dark' | 'light'
}

export const AppLayout: React.FC<IAppLayoutProps> = ({ showFooter = true, ...props }) => (
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
        <Layout>
            <Sider
                theme={props.theme}
                width={'30%'}
            >
                {props.sider}
            </Sider>
            <Content>{props.content}</Content>
        </Layout>

        {!showFooter ? null : (
            <Footer>{props.footer}</Footer>
        )}
    </Layout>
)