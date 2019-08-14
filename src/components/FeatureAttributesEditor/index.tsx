import * as React from 'react'
import { Feature, Point } from 'geojson'
import { CaseTable } from './CaseTable'
import { ICase, IFeatureProperties } from '../../app/types'
import { createDefaultCase } from '../../app/lib'
import { Input, Button } from 'antd'

export interface IFeatureAttributesEditor {
    feature: Feature<Point, IFeatureProperties>
    renderActions: (feature: Feature<Point, IFeatureProperties>) => React.ReactNode
    onChange: (feature: Feature<Point, IFeatureProperties>, newProperties: Partial<IFeatureProperties>) => void
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
                    align-items: center;
                }
            `}</style>

            <section>
                <Input
                    value={props.feature.properties.name}
                    onChange={(event) => {
                        const name = event.target.value
                        props.onChange(props.feature, { name })
                    }}
                    style={{
                        marginRight: 10,
                        marginBottom: 10,
                    }}
                />

                <Input.TextArea
                    value={props.feature.properties.description}
                    autosize={{
                        minRows: 3,
                        maxRows: 10,
                    }}
                    onChange={(event) => {
                        const description = event.target.value
                        props.onChange(props.feature, { description })
                    }}
                    style={{
                        marginRight: 10,
                    }}
                />
            </section>

            <div style={{
                minWidth: 400,
            }}>
                <CaseTable
                    cases={props.feature.properties.cases}
                    onChange={cases => {
                        props.onChange(props.feature, { cases })
                    }}
                    footer={(
                        <footer>
                            <Button
                                icon={'plus'}
                                onClick={() => {
                                    const cases = [
                                        ...props.feature.properties.cases || [],
                                        createDefaultCase(),
                                    ]
                                    props.onChange(props.feature, { cases })
                                }}
                            />
                            <section>
                                {props.renderActions(props.feature)}
                            </section>
                        </footer>
                    )}
                />
            </div>
        </div>
    )
}
