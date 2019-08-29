import * as React from 'react'
import { Table, Select, Button, Input, Switch } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IUserFeatureField } from '../../app/types'
import { SelectTable } from './SelectTable'
import { PropertyValue } from '../FeaturePropertiesViewer/PropertyValue';

type DataItem = { key: string, value: string }

function getField(fieldName: string, fields: IUserFeatureField[]): IUserFeatureField | null {
    return fields.find(x => x.field === fieldName)
}

function resolveView(field: IUserFeatureField): { name: string, options?: any } {
    if (field) {
        const name = field.view[0]

        if (['text', 'input', 'switch', 'select', 'image', 'select-table', 'value'].includes(name)) {
            return {
                name,
                options: field.view[1]
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
    } else if (viewName == 'value') {
        content = (
            <PropertyValue
                value={props.value}
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
    } else if (viewName == 'image') {
        content = (
            <img
                width={200}
                src={props.value}
            />
        )
    } else if (viewName === 'select-table') {
        const columns: { field: string, options: { name: string, value: string }[] }[] = props.view.options

        content = (
            <SelectTable
                data={props.value}
                columns={columns}
                onChange={cases => {
                    onChange(cases)
                }}
                footer={(
                    <footer>
                        <Button
                            icon={'plus'}
                            size={'small'}
                            onClick={() => {
                                const newItem = Object.fromEntries(new Map(columns
                                    .map(x => [x.field, x.options[0].value])
                                ))
                                const cases = [
                                    ...(props.value || []),
                                    newItem,
                                ]
                                onChange(cases)
                            }}
                        />
                    </footer>
                )}
            />
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
                onCell: record => {
                    const field = getField(record.key, props.fields)
                    const value = record.value
                        ? record.value
                        : field && field.default ? field.default : null

                    return {
                        value,
                        view: resolveView(field),
                        onChange: (value: string) => {
                            props.onChange(record.key, value)
                        },
                    }
                },
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
                        {this.props.footer}
                    </footer>
                )}
            />
        )
    }
}