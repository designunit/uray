import { FeatureCollection, Point, Feature } from 'geojson'
import { IFeatureProperties, ILayer } from './types'
import axios from 'axios'
import equal from 'fast-deep-equal'
import { createPointFeature } from '../lib/geojson'

type FC = FeatureCollection<Point, IFeatureProperties>
type FeatureResponse = {
    id: number,
    feature: Feature<Point, IFeatureProperties>
}

export const api = axios.create({
    baseURL: process.env.API_BASE_URL,
})

export async function createFeature<T>(latLng: [number, number], properties: T): Promise<Feature<Point, IFeatureProperties>> {
    const feature = createPointFeature(latLng, properties)
    const res = await api.post<FeatureResponse>('/cases', { feature })

    const newFeature = res.data.feature
    newFeature.properties.id = res.data.id

    return updateFeature(newFeature)
}

export async function deleteFeatureId(featureId: number): Promise<void> {
    const res = await api.delete(`/cases/${featureId}`)
}

export async function updateFeature(feature: Feature<Point, IFeatureProperties>): Promise<Feature<Point, IFeatureProperties>> {
    const id = feature.properties.id

    const res = await api.put<FeatureResponse>(`/cases/${id}`, { feature })

    return res.data.feature
}

export async function getCases(): Promise<FeatureResponse[]> {
    const res = await api.get<FeatureResponse[]>('/cases')

    return res.data
}

export async function getLayers(): Promise<ILayer[]> {
    const res = await api.get<ILayer[]>('/layers')

    return res.data
}

export async function createLayer(layer: Partial<ILayer>): Promise<ILayer> {
    const res = await api.post<ILayer>('/layers', layer)

    return res.data
}

export async function deleteLayer(id: number): Promise<void> {
    const res = await api.delete(`/layers/${id}`)
}

export async function updateLayer(layer: ILayer): Promise<ILayer> {
    const res = await api.put<ILayer>(`/layers/${layer.id}`, layer)

    return res.data
}