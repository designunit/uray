import * as React from 'react'
import { Feature, Point } from 'geojson'
import { CaseSet } from './CaseSet'
import { ICase, IFeatureProperties } from '../../app/types'

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
                <CaseSet
                    cases={props.feature.properties.cases}
                    onChange={value => {
                        props.onChangeFeatureCases(props.feature, value)
                    }}
                />
            </div>
        </div>
    )
}
