import { ICase } from '../../app/types'

let id = 0
export function nextKey(keys: number[]): number {
    if (keys.length === 0) {
        return 0
    }

    id = Math.max(...keys)
    return ++id
}

export function replaceCase(cases: ICase[], id: number, partialValue: Partial<ICase>): ICase[] {
    return cases.map(item => item.id !== id ? item : ({
        ...item,
        ...partialValue,
    }))
}
