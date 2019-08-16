export function moveItemByIndex<T>(items: T[], index: number, direction: number): T[]{
    const item = items[index]

    const no = items.filter((x, i) => i !== index)
    no.splice(index + direction, 0, item)

    return no
}