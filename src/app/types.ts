import { Feature, Point, Geometry } from 'geojson'

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

export type GeoCoord = [number, number]

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
    view: [string, any?]
    default?: any
}

export interface IIndex<T> {
    [name: string]: T
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
    currentLayerId?: LayerId
    mapCenterCoord: GeoCoord
    mapZoom: number
}

export interface IGeolocation {
    latitude: number
    longitude: number
    accuracy: number
    altitude: number
    altitudeAccuracy: number
    heading: number
    speed: number
    timestamp: number
}