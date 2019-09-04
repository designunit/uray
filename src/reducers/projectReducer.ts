import { without } from 'lodash'

import { IProjectDefinition, LayerId } from '../app/types'
import { moveItemByIndex } from '../lib/array'

import {
    ACTION_PROJECT_LAYER_ADD,
    ACTION_PROJECT_LAYER_DELETE,
    ACTION_PROJECT_LAYER_MOVE,
    ACTION_PROJECT_LAYERS_SET,
} from '../app/actions'

export interface IProjectActionLayerAdd {
    type: typeof ACTION_PROJECT_LAYER_ADD
    payload: {
        id: LayerId,
    }
}

export interface IProjectActionLayerDelete {
    type: typeof ACTION_PROJECT_LAYER_DELETE
    payload: {
        id: LayerId,
    }
}

export interface IProjectActionLayerMove {
    type: typeof ACTION_PROJECT_LAYER_MOVE
    payload: {
        id: LayerId,
        direction: number,
    }
}

export interface IProjectActionLayersSet {
    type: typeof ACTION_PROJECT_LAYERS_SET
    payload: {
        layers: LayerId[],
    }
}

export type ProjectAction = IProjectActionLayerAdd
    | IProjectActionLayerDelete
    | IProjectActionLayerMove
    | IProjectActionLayersSet

export function projectReducer(state: IProjectDefinition, action: ProjectAction): IProjectDefinition {
    if (action.type === ACTION_PROJECT_LAYER_ADD) {
        const layerId = action.payload.id
        const layers = [...state.layers, layerId]
        return {
            ...state,
            layers,
        }
    }

    if (action.type === ACTION_PROJECT_LAYER_DELETE) {
        const layerId = action.payload.id
        const layers = without(state.layers, layerId)

        return {
            ...state,
            layers,
        }
    }

    if (action.type === ACTION_PROJECT_LAYER_MOVE) {
        const layerId = action.payload.id
        const direction = action.payload.direction
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
