import { IUserFeatureSchema } from './types'
import { Geometry, Feature } from 'geojson'
import { get } from 'lodash'

function createDefaultScheme(): IUserFeatureSchema {
    return {
        version: '1',
        editor: [
            {
                field: 'name',
                view: ['input'],
            }
        ],
    }
}

function createJsonScheme(): IUserFeatureSchema {
    return {
        version: '1',
        editor: 'json',
    }
}

function createCaseScheme(): IUserFeatureSchema {
    return {
        version: '1',
        editor: 'case-table',
        filter: 'case-filter',
    }
}

export function resolveUserFeatureSchema(code: string): IUserFeatureSchema {
    try {
        const rawSchema = JSON.parse(code)
        const editor = rawSchema['editor'] || 'json'
        const version = rawSchema['version'] || '1'

        return {
            version,
            editor,
            ...rawSchema,
        }
    } catch (error) {
        return createDefaultScheme()
    }
}

export function createPinTextFunction<T, G extends Geometry = Geometry>(schema: IUserFeatureSchema): (feature: Feature<G, T>) => string {
    const x = schema.markerText
    if (!x) {
        return () => ''
    } else if (typeof x === 'string') {
        return () => x
    } else {
        const fn = x[0]
        const arg = x[1]

        return createFunction(fn, arg)
    }
}

function createFunction(name: string, arg: string): (x: object) => string {
    if (name === 'get') {
        return (x: object) => {
            const value = get(x, arg, '')
            if (typeof value === 'boolean') {
                return value ? '✓' : '✗'
            }
            return value
        }
    } else {
        return () => ''
    }
}
