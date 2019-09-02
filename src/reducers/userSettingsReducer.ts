import { LayerId, IUserSettings } from '../app/types'
import {
    ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT, ACTION_USER_SETTINGS_SET_LAYER_VISIBLE,
} from '../app/actions'

export function userSettingsReducer(state: IUserSettings, action: any): IUserSettings {
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

    return state
}
