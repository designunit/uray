import { omit } from 'lodash'
import { IIndex, ILayer } from '../../app/types'
import {
    ACTION_LAYER_DELETE,
    ACTION_LAYER_SET,
} from './actions'

export function layerIndexReducer(state: IIndex<ILayer>, action: any): IIndex<ILayer> {
    if (action.type === ACTION_LAYER_SET) {
        const layer = action.payload as ILayer

        return {
            ...state,
            [layer.id]: layer,
        }
    }

    if (action.type === ACTION_LAYER_DELETE) {
        return omit(state, `${action.payload.id}`)
    }

    return state
}
