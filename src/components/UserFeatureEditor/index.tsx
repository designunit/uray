import * as React from 'react'
import { Feature, Point } from 'geojson'
import { UserFeature, IUserFeatureSchema, FeatureId, IUserFeatureField } from '../../app/types'
import { Input, Button } from 'antd'
import { PropertyTable } from './PropertyTable'

// function sortData<T extends { key: string }>(data: T[], keys: string[]): T[] {
//     return data.sort((a, b) => {
//         const aPriority = keys.indexOf(a.key)
//         const bPriority = keys.indexOf(b.key)
//         if (aPriority && bPriority < 0) {
//             return 0
//         }
//         if (aPriority < 0) {
//             return 1
//         }
//         if (bPriority < 0) {
//             return -1
//         }
//         return aPriority - bPriority
//     })
// }

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
        value: props.feature.properties[field]
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
