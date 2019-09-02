import { LayerId, IUserSettings } from '../app/types'
import {
    ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT,
} from '../app/actions'

export function userSettingsReducer(state: IUserSettings, action: any): IUserSettings {
    if (action.type === ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT) {
        const currentLayerId: LayerId = action.payload.id

        return {
            ...state,
            currentLayerId,
        }
    }

    return state
}
