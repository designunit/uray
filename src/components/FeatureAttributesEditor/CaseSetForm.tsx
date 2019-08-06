import * as React from 'react'
import { Form, Input, Icon, Button, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { topicOptions } from './attributes'

const { Option } = Select

let id = 0
function nextKey(keys: number[]): number {
    if (keys.length === 0){
        return 0
    }

    id = Math.max(...keys)
    return ++id
}

export interface FormProps extends FormComponentProps {
    // // name: string;
    // fields: {
    //     keys: number[],
    //     topics: string[],
    //     users: string[],
    //     seasons: string[],
    // }
    onChange(value: any): void
}

export class CaseSetForm extends React.Component<FormProps, {}> {
    remove = (k: number) => {
        const { form } = this.props
        // can use data-binding to get
        const keys = form.getFieldValue('keys')
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        })
    }

    add = () => {
        const { form } = this.props
        // can use data-binding to get
        const keys = form.getFieldValue('keys')
        const nextKeys = [...keys, nextKey(keys)]
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        })
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
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
        getFieldDecorator('keys', { initialValue: [] })
        // getFieldDecorator('keys', { initialValue: this.props.fields.keys })
        getFieldDecorator('keys')

        const keys = getFieldValue('keys')
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...formItemLayout}
                label={'Case'}
                required={false}
                key={k}
            >
                {/* {getFieldDecorator(`topics[${k}]`, { initialValue: this.props.fields.topics[k] })( */}
                {getFieldDecorator(`topics[${k}]`)(
                    <Select
                        placeholder={'Topic'}
                        style={{
                            width: '100%',
                        }}
                    >
                        {topicOptions.map(x => (
                            <Option
                                key={x.value}
                                value={x.value}
                            >{x.name}</Option>
                        ))}
                    </Select>
                )}

                {/* {getFieldDecorator(`users[${k}]`, { initialValue: this.props.fields.users[k] })( */}
                {/* {getFieldDecorator(`users[${k}]`)(
                    <UserSelect
                        placeholder={'User'}
                    />
                )} */}

                {/* {getFieldDecorator(`seasons[${k}]`, { initialValue: this.props.fields.seasons[k] })( */}
                {/* {getFieldDecorator(`seasons[${k}]`)(
                    <SeasonSelect
                        placeholder={'Season'}
                    />
                )} */}

                {keys.length < 1 ? null : (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                )}
            </Form.Item>
        ))

        return (
            <Form>
                {formItems}

                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button
                        type={'dashed'}
                        onClick={this.add}
                        icon={'plus'}
                    />
                </Form.Item>
            </Form>
        )
    }
}

export const CaseSet = Form.create<FormProps>({
    name: 'feature_case_set',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    // onValuesChange(props, changedValues, allValues) {
    //     props.onChange(allValues)
    // },
})(
    CaseSetForm
)