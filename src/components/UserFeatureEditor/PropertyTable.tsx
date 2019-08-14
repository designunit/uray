import * as React from 'react'
import { Table, Select, Button, Input, Switch } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IUserFeatureSchema, IUserFeatureField } from '../../app/types'

type DataItem = { key: string, value: string }

function resolveView(fields: IUserFeatureField[], fieldName: string): { name: string, options?: any } {
    const rule = fields.find(x => x.field === fieldName)
    if (rule) {
        const name = rule.view[0]

        if (['text', 'input', 'switch', 'select'].includes(name)) {
            return {
                name,
                options: rule.view[1]
            }
        }

        return {
            name: 'input'
        }
    }

    return {
        name: 'input'
    }
}

export interface IPropertyTable {
    style?: React.CSSProperties
    fields: IUserFeatureField[]
    data: DataItem[]
    onChange(key: string, value: string): void
    footer: React.ReactNode
}

const TableCell: React.FC<any> = ({ onChange, ...props }) => {
    let content = props.children
    const viewName = props.view ? props.view.name : null

    if (viewName == 'input') {
        content = (
            <Input
                defaultValue={props.value}
                onChange={event => {
                    onChange(event.target.value)
                }}
            />
        )
    } else if (viewName == 'text') {
        content = (
            <Input.TextArea
                defaultValue={props.value}
                onChange={event => {
                    onChange(event.target.value)
                }}
            />
        )
    } else if (viewName == 'switch') {
        content = (
            <Switch
                checked={props.value}
                onChange={checked => {
                    onChange(checked)
                }}
            />
        )
    } else if (viewName == 'select') {
        const options: string[] = props.view.options
        content = (
            <Select
                defaultValue={props.value}
                onChange={value => {
                    onChange(value)
                }}
                style={{
                    width: '100%',
                }}
            >
                {options.map(x => (
                    <Select.Option
                        key={x}
                        value={x}
                    >{x}</Select.Option>
                ))}
            </Select>
        )
    }

    return (
        <td {...props}>
            {content}
        </td>
    )
}

export class PropertyTable extends React.Component<IPropertyTable> {
    private columns: ColumnProps<DataItem>[]

    constructor(props: IPropertyTable) {
        super(props)

        this.columns = [
            {
                title: 'Key',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                onCell: record => ({
                    view: resolveView(props.fields, record.key),
                    value: record.value,
                    onChange: (value: string) => {
                        props.onChange(record.key, value)
                    },
                }),
            },
        ]
    }

    public render() {
        return (
            <Table
                style={this.props.style}
                size={'small'}
                showHeader={false}
                bordered={false}
                components={{
                    body: {
                        cell: TableCell,
                    },
                }}
                columns={this.columns}
                dataSource={this.props.data}
                pagination={false}
                footer={() => (
                    <footer>
                        <style jsx>{`
                            footer {
                                display: flex;
                            }

                            div {
                                flex: 1;
                            }
                        `}</style>

                        <div></div>
                        {this.props.footer}
                    </footer>
                )}
            />
        )
    }
}