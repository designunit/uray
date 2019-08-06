export interface ICase {
    id: number
    topic: string
    user: string
    season: string
}

export interface IFeatureAttributes {
    id: number
    location: string
    topic: string
    users: string
    season: string
}

export interface IFeatureProperties {
    cases: ICase[]
    name: string
}
