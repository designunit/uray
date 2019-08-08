import * as React from 'react'

export const Json: React.FC<{ data: any }> = props => (
    <pre>
        {JSON.stringify(props.data, null, 4)}
    </pre>
)
