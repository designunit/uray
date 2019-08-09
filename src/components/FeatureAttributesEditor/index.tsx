import * as React from 'react'
import { Feature, Point } from 'geojson'
import { CaseTable } from './CaseTable'
import { ICase, IFeatureProperties } from '../../app/types'
import { createDefaultCase } from '../../app/lib'
import { Input, Button } from 'antd'

export interface IFeatureAttributesEditor {
    feature: Feature<Point, IFeatureProperties>
    onMoveFeature(feature: Feature<Point, IFeatureProperties>): void
    onDeleteFeature(feature: Feature<Point, IFeatureProperties>): void
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

                footer {
                    display: flex;
                    justify-content: space-between; 
                }
            `}</style>

            <section>
                <Input
                    value={props.feature.properties.name}
                    onChange={(event) => {
                        const value = event.target.value
                        props.onChangeFeatureName(props.feature, value)
                    }}
                    style={{
                        marginRight: 10,
                    }}
                />
            </section>

            <div style={{
                minWidth: 300,
            }}>
                <CaseTable
                    cases={props.feature.properties.cases}
                    onChange={value => {
                        props.onChangeFeatureCases(props.feature, value)
                    }}
                    footer={(
                        <footer>
                            <Button
                                icon={'plus'}
                                onClick={() => {
                                    this.props.onChangeFeatureCases(props.feature, [
                                        ...props.feature.properties.cases,
                                        createDefaultCase(),
                                    ])
                                }}
                            />
                            <div>
                                <Button
                                    disabled={true}
                                    onClick={() => props.onMoveFeature(props.feature)}
                                    style={{
                                        marginRight: 10,
                                    }}
                                >Move Feature</Button>

                                <Button
                                    onClick={() => props.onDeleteFeature(props.feature)}
                                >Delete Feature</Button>
                            </div>
                        </footer>
                    )}
                />
            </div>
        </div>
    )
}
