import { ILayer } from './types'
import { resolveUserFeatureSchema } from './layerSchema'


export function factoryLayer(layer: ILayer): ILayer {
    const schema = resolveUserFeatureSchema(layer.schemaContent)

    return {
        ...layer,
        schema,
    }
}
