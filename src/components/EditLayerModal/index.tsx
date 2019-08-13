import * as React from 'react'
import { Modal, Input } from 'antd'
import Editor from 'react-simple-code-editor'

import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-json'
import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-dark.css'

import { ILayer } from '../../app/types'

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
                    <div>
                        <style jsx>{`
                            div {
                                //border: 1px solid #d9d9d9;
                                border-radius: 5px;
                                padding: 5px;
                                caret-color: white;
                                background-color: #333;
                            }
                        `}</style>
                        
                        <Editor
                            value={props.layer.schemaContent || ''}
                            highlight={code => highlight(code, languages.json)}
                            onValueChange={code => {
                                props.onChange({
                                    schemaContent: code,
                                })
                            }}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                // fontSize: 12,
                            }}
                        />
                    </div>
                </>
            )}
        </Modal>
    )
}
