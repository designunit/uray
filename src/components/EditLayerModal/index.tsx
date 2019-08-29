import * as React from 'react'
import { Modal, Input, Button, Popconfirm, Icon } from 'antd'
import { ColorPicker } from '../ColorPicker'
import { ILayer } from '../../app/types'
import { CodeEditor } from '../CodeEditor'

export interface IEditLayerModalProps {
    layer: ILayer
    visible: boolean
    showDeleteButton: boolean
    onSubmit: (layer: ILayer) => Promise<void>
    onChange: (part: Partial<ILayer>) => void
    onCancel: () => void
    onDelete: (layer: ILayer) => void
}

export const EditLayerModal: React.FC<IEditLayerModalProps> = props => {
    const [submitting, setSubmitting] = React.useState<boolean>(false)
    const [deleting, setDeleting] = React.useState<boolean>(false)

    return (
        <Modal
            title={'Edit layer'}
            visible={props.visible}
            onOk={async () => {
                setSubmitting(true)
                await props.onSubmit(props.layer)
                setSubmitting(false)
            }}
            confirmLoading={submitting}
            onCancel={props.onCancel}
            footer={(
                <footer>
                    <style jsx>{`
                        footer {
                            display: flex;
                            justify-content: space-between;
                        }
                    `}</style>

                    {!props.showDeleteButton ? null : (
                        <Popconfirm
                            title={'Are you sure?'}
                            okType={'danger'}
                            okText={'Delete'}
                            cancelText={'No'}
                            onConfirm={async () => {
                                setDeleting(true)
                                await props.onDelete(props.layer)
                                setDeleting(false)
                            }}
                            icon={(
                                <Icon
                                    type='question-circle-o'
                                    style={{
                                        color: 'red'
                                    }}
                                />
                            )}
                        >
                            <Button
                                loading={deleting}
                                disabled={deleting}
                                type={'danger'}
                            >
                                Delete
                        </Button>
                        </Popconfirm>
                    )}

                    <div>
                        <Button
                            onClick={props.onCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            loading={submitting}
                            disabled={submitting}
                            type={'primary'}
                            onClick={async () => {
                                setSubmitting(true)
                                await props.onSubmit(props.layer)
                                setSubmitting(false)
                            }}
                        >
                            Update
                        </Button>
                    </div>
                </footer>
            )}
        >
            {!props.layer ? null : (
                <>
                    <div style={{
                        marginBottom: 10,
                        display: 'flex',
                    }}>
                        <Input
                            style={{
                                marginRight: 10,
                            }}
                            value={props.layer.name}
                            onChange={event => {
                                props.onChange({
                                    name: event.target.value,
                                })
                            }}
                        />

                        <ColorPicker
                            color={props.layer.color}
                            onChange={color => props.onChange({
                                color,
                            })}
                        />
                    </div>

                    <CodeEditor
                        code={props.layer.schemaContent || ''}
                        syntax={'json'}
                        onChange={schemaContent => {
                            props.onChange({
                                schemaContent,
                            })
                        }}
                    />
                </>
            )}
        </Modal>
    )
}
