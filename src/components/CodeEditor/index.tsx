import * as React from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'

import 'prismjs/components/prism-json'
import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-dark.css'

export interface ICodeEditorProps {
    code: string
    syntax: string
    onChange: (code: string) => void
}

export const CodeEditor: React.FC<ICodeEditorProps> = props => (
    <div>
        <style jsx>{`
                div {
                    caret-color: white;
                    border-radius: 5px;
                    padding: 5px;
                    background-color: #333;
                }
            `}</style>

        <Editor
            value={props.code}
            highlight={code => highlight(code, languages.json)}
            onValueChange={props.onChange}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
            }}
        />
    </div>
)
