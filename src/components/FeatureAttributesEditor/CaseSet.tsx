import * as React from 'react'
import { Form, Icon, Button, Select } from 'antd'
import { topicOptions, userOptions, seasonOptions } from './attributes'
import { ICase } from '../../app/types'

const { Option } = Select

export interface ICaseSetProps {
    cases: ICase[]
    onChange(value: ICase[]): void
}

export class CaseSet extends React.Component<ICaseSetProps, {}> {
    remove = (x: ICase) => {
        this.props.onChange(
            this.props.cases.filter(item => item.id !== x.id)
        )
    }

    add = () => {
        const id = Date.now()
        this.props.onChange([...this.props.cases, {
            id,
            topic: null,
            user: null,
            season: null,
        }])
    }

    update(id: number, partialValue: Partial<ICase>): void {
        const newCases = this.props.cases.map(item => item.id !== id ? item : ({
            ...item,
            ...partialValue,
        }))

        this.props.onChange(newCases)
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        }
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        }

        return (
            <div>
                {this.props.cases.map(x => (
                    <Form.Item
                        {...formItemLayout}
                        key={x.id}
                        label={'Case'}
                        required={false}
                    >
                        <Select
                            onChange={(topic: string) => {
                                this.update(x.id, { topic })
                            }}
                            defaultValue={x.topic}
                            placeholder={'Topic'}
                            style={{
                                width: '100%',
                            }}
                        >
                            {topicOptions.map(x => (
                                <Option key={x.value} value={x.value}>{x.name}</Option>
                            ))}
                        </Select>

                        <Select
                            onChange={(user: string) => {
                                this.update(x.id, { user })
                            }}
                            defaultValue={x.user}
                            placeholder={'User'}
                            style={{
                                width: '100%',
                            }}
                        >
                            {userOptions.map(x => (
                                <Option key={x.value} value={x.value}>{x.name}</Option>
                            ))}
                        </Select>

                        <Select
                            onChange={(season: string) => {
                                this.update(x.id, { season })
                            }}
                            defaultValue={x.season}
                            placeholder={'Season'}
                            style={{
                                width: '100%',
                            }}
                        >
                            {seasonOptions.map(x => (
                                <Option key={x.value} value={x.value}>{x.name}</Option>
                            ))}
                        </Select>

                        {/* {this.props.cases.length <= 1 ? null : ( */}
                        <Icon
                            type="minus-circle-o"
                            onClick={() => this.remove(x)}
                        />
                        {/* )} */}
                    </Form.Item>
                ))}

                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button
                        type={'dashed'}
                        onClick={this.add}
                        icon={'plus'}
                    />
                </Form.Item>
            </div>
        )
    }
}
