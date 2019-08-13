import { Feature, Point, Geometry } from 'geojson'

export interface ICase {
    id: number
    topic: string
    user: string
    season: string
}

export interface IFeatureProperties {
    description: string
    cases: ICase[]
    name: string
    id: number
}

export interface ILayer {
    id: number
    name: string
    color: string
    readonly: boolean
    featureIds: number[]
    schemaContent: string
}

export interface IUserFeatureProperties {
    [name: string]: any
}

export type UserFeature = Feature<Point, IUserFeatureProperties>

export interface IFeatureIndex<T, G extends Geometry = Geometry> {
    [name: string]: Feature<G, T>
}

export type FeatureId = number | string

export interface IUserFeatureSchemaField {
    field: string
    view: string[]
    default?: any
}

export interface IUserFeatureSchema {
    editor: string
    fields: IUserFeatureSchemaField[]
}