import {
    ACTION_LAYER_FILTER_TREE_SET_CHECKED_KEYS,
    ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT,
    ACTION_USER_SETTINGS_SET_LAYER_CLUSTER,
    ACTION_USER_SETTINGS_SET_LAYER_VISIBLE,
} from '../app/actions'
import { IUserSettings, LayerId } from '../app/types'

export function userSettingsReducer(state: IUserSettings, action: any): IUserSettings {
    if (action.type === ACTION_LAYER_FILTER_TREE_SET_CHECKED_KEYS) {
        const id = action.payload.layerId
        return {
            ...state,
            layerFilterTreeCheckedKeys: {
                ...state.layerFilterTreeCheckedKeys,
                [id]: action.payload.checkedKeys,
            },
        }
    }

    if (action.type === ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT) {
        const currentLayerId: LayerId = action.payload.id

        return {
            ...state,
            currentLayerId,
        }
    }

    if (action.type === ACTION_USER_SETTINGS_SET_LAYER_VISIBLE) {
        const layerId: LayerId = action.payload.layerId
        const visible = action.payload.visible

        return {
            ...state,
            layerVisible: {
                ...state.layerVisible,
                [layerId]: visible,
            },
        }
    }

    if (action.type === ACTION_USER_SETTINGS_SET_LAYER_CLUSTER) {
        const layerId: LayerId = action.payload.layerId
        const clusteringEnabled = action.payload.clusteringEnabled

        return {
            ...state,
            layerClusterIndex: {
                ...state.layerClusterIndex,
                [layerId]: clusteringEnabled,
            },
        }
    }

    return state
}
