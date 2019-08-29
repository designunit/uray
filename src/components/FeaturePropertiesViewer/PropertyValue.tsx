import * as React from 'react'
import moment from 'moment'
import { Table, Switch } from 'antd'
import { Json } from '../Json'
import { isValidDate } from '../../lib/time'

export const PropertyValue: React.FC<{ value: any }> = ({ value }) => {
    if (isValidDate(value)) {
        return (
            <span>{moment(value).format('LLL')}</span>
        )
    }

    if (typeof value === 'string') {
        return (
            <span>{value}</span>
        )
    }
    
    if (typeof value === 'number') {
        return (
            <span>{value}</span>
        )
    }
    
    if (typeof value === 'boolean') {
        return (
            <Switch
                disabled={true}
                defaultChecked={value}
            />
        )
    }
    
    if (Array.isArray(value)) {
        return (
            <TableValue
                data={value}
            />
        )
    }

    return (
        <Json
            data={value}
        />
    )
}

const TableValue: React.FC<{ data: any[] }> = props => {
    const columns = Array
        .from(new Set(props.data.flatMap(x => Object.keys(x))))
        .map(key => ({
            title: key,
            dataIndex: key,
            key: key,
        }))

    return (
        <Table
            size={'small'}
            dataSource={props.data}
            columns={columns}
            pagination={false}
        />
    )
}