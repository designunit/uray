import * as React from 'react'

import { createFilterConfig } from '../app/filter'
import { IIndex, ILayer } from '../app/types'

function createLayerFilterConfigIndex(index: IIndex<ILayer>) {
    return Object
        .values(index)
        .reduce((acc, layer) => {
            return {
                ...acc,
                [layer.id]: createFilterConfig(layer.schema),
            }
        }, {})
}

export function useLayerFilter(index: IIndex<ILayer>) {
    const filterConfigIndexRef = React.useRef<IIndex<any>>(
        createLayerFilterConfigIndex(index),
    )

    React.useEffect(() => {
        filterConfigIndexRef.current = createLayerFilterConfigIndex(index)
    }, [index])

    return [filterConfigIndexRef.current]
}
