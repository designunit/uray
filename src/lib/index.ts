export function mapFromArray<K, T>(key: (item: T) => K, items: T[]): Map<K, T> {
    return items.reduce(
        (acc, item) => {
            acc.set(key(item), item)
            return acc
        },
        new Map<K, T>()
    )
}
