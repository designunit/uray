import { without } from 'lodash'
import { LayerId, IProjectDefinition } from '../../app/types'
import {
    ACTION_PROJECT_LAYER_ADD,
    ACTION_PROJECT_LAYER_DELETE,
    ACTION_PROJECT_LAYER_MAKE_CURRENT,
} from './actions'

export function projectReducer(state: IProjectDefinition, action: any): IProjectDefinition {
    if (action.type === ACTION_PROJECT_LAYER_ADD) {
        const layerId: LayerId = action.payload.id
        const layers = [...state.layers, layerId]
        return {
            ...state,
            layers,
        }
    }

    if (action.type === ACTION_PROJECT_LAYER_DELETE) {
        const layerId: LayerId = action.payload.id
        const layers = without(state.layers, layerId)

        return {
            ...state,
            layers,
        }
    }

    if (action.type === ACTION_PROJECT_LAYER_MAKE_CURRENT) {
        const currentLayerId: LayerId = action.payload.id

        return {
            ...state,
            currentLayerId,
        }
    }

    return state
}
