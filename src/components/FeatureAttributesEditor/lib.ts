let id = 0
export function nextKey(keys: number[]): number {
    if (keys.length === 0) {
        return 0
    }

    id = Math.max(...keys)
    return ++id
}