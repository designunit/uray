import * as React from 'react'

import { IUserFeatureField, UserFeature } from '../../app/types'
import { PropertyTable } from './PropertyTable'

export interface IUserFeatureEditorProps {
    style?: React.CSSProperties
    feature: UserFeature
    fields: IUserFeatureField[]
    onChange: (feature: UserFeature, key: string, value: string) => void
    renderActions: (feature: UserFeature) => React.ReactNode
}

export const UserFeatureEditor: React.FC<IUserFeatureEditorProps> = props => {
    const data = props.fields.map(({ field }) => ({
        key: field,
        value: props.feature.properties[field],
    }))

    return (
        <PropertyTable
            fields={props.fields}
            style={props.style}
            data={data}
            footer={props.renderActions(props.feature)}
            onChange={(key, value) => {
                props.onChange(props.feature, key, value)
            }}
        />
    )
}
