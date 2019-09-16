import { removeByIndex } from '../lib/array'
import { removeMatrixKeyByIndex, sum } from './lib'

export function reduceChartMatrix(matrix: number[][], keys: string[]): [number[][], string[]] {
    let newMatrix = matrix
    let newKeys = keys

    let i = 0
    while (true) {
        if (i >= newMatrix.length) {
            break
        }

        const row = newMatrix[i]
        if (sum(row) === 0) {
            newMatrix = removeMatrixKeyByIndex(i, newMatrix)
            newKeys = removeByIndex(newKeys, i)

            continue
        }

        i++
    }

    return [newMatrix, newKeys]
}

export function createPieData<T>(items: T[], keys: string[], powerFn: (item: T) => number) {
    return keys
        .map(key => {
            const value = sum(items.map(x => {
                if (x[key]) {
                    return powerFn(x)
                }

                return 0
            }))

            return {
                id: key,
                label: key,
                value,
            }
        })
        .filter(x => x.value > 0)
}

