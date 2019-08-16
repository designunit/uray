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
    featureIds: FeatureId[]
    schemaContent: string
    schema: IUserFeatureSchema
}

export interface IUserFeatureProperties {
    [name: string]: any
}

export type UserFeature = Feature<Point, IUserFeatureProperties>

export interface IFeatureIndex<T, G extends Geometry = Geometry> {
    [name: string]: Feature<G, T>
}

export type FeatureId = number | string
export type LayerId = number
export type ProjectId = number

export type SchemaFunction = string[]

export interface IUserFeatureField {
    field: string
    view: string[]
    default?: any
}

export interface IUserFeatureSchema {
    version: string
    editor: string | IUserFeatureField[]
    filter?: string
    markerText?: string | SchemaFunction
    markerColor?: string | SchemaFunction
}

export interface IProjectDefinition {
    // readonly slug: string
    id: ProjectId
    name: string
    layers: LayerId[]
}
