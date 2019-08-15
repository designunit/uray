import { IUserFeatureSchema } from './types'
import JSON5 from 'json5'
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
        const rawSchema = JSON5.parse(code)
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
        return (obj: object) => {
            const fn = createFunction.apply(null, x)
            return printValue(fn(obj))
        } 
    } else {
        return () => ''
    }
}

export function createMarkerColorFunction<T, G extends Geometry = Geometry>(schema: IUserFeatureSchema, defaultColor: string): (feature: Feature<G, T>) => string {
    const x = schema.markerColor
    if (!x) {
        return () => defaultColor
    } else if (typeof x === 'string') {
        return () => x
    } else if (Array.isArray(x)) {
        return (obj: object) => {
            const fn = createFunction.apply(null, x)
            const value = fn(obj)
            return value ? value : defaultColor
        }
    } else {
        return () => defaultColor
    }
}

function createFunction(name: string, ...arg: string[]): (x: object) => string {
    if (name === 'get') {
        return (x: object) => {
            try {
                return get(x, arg[0], '')
            } catch (e) {
                console.error(e)
                return null
            }
        }
    } else if (name === 'fn') {
        const fnArgs = initial(arg)
        const fnBody = last(arg)
        const fn = new Function(...fnArgs, fnBody)

        return (x: object) => {
            try {
                return fn(x)
            } catch (e) {
                console.error(e)
                return null
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
