import { ACTION_LAYER_FILTER_TREE_SET_CHECKED_KEYS } from '../../app/actions'
import { IIndex, ILayer } from '../../app/types'
import { FeatureFilter } from '../FeatureFilter'

export function createFilterNode(
    layer: ILayer,
    layerFilterConfigIndex: IIndex<any>,
    dispatch: React.Dispatch<any>,
    disabled: boolean,
    getCheckedKeys: (layerId: number, defaultValue: string[]) => string[],
): React.ReactNode | null {
    const filterConfig = layerFilterConfigIndex[layer.id]

    if (filterConfig) {
        const layerFilterCheckedKeys = getCheckedKeys(layer.id, filterConfig.allTreeKeys)

        return (
            <FeatureFilter
                disabled={disabled}
                options={filterConfig}
                checkedKeys={layerFilterCheckedKeys}
                onCheck={checkedKeys => {
                    // dispatchLayerFilterTree({
                    dispatch({
                        type: ACTION_LAYER_FILTER_TREE_SET_CHECKED_KEYS,
                        payload: {
                            layerId: layer.id,
                            checkedKeys,
                        },
                    })
                }}
            />
        )
    }

    return null
}
