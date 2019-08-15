import { IUserFeatureSchema } from './types'
import { Geometry, Feature } from 'geojson'
import { get, initial, last } from 'lodash'

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
    } else if (Array.isArray(x)) {
        return createFunction.apply(null, x)
    } else {
        return () => ''
    }
}

function createFunction(name: string, ...arg: string[]): (x: object) => string {
    if (name === 'get') {
        return (x: object) => {
            try {
                return printValue(get(x, arg[0], ''))
            } catch (e) {
                console.error(e)
                return printValue(null)
            }
        }
    } else if (name === 'fn') {
        const fnArgs = initial(arg)
        const fnBody = last(arg)
        const fn = new Function(...fnArgs, fnBody)

        return (x: object) => {
            try {
                return printValue(fn(x))
            } catch (e) {
                console.error(e)
                return printValue(null)
            }
        }
    }
    
    return () => ''
}

export function printValue(value: any): string {
    if (typeof value === 'boolean') {
        return value ? '✓' : '✗'
    } else if (typeof value === 'number') {
        return numToStr(value)
    } else if (Array.isArray(value)) {
        return `[${value.length}]`
    } else if (value === null || value === undefined) {
        return `✕`
    }

    return value.toString()
}

function numToStr(value: number): string {
    return value ? `${value}` : ''
}
