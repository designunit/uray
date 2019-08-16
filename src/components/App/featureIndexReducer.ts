import { ACTION_FEATURE_SET, ACTION_FEATURE_DELETE, ACTION_FEATURE_POINT_LOCATION_SET, ACTION_FEATURE_SET_PROPERTY, ACTION_FEATURE_SET_PROPERTIES } from './actions'
import { FeatureId, UserFeature } from '../../app/types'
import { updateFeaturePointLocation, changeFeatureProperties } from '../../lib/geojson'

export function featuresIndexReducer(state: any, action) {
    if (action.type === ACTION_FEATURE_SET) {
        const feature: UserFeature = action.payload
        return {
            ...state,
            [feature.id]: feature,
        }
    }

    if (action.type === ACTION_FEATURE_DELETE) {
        const featureId: FeatureId = action.payload.featureId
        const newState = {
            ...state,
        }
        delete newState[featureId]
        return newState
    }

    if (action.type === ACTION_FEATURE_POINT_LOCATION_SET) {
        const featureId: FeatureId = action.payload.featureId
        const latLng: [number, number] = action.payload.latLng
        const feature = state[featureId]

        return {
            ...state,
            [featureId]: updateFeaturePointLocation(feature, latLng),
        }
    }

    if (action.type === ACTION_FEATURE_SET_PROPERTY) {
        const featureId: FeatureId = action.payload.featureId
        const key: string = action.payload.key
        const value: any = action.payload.value
        const feature = state[featureId]

        return {
            ...state,
            [featureId]: changeFeatureProperties(feature, {
                ...feature.properties,
                [key]: value,
            }),
        }
    }

    if (action.type === ACTION_FEATURE_SET_PROPERTIES) {
        const featureId: number = action.payload.featureId
        const properties: { [name: string]: any } = action.payload.properties
        const feature = state[featureId]

        return {
            ...state,
            [featureId]: changeFeatureProperties(feature, {
                ...feature.properties,
                ...properties,
            }),
        }
    }

    return state
}