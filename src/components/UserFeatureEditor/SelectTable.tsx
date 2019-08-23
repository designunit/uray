import * as React from 'react'
import { Table, Select, Button } from 'antd'
import { changeItem } from './lib'
import { ColumnProps } from 'antd/lib/table'

export interface ISelectTableProps<T> {
    data: T[]
    onChange(value: T[]): void
    footer: React.ReactNode
    columns: any[]
    // columns: {
    //     field: string,
    //     options: string[],
    // }[]
}

const TableCell: React.FC<any> = props => (
    <td {...props}>
        {!props.value ? props.children : (
            <Select
                onChange={(value: string) => props.onChange(value)}
                size={'small'}
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

export class SelectTable<T> extends React.Component<ISelectTableProps<T>> {
    private columns: ColumnProps<T>[]

    constructor(props) {
        super(props)

        this.columns = [
            ...props.columns.map(({field, options}) => ({
                title: field,
                dataIndex: field,
                key: field,
                onCell: (record, rowIndex: number) => ({
                    record,
                    value: record[field],
                    options,
                    onChange: (value: string) => this.onChangeCell(field, value, rowIndex),
                }),
            })),
            {
                title: '',
                key: 'action',
                render: (text, record, index) => (
                    <Button
                        icon={'delete'}
                        size={'small'}
                        onClick={() => this.onClickDelete(index)}
                    />
                ),
            },
        ]
    }

    private onClickDelete = (index: number) => {
        this.props.onChange(this.props.data.filter((x, i) => i !== index))
    }

    private onChangeCell = (key: string, value: string, rowIndex: number) => {
        this.props.onChange(changeItem<any>(this.props.data, rowIndex, {
            [key]: value
        }))
    }

    public render() {
        return (
            <Table
                size={'small'}
                rowKey={'id'}
                components={{
                    body: {
                        cell: TableCell,
                    },
                }}
                columns={this.columns}
                dataSource={this.props.data}
                pagination={false}
                footer={() => this.props.footer}
            />
        )
    }
}