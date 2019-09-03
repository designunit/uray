import { resolveUserFeatureSchema } from './layerSchema'
import { ILayer, IProjectDefinition } from './types'

export function factoryLayer(layer: ILayer): ILayer {
    const schema = resolveUserFeatureSchema(layer.schemaContent)

    return {
        ...layer,
        schema,
    }
}

export function encodeProject(value: IProjectDefinition): IProjectDefinition {
    return {
        ...value,
    }
}
