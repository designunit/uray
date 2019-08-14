import { Point, Feature, Geometry } from 'geojson'
import { IFeatureProperties, ILayer, FeatureId } from './types'
import axios from 'axios'
import { createPointFeature } from '../lib/geojson'

export function ensureFeatureId<T, G extends Geometry = Geometry>(feature: Feature<G, T>, id: number): Feature<G, T> {
    if (!feature.id) {
        feature.id = id
    }
    return feature
}

interface FeatureResponse<T, G extends Geometry = Geometry> {
    id: number,
    feature: Feature<G, T>
}

export const api = axios.create({
    baseURL: process.env.API_BASE_URL,
})

export async function createFeatureInLocationAndAssignToLayer<T>(layer: ILayer, latLng: [number, number], properties: T): Promise<[Feature<Point, T>, ILayer]> {
    const newFeature = await createFeatureInLocation(latLng, properties)
    const id = Number(newFeature.id)
    const newLayer = await assignFeatureToLayer(id, layer)

    return [newFeature, newLayer]
}

export async function assignFeatureToLayer(featureId: FeatureId, layer: ILayer): Promise<ILayer> {
    const newLayer = await updateLayer({
        ...layer,
        featureIds: Array.from(new Set([...layer.featureIds, featureId])),
    })

    return newLayer
}

export async function removeFeatureFromLayer(featureId: FeatureId, layer: ILayer): Promise<ILayer> {
    const newLayer = await updateLayer({
        ...layer,
        featureIds: layer.featureIds.filter(id => id !== featureId),
    })

    return newLayer
}

export async function changeFeatureLayer(featureId: FeatureId, fromLayer: ILayer, toLayer: ILayer): Promise<[ILayer, ILayer]> {
    const newFromLayer = await removeFeatureFromLayer(featureId, fromLayer)    
    const newToLayer = await assignFeatureToLayer(featureId, toLayer)

    return [newFromLayer, newToLayer]
}

export async function createFeatureInLocation<T>(latLng: [number, number], properties: T): Promise<Feature<Point, T>> {
    const feature = createPointFeature(latLng, properties)
    const res = await api.post<FeatureResponse<T, Point>>('/features', { feature })

    return updateFeature(
        ensureFeatureId(res.data.feature, res.data.id)
    )
}

export async function deleteFeatureId(featureId: FeatureId): Promise<void> {
    const res = await api.delete(`/features/${featureId}`)
}

export async function updateFeature<T>(feature: Feature<Point, T>): Promise<Feature<Point, T>> {
    const id = feature.id

    const res = await api.put<FeatureResponse<T, Point>>(`/features/${id}`, { feature })

    return res.data.feature
}

export async function getFeatures<T, G extends Geometry = Geometry>(): Promise<Feature<G, T>[]> {
    const res = await api.get<FeatureResponse<T, G>[]>('/features')

    return res.data.map(f => ensureFeatureId<T, G>(f.feature, f.id))
}

export async function getCases(): Promise<FeatureResponse<IFeatureProperties>[]> {
    const res = await api.get<FeatureResponse<IFeatureProperties>[]>('/cases')

    return res.data.map(f => {
        if (!f.feature.id) {
            f.feature.id = f.id
        }

        return f
    })
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