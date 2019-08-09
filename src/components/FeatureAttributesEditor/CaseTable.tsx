import * as React from 'react'
import { Table, Select, Button } from 'antd'
import { ICase } from '../../app/types'
import { topicOptions, userOptions, seasonOptions } from '../../app'
import { Json } from '../Json'
import { replaceCase } from './lib'
import { ColumnProps } from 'antd/lib/table';

export interface ICaseTableProps {
    cases: ICase[]
    onChange(value: ICase[]): void
    footer: React.ReactNode
}

const TableCell: React.FC<any> = props => (
    <td {...props}>
        {!props.value ? props.children : (
            <Select
                onChange={(value: string) => {
                    props.onChange(value)
                    // this.update(x.id, { topic })
                }}
                defaultValue={props.value}
                style={{
                    width: '100%'
                }}
            >
                {props.options.map(x => (
                    <Select.Option key={x.value} value={x.value}>
                        {x.name}
                    </Select.Option>
                ))}
            </Select>
        )}
    </td>
)

export class CaseTable extends React.Component<ICaseTableProps> {
    private columns: ColumnProps<ICase>[]

    constructor(props) {
        super(props)

        this.columns = [
            {
                title: 'Topic',
                dataIndex: 'topic',
                key: 'topic',
                onCell: record => ({
                    record,
                    value: record.topic,
                    options: topicOptions,
                    onChange: (value: string) => this.onChangeCell(record, 'topic', value),
                }),
            },
            {
                title: 'User',
                dataIndex: 'user',
                key: 'user',
                onCell: record => ({
                    record,
                    value: record.user,
                    options: userOptions,
                    onChange: (value: string) => this.onChangeCell(record, 'user', value),
                }),
            },
            {
                title: 'Season',
                dataIndex: 'season',
                key: 'season',
                onCell: record => ({
                    record,
                    value: record.season,
                    options: seasonOptions,
                    onChange: (value: string) => this.onChangeCell(record, 'season', value),
                }),
            },  
            {
                title: 'Action',
                key: 'action',
                render: (text, record, index) => (
                    <Button
                        icon={'delete'}
                        onClick={() => this.onClickDelete(index)}
                    />
                ),
            },
        ]
    }
    
    private onClickDelete = (index: number) => {
        this.props.onChange(this.props.cases.filter((x, i) => i !== index))
    }

    private onChangeCell = (record, key: string, value: string, ) => {
        const nc = replaceCase(this.props.cases, record.id, {
            [key]: value
        })

        this.props.onChange(nc)
    }

    public render() {
        return (
            <Table
                rowKey={'id'}
                components={{
                    body: {
                        cell: TableCell,
                    },
                }}
                columns={this.columns}
                dataSource={this.props.cases}
                pagination={false}
                footer={() => this.props.footer}
            />
        )
    }
}