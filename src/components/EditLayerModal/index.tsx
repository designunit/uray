import * as React from 'react'
import { Modal, Input } from 'antd'
import { ILayer } from '../../app/types'
import { CodeEditor } from '../CodeEditor'

export interface IEditLayerModalProps {
    layer: ILayer
    visible: boolean
    onSubmit: (layer: ILayer) => Promise<void>
    onChange: (part: Partial<ILayer>) => void
    onCancel: () => void
}

export const EditLayerModal: React.FC<IEditLayerModalProps> = props => {
    const [submitting, setSubmitting] = React.useState<boolean>(false)

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
        >
            {!props.layer ? null : (
                <>
                    <Input
                        value={props.layer.name}
                        onChange={event => {
                            props.onChange({
                                name: event.target.value,
                            })
                        }}
                        style={{
                            marginBottom: 10,
                        }}
                    />
                    <Input
                        value={props.layer.color}
                        onChange={event => {
                            props.onChange({
                                color: event.target.value,
                            })
                        }}
                        style={{
                            marginBottom: 10,
                        }}
                    />
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
