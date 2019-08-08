import * as React from 'react'
import { Feature, Point } from 'geojson'
import { CaseTable } from './CaseTable'
import { ICase, IFeatureProperties } from '../../app/types'
import { createDefaultCase } from '../../app/lib'

export interface IFeatureAttributesEditor {
    feature: Feature<Point, IFeatureProperties>
    onChangeFeatureCases(feature: Feature<Point, IFeatureProperties>, newCases: ICase[]): void
}

export const FeatureAttributesEditor: React.FC<IFeatureAttributesEditor> = props => {
    return (
        <div>
            <h2>{props.feature.properties.name}</h2>

            <div style={{
                minWidth: 300,
            }}>
                <CaseTable
                    cases={props.feature.properties.cases}
                    onChange={value => {
                        console.log('change cases', value)
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
