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

        i ++
    }

    return [newMatrix, newKeys]
}
