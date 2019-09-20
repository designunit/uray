import { Feature, Geometry } from 'geojson'
import JSON5 from 'json5'
import { get, initial, last } from 'lodash'

import { treeKey } from './lib'
import { IUserFeatureField, IUserFeatureSchema } from './types'

function createDefaultScheme(): IUserFeatureSchema {
    return {
        version: '1',
        editor: [
            {
                field: 'name',
                view: ['input'],
            },
        ],
    }
}

export function resolveUserFeatureSchema(code: string): IUserFeatureSchema {
    try {
        const rawSchema = JSON5.parse(code)
        const editor = rawSchema.editor || 'json'
        const version = rawSchema.version || '1'

        return {
            version,
            editor,
            ...rawSchema,
        }
    } catch (error) {
        return createDefaultScheme()
    }
}

export function getEditorField(schema: IUserFeatureSchema, field: string): IUserFeatureField | undefined {
    if (typeof schema.editor === 'string') {
        return undefined
    }

    return schema.editor.find(x => x.field === field)
}

export function getSchemaFilterKeys(schema: IUserFeatureSchema): string[] {
    if (Array.isArray(schema.filter)) {
        return schema.filter
    }

    return []
}

export function createPinTextFunction<T, G extends Geometry = Geometry>(
    schema: IUserFeatureSchema,
): (feature: Feature<G, T>) => string {
    const x = schema.markerText
    if (!x) {
        return () => ''
    } else if (typeof x === 'string') {
        return () => x
    } else if (Array.isArray(x)) {
        return (obj: object) => {
            const fn = createFunction.call(null, schema, ...x)

            return printValue(fn(obj))
        }
    } else {
        return () => ''
    }
}

export function createMarkerColorFunction<T, G extends Geometry = Geometry>(
    schema: IUserFeatureSchema,
    defaultColor: string,
): (feature: Feature<G, T>) => string {
    const x = schema.markerColor
    if (!x) {
        return () => defaultColor
    } else if (typeof x === 'string') {
        return () => x
    } else if (Array.isArray(x)) {
        return (obj: object) => {
            const fn = createFunction.call(null, schema, ...x)
            const value = fn(obj)

            return value ? value : defaultColor
        }
    } else {
        return () => defaultColor
    }
}

function createFunction(schema: IUserFeatureSchema, name: string, ...arg: string[]): (x: object) => string {
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
        const fnBody = last(arg)!
        const fn = new Function(...fnArgs, fnBody)

        return (x: object) => {
            try {
                return fn(x)
            } catch (e) {
                console.error(e)

                return null
            }
        }
    } else if (name === 'select') {
        const [field, defaultValue, selection] = arg
        const editorField = getEditorField(schema, field)
        if (!editorField) {
            return () => defaultValue
        }

        if (editorField.view[0] !== 'select') {
            return () => defaultValue
        }

        return (x: object) => {
            const value = get(x, `properties.${field}`, '')
            const index = editorField.view[1].indexOf(value)
            if (index < 0) {
                return defaultValue
            }

            return selection[index]
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
