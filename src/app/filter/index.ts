import { getEditorField } from '../layerSchema'
import { treeKey } from '../lib'
import { IUserFeatureField, IUserFeatureSchema } from '../types'

export interface IFilterTreeItem {
    title: string
    key: string
    field: string
    value: any
    children?: IFilterTreeItem[]
}

export function createSwitchFieldTree(editorField: IUserFeatureField): IFilterTreeItem {
    const field = editorField.field

    return {
        title: field,
        key: field,
        field,
        value: null,
    }
}

export function createSelectFieldTree(editorField: IUserFeatureField): IFilterTreeItem {
    const field = editorField.field
    const children = editorField.view[1] as string[]

    return {
        title: field,
        key: field,
        field,
        value: null,
        children: children.map(x => ({
            title: x,
            key: treeKey(field, x),
            value: x,
            field,
        })),
    }
}

export function getFieldTree(editorField: IUserFeatureField): IFilterTreeItem | null {
    const viewType = editorField.view[0]

    switch (viewType) {
        case 'select': {
            return createSelectFieldTree(editorField)
        }

        case 'switch': {
            return createSwitchFieldTree(editorField)
        }

        default: {
            return null
        }
    }
}

export function createFilterConfig(schema: IUserFeatureSchema) {
    if (!Array.isArray(schema.filter)) {
        return null
    }

    const keys: string[] = schema.filter
    const treeKeysMap = new Map<string, any>()
    const allTreeKeys: string[] = []

    const tree = keys
        .map(field => {
            const editorField = getEditorField(schema, field)
            if (!editorField) {
                return null
            }

            const treeItem = getFieldTree(editorField)

            if (treeItem && treeItem.children) {
                treeItem.children.forEach(x => {
                    const value = x.value
                    allTreeKeys.push(treeKey(field, value))
                    treeKeysMap.set(treeKey(field, value), [field, value])
                })
            }

            return treeItem
        })
        .filter(Boolean)

    return { tree, treeKeys: treeKeysMap, allTreeKeys }
}
