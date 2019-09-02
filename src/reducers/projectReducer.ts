import { without } from 'lodash'
import { LayerId, IProjectDefinition } from '../app/types'
import { moveItemByIndex } from '../lib/array'
import {
    ACTION_PROJECT_LAYER_ADD,
    ACTION_PROJECT_LAYER_DELETE,
    ACTION_PROJECT_LAYER_MOVE,
    ACTION_PROJECT_LAYERS_SET,
} from '../components/App/actions'

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
    
    if (action.type === ACTION_PROJECT_LAYER_MOVE) {
        const layerId: LayerId = action.payload.id
        const direction: number = action.payload.direction
        const layerIndex = state.layers.indexOf(layerId)
        const layers = moveItemByIndex(state.layers, layerIndex, direction)

        return {
            ...state,
            layers,
        }
    }
    
    if (action.type === ACTION_PROJECT_LAYERS_SET) {
        const layers = action.payload.layers

        return {
            ...state,
            layers,
        }
    }

    return state
}
