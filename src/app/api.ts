import axios from 'axios'
import equal from 'fast-deep-equal'
import { Feature, Geometry, Point } from 'geojson'

import { createPointFeature, updateFeaturePointLocation } from '../lib/geojson'
import { encodeProject, factoryLayer } from './factory'
import { FeatureId, ILayer, IProjectDefinition, ProjectId } from './types'

export function setClientId(value: string) {
    api.defaults.headers['X-Client-ID'] = value
}

export function ensureFeatureId<T, G extends Geometry = Geometry>(feature: Feature<G, T>, id: number): Feature<G, T> {
    if (!feature.id) {
        feature.id = id
    }
    return feature
}

interface IFeatureResponse<T, G extends Geometry = Geometry> {
    id: number,
    feature: Feature<G, T>
}

export const api = axios.create({
    baseURL: process.env.API_BASE_URL,
})

export async function createFeatureInLocationAndAssignToLayer<T>(
    layer: ILayer,
    latLng: [number, number],
    properties: T,
): Promise<[Feature<Point, T>, ILayer]> {
    const newFeature = await createFeatureInLocation(latLng, properties)
    const id = Number(newFeature.id)
    const newLayer = await assignFeatureToLayer(id, layer)

    return [newFeature, newLayer]
}

export async function uploadGeojsonFeaturesIntoNewLayer<T>(
    features: Array<Feature<Point, T>>,
    layer: Partial<ILayer>,
): Promise<[Array<Feature<Point, T>>, ILayer]> {
    const newFeatures = await Promise.all(features.map(createFeature))
    const featureIds = newFeatures.map(f => Number(f.id))

    const newLayer = await createLayer({
        ...layer,
        featureIds,
    })

    return [newFeatures, newLayer]
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

export async function changeFeatureLayer(
    featureId: FeatureId,
    fromLayer: ILayer,
    toLayer: ILayer,
): Promise<[ILayer, ILayer]> {
    const newFromLayer = await removeFeatureFromLayer(featureId, fromLayer)
    const newToLayer = await assignFeatureToLayer(featureId, toLayer)

    return [newFromLayer, newToLayer]
}

export async function createFeature<T>(feature: Feature<Point, T>): Promise<Feature<Point, T>> {
    const res = await api.post<IFeatureResponse<T, Point>>('/features', { feature })

    return updateFeature(
        ensureFeatureId(res.data.feature, res.data.id),
    )
}

export async function createFeatureInLocation<T>(latLng: [number, number], properties: T): Promise<Feature<Point, T>> {
    const feature = createPointFeature(latLng, properties)
    const res = await api.post<IFeatureResponse<T, Point>>('/features', { feature })

    return updateFeature(
        ensureFeatureId(res.data.feature, res.data.id),
    )
}

export async function updateFeatureLocation<T>(
    feature: Feature<Point, T>,
    latLng: [number, number],
): Promise<Feature<Point, T>> {
    const id = feature.id
    const res = await api.put<IFeatureResponse<T, Point>>(`/features/${id}`, {
        feature: updateFeaturePointLocation(feature, latLng),
    })

    return res.data.feature
}

export async function deleteFeatureId(featureId: FeatureId): Promise<void> {
    const res = await api.delete(`/features/${featureId}`)
}

export async function updateFeature<T>(feature: Feature<Point, T>): Promise<Feature<Point, T>> {
    const id = feature.id

    const res = await api.put<IFeatureResponse<T, Point>>(`/features/${id}`, { feature })

    return res.data.feature
}

export async function getFeatures<T, G extends Geometry = Geometry>(): Promise<Array<Feature<G, T>>> {
    const res = await api.get<Array<IFeatureResponse<T, G>>>('/features')

    return res.data.map(f => ensureFeatureId<T, G>(f.feature, f.id))
}

export async function getLayers(): Promise<ILayer[]> {
    const res = await api.get<ILayer[]>('/layers')

    return res.data
}

export async function createLayer(layer: Partial<ILayer>): Promise<ILayer> {
    const res = await api.post<ILayer>('/layers', factoryLayer(layer as any))

    const newLayer = res.data

    return updateLayer(newLayer)

    // return res.data
}

export async function deleteLayer(id: number): Promise<void> {
    const res = await api.delete(`/layers/${id}`)
}

export async function updateLayer(layer: ILayer): Promise<ILayer> {
    const res = await api.put<ILayer>(`/layers/${layer.id}`, factoryLayer(layer))

    return res.data
}

export async function getProject(id: ProjectId): Promise<IProjectDefinition> {
    const res = await api.get<IProjectDefinition>(`/projects/${id}`)

    return res.data
}

let lastUpdateProject = null

export async function updateProject(value: IProjectDefinition): Promise<IProjectDefinition> {
    if (equal(value, lastUpdateProject)) {
        return value
    }

    lastUpdateProject = value
    const res = await api.put<IProjectDefinition>(`/projects/${value.id}`, encodeProject(value))

    return res.data
}
