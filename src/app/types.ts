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