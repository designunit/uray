import * as React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { PropertyValue } from './PropertyValue'

type DataItem = { key: string, value: string }

export interface IPropertyTable {
    style?: React.CSSProperties
    data: DataItem[]
}

export const PropertyTable: React.FC<IPropertyTable> = props => {
    const renderKeyCallback = React.useCallback((text: string) => (
        <strong>{text}</strong>
    ), [])
    const renderValueCallback = React.useCallback((value) => (
        <PropertyValue
            value={value}
        />
    ), [])

    const columns: ColumnProps<DataItem>[] = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: renderKeyCallback
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '300px',
            render: renderValueCallback,
        },
    ]

    return (
        <Table
            style={props.style}
            size={'small'}
            showHeader={false}
            bordered={false}
            columns={columns}
            dataSource={props.data}
            pagination={false}
        />
    )
}