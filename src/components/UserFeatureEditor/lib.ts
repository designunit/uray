export function changeItem<T>(items: T[], index: number, partialValue: Partial<T>): T[] {
    return items.map((item, i) => i !== index ? item : ({
        ...item,
        ...partialValue,
    }))
}
