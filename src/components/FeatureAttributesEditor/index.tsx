import * as React from 'react'
import { Feature, Point } from 'geojson'
import { CaseTable } from './CaseTable'
import { ICase, IFeatureProperties } from '../../app/types'
import { createDefaultCase } from '../../app/lib'
import { Input } from 'antd'

export interface IFeatureAttributesEditor {
    feature: Feature<Point, IFeatureProperties>
    onChangeFeatureCases(feature: Feature<Point, IFeatureProperties>, newCases: ICase[]): void
    onChangeFeatureName(feature: Feature<Point, IFeatureProperties>, newName: string): void
}

export const FeatureAttributesEditor: React.FC<IFeatureAttributesEditor> = props => {
    return (
        <div>
            <style jsx>{`
                div {
                    margin-top: 15px;
                }
            `}</style>

            <Input
                value={props.feature.properties.name}
                onChange={(event) => {
                    const value = event.target.value
                    props.onChangeFeatureName(props.feature, value)
                }}
            />

            <div style={{
                minWidth: 300,
            }}>
                <CaseTable
                    cases={props.feature.properties.cases}
                    onChange={value => {
                        props.onChangeFeatureCases(props.feature, value)
                    }}
                    onAdd={() => {
                        return createDefaultCase()
                    }}
                />
            </div>
        </div>
    )
}
